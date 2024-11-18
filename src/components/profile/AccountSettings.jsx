import "../../index.css";
import { Navigation } from "../navigation/Navigation";
import { SearchDropdown } from "../dropdown/SearchDropdown";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { InputProfile } from "../inputs/InputProfile.jsx";
import { Buttons } from "../profile/Buttons.jsx";
import { useUser } from '../../context/UserContext.jsx';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import { ChangePassword } from '../profile/ChangePassword.jsx';
import { useProfile } from '../hooks/useProfile.js';
import { Selected } from "../selected/Selected";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AccountSettings({ toggleDarkMode }) {

    const { t } = useTranslation();
    const { modal, openModal } = useProfile();
    const navigate = useNavigate();
    const { isMobile } = useFetchMenubar();
    const { user, setUser } = useUser();
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [imagedata, setImagedata] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        canton: user ? user.canton_id : '',
        distrito: user ? user.district_id : '',
    });

    const cantons = [
        { id: 1, name: "Puntarenas" },
        { id: 2, name: "Esparza"},
        { id: 3, name: "Buenos Aires"},
        { id: 4, name: "Montes de Oro"},
        { id: 5, name: "Osa"},
        { id: 6, name: "Aguirre"},
        { id: 7, name: "Golfito"},
        { id: 8, name: "Coto Brus"},
        { id: 9, name: "Parrita"},
        { id: 10, name: "Corredores"},
        { id: 11, name: "Garabito"},
    ];

    const districts = [
        { id: 1, name: "Puntarenas" },
        { id: 2, name: "Pitahaya" },
        { id: 3, name: "Chomes" },
        { id: 4, name: "Lepanto" },
        { id: 5, name: "Paquera" },
        { id: 6, name: "Manzanillo" },
        { id: 7, name: "Guacimal" },
        { id: 8, name: "Barranca" },
        { id: 9, name: "Monteverde" },
        { id: 10, name: "Isla del Coco" },
        { id: 11, name: "Cóbano" },
        { id: 12, name: "Chacarita" },
        { id: 13, name: "Chira" },
        { id: 14, name: "Acapulco" },
        { id: 15, name: "El Roble" },
        { id: 16, name: "Esparza centro" },
        { id: 17, name: "San Juan" },
        { id: 18, name: "San Rafael" },
        { id: 19, name: "San Jerónimo" },
        { id: 20, name: "Macacona" },
        { id: 21, name: "Espiritu Santo" },
    ];

    const getCantonName = (cantonId) => {
        console.log("Canton ID recibido:", cantonId); 
        const canton = cantons.find(canton => canton.id.toString() === cantonId.toString());
        console.log("Canton encontrado:", canton); 
        return canton ? canton.name : "Canton desconocido";
    };
    

    const getDistrictName = (districtId) => {
        const district = districts.find(district => district.id.toString() === districtId.toString());
        return district ? district.name : "Distrito desconocido";
    };

    useEffect(() => {
        const fetchCantones = async () => {
            const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/cantons');
            const data = await response.json();
            console.log("Cantones cargados:", data);
            setCantones(data);
        };

        fetchCantones();
    }, []);

    useEffect(() => {
        if (formData.canton) {
            const fetchDistritos = async () => {
                const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/cantons/${formData.canton}/districts`);
                const data = await response.json();
                setDistritos(data);
            };

            fetchDistritos();
        }
    }, [formData.canton]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value  
        });
    };

    const handleImageChange = (files) => {
        const file = files[0];
        if (file) {
            setImagedata(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fData = new FormData();

        fData.append("id", user.id);
        fData.append("name", formData.name);
        fData.append("email", formData.email);
        fData.append("canton", formData.canton);
        fData.append("distrito", formData.distrito);

        if (imagedata) {
            fData.append("image", imagedata);
        }

        try {
            const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/update-user', {
                method: 'POST',
                //headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: fData,  
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                console.log("Datos actualizados con éxito", data.user);
                console.log(user.image);
                navigate('/home');
            } else {
                console.error("Error al actualizar los datos:", data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        } finally {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
                setPreviewURL(null);
            }
        }

    };
    

    const body = (
        <div className="bg-white w-[90%] md:w-[40%] lg:w-[25%] rounded-3xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ChangePassword close={openModal} />
        </div>
    );

    return (
        <form className="relative pb-10 dark:bg-[#2a2a2a]" onSubmit={handleSubmit}>
            <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
                <Navigation darkMode={toggleDarkMode} />
            </div>
            <main className="flex flex-col lg:px-12 px-5 overflow-x-hidden transition-all duration-500"
                style={{
                    marginLeft: isMobile ? '0px' : '80px',
                }}>
                <div className="flex pt-4 justify-between">
                    <h1 className="font-black text-3xl lg:text-4xl mt-2 dark:text-white">ESCAPE</h1>
                    <SearchDropdown />
                </div>
                
                <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen gap-8 lg:gap-28">
                    
                    <div className="flex flex-col justify-center items-center gap-4">
                        {console.log("user:", user)}
                        {console.log("user.image:", user?.image)}
                        <img
                            src={previewURL || (user && user.image ? `http://localhost/escape-desarrollo-backend/public/imgs/${user.image}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png")}
                            alt="Profile_Img" 
                            className="rounded-full h-[7rem] w-[7rem] mt-[2rem]"
                        />
                        <input 
                            name="image" 
                            id="image" 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={e => handleImageChange(e.target.files)} 
                        />

                        <label 
                            htmlFor="image" 
                            className="text-sky-400 cursor-pointer hover:text-sky-700"
                        >
                            + {t('changeImage')}
                        </label>
                        
                    </div>

                    <div className="flex flex-col gap-6 w-full lg:w-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputProfile placeholder={user.name} type="text" id="name" label={t('iName')} defaultValue={user.name} value={formData.name} onChange={handleChange}/>
                            <InputProfile placeholder={user.email} type="text" id="email" label={t('iEmail')} defaultValue={user.email} value={formData.email} onChange={handleChange}/>

                            <Selected
                                id="canton"
                                label={t('Canton')}
                                options={cantones}
                                value={formData.canton}
                                placeholder={getCantonName(user.canton_id)}
                                onChange={handleChange}
                                cBorder="border-2 border-sky-400"
                            />

                            <Selected
                                id="distrito"
                                label={t('District')}
                                options={distritos}
                                value={formData.distrito}
                                placeholder={getDistrictName(user.district_id)}
                                onChange={handleChange}
                                cBorder="border-2 border-sky-400"
                            />

                            <div className='grid '>
                                <InputProfile placeholder="********" type="password" id="password" label="Password" defaultValue="********" readOnly />
                                <a className=' text-sky-400 items-end cursor-pointer hover:text-sky-700' onClick={openModal}>{t('change')}</a>
                            </div>
                            <Modal open={modal} onClose={openModal}>
                                {body}
                            </Modal>
                        

                        </div>
                        <div className="w-full flex justify-center mt-6 lg:mt-12 mb-4">
                            <Buttons />
                        </div>
                    </div>
                </div>
            </main>
        </form>
    )
}
