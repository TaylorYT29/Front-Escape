import "../../index.css";
import { AuthInput } from "../inputs/AuthInput";
import { NavLink, useNavigate } from "react-router-dom";
import { Selected } from "../selected/Selected";
import { AuthCarousel } from "./AuthCaruosel";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData.js";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function SignUpCompanies() {
    const { t } = useTranslation();
    const [step, setStep] = useState(1)
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleTooltipToggle = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    const [name, setName] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSub_categories, setSelectedSub_categories] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCanton, setSelectedCanton] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [phone_numberError, setPhone_numberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [cantonError, setCantonError] = useState(false);
    const [districtError, setDistrictError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [sub_CategoriesError, setSub_categoriesError] = useState(false);

    const canton_id = [
        { id: "1", name: "Puntarenas" },
        { id: "2", name: "Esparza" },
        { id: "3", name: "Buenos Aires" },
        { id: "4", name: "Montes de Oro" },
        { id: "5", name: "Aguirre" },
        { id: "6", name: "Golfito" },
        { id: "7", name: "Coto Brus" },
        { id: "8", name: "Parrita" },
        { id: "9", name: "Corredores" },
        { id: "10", name: "Garabito" },
    ];

   

    const sub_categories_id = [
        { id: "1", name: "Restaurantes" },
        { id: "2", name: "Sodas" },
        { id: "3", name: "Comida Callejera" },
        { id: "4", name: "Cafeterías" },
        { id: "5", name: "Heladerías" },
        { id: "6", name: "Tiendas de Ropa" },
        { id: "7", name: "Artesanías" },
        { id: "8", name: "Mercados" },
        { id: "9", name: "Ferias" },
        { id: "10", name: "Caminatas" },
        { id: "11", name: "Deportes de Aventura" },
        { id: "12", name: "Parques y Jardines" },
        { id: "13", name: "Excursiones Naturales" },
        { id: "14", name: "Museos" },
        { id: "15", name: "Teatros" },
        { id: "16", name: "Exposiciones de Arte" },
        { id: "17", name: "Cine" },
        { id: "18", name: "Conciertos" },
        { id: "19", name: "Festivales" },
        { id: "20", name: "Piscinas" },
        { id: "21", name: "Discotecas" },
        { id: "22", name: "Spas" },
    ];

 
    const { data: category_id, loading: loadingCategories } = useFetchData(
        "http://localhost/escape-desarrollo-backend/public/api/categories",
        ["name"]
      );

    useEffect(() => {
        if (selectedCanton) {
            
            fetch(`http://localhost/escape-desarrollo-backend/public/api/cantons/${selectedCanton}/districts`)
                .then((response) => response.json())
                .then((data) => {
                    setDistricts(data); 
                })
                .catch((error) => {
                    console.error("Error al obtener los distritos:", error);
                });
        }
    }, [selectedCanton]);

    const validateFields = (step) => {
        let isValid = true;
    
        if(step === 1){
            if (!name) {
                setNameError(true);
                isValid = false;
            } else {
                setNameError(false);
            }
        
            if (!email) {
                setEmailError(true);
                isValid = false;
            } else {
                setEmailError(false);
            }

            if (!password) {
                setPasswordError(true);
                isValid = false;
            } else {
                setPasswordError(false);
            }
        
            if (password !== password_confirmation) {
                setPasswordConfirmationError(true);
                isValid = false;
            } else {
                setPasswordConfirmationError(false);
            }
        }

        if(step === 2){
            if (!description) {
                setDescriptionError(true);
                isValid = false;
            } else {
                setDescriptionError(false);
            }

            if (!phone_number) {
                setPhone_numberError(true);
                isValid = false;
            } else {
                if (phone_number.length !=8) {
                    setPhone_numberError(true);
                    isValid = false;
                }else{
                    setPhone_numberError(false);
                }
            }

            if (!selectedCategory) {
                setCategoryError(true);
                isValid = false;
            } else {
                setCategoryError(false);
            }
    
            if (!selectedSub_categories) {
                setSub_categoriesError(true);
                isValid = false;
            } else {
                setSub_categoriesError(false);
            }
        }

        if(step === 3){
            if (!selectedCanton) {
                setCantonError(true);
                isValid = false;
            } else {
                setCantonError(false);
            }
        
            if (!selectedDistrict) {
                setDistrictError(true);
                isValid = false;
            } else {
                setDistrictError(false);
            }

            if (!address) {
                setAddressError(true);
                isValid = false;
            } else {
                setAddressError(false);
            }
        }
        return isValid;
    }

    const handleNextStep = () => {
        if (validateFields(step)) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Nombre:", name);
        console.log("Phone number:", phone_number);
        console.log("Category:", category_id);
        console.log("Sub_categories:", sub_categories_id)
        console.log("Email:", email);
        console.log("Description:", description);
        console.log("Canton:", selectedCanton);
        console.log("Distrito:", selectedDistrict);
        console.log("Address", address);
        console.log("Contraseña:", password);
        console.log("Confirmar Contraseña:", password_confirmation);

        if (!validateFields()) {
            setShowError(true);
            setShowSuccess(false);
            return;
        }

        setShowError(false);

        if (document.getElementById('share-location').checked) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(latitude, longitude);

                const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/company-register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone_number,
                        category_id: selectedCategory,
                        sub_categories_id: selectedSub_categories,
                        email,
                        description,
                        //image
                        latitude: latitude,
                        longitude: longitude,
                        canton_id: selectedCanton,
                        district_id: selectedDistrict,
                        address,
                        //followers_count,
                        password,
                        password_confirmation,
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => {
                    navigate('/signInCompanies');
                }, 2500);

            } catch (error) {
                console.error("Error al obtener la ubicación o al enviar los datos:", error);
                setShowError(true);
                setShowSuccess(false);
            }
        } else {
            try {
                const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/company-register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone_number,
                        category_id: selectedCategory,
                        sub_categories_id: selectedSub_categories,
                        email,
                        description,
                        //image
                        latitude: null,
                        longitude: null,
                        canton_id: selectedCanton,
                        district_id: selectedDistrict,
                        address,
                        //followers_count,
                        password,
                        password_confirmation,
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => {
                    navigate('/signInCompanies');
                }, 2500);
                //navigate('/signIn');

            } catch (error) {
                console.error("Error al enviar los datos sin ubicación:", error);
                setShowError(true);
                setShowSuccess(false);
            }
        }
    };

    return (
        <div className="grid justify-center items-center h-[100vh] md:grid-cols-2 gap-4">

            <div className="flex justify-center items-center">

                <form className="w-full lg:w-2/4" onSubmit={handleSubmit}>
                    <img className="w-[12rem] mx-auto mt-8 mb-9 " src="../src/assets/imgs/logo-celeste.png" alt="Logo" /> 
                    <h2 className="text-4xl font-bold text-center text-sky-500">{t('signup')}</h2>
                    <div className="grid gap-4 mt-8">
                        {step === 1 && (
                            <div>
                                <AuthInput label={t('iCompanyName')} name="name" placeholder={t('iCompanyName')} type="text" onChange={e => setName(e.target.value)} className="{nameError ? 'border-red-500' : ''}"/> {nameError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}
                                <AuthInput label={t('iEmail')} name="email" placeholder={t('iEmail')} type="email" onChange={e => setEmail(e.target.value)} className="{emailError ? 'border-red-500' : ''}"/> {emailError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}
                                <AuthInput label={t('iPassword')} name="password" placeholder={t('iPassword')} type="password" onChange={e => setPassword(e.target.value)} className="{passwordError ? 'border-red-500' : ''}"/> {passwordError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}
                                <AuthInput label={t('iConfirmPassword')} name="passwordConfirm" placeholder={t('iConfirmPassword')} type="password" onChange={e => setPassword_confirmation(e.target.value)} className="{passwordConfirmationError ? 'border-red-500' : ''}"/> {passwordConfirmationError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <AuthInput label={t('Description')} name="description" placeholder={t('Description')} type="text" onChange={e => setDescription(e.target.value)} className="{descriptionError ? 'border-red-500' : ''}"/> {descriptionError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}
                                <AuthInput label={t('iPhone')} name="phone_number" placeholder="12345678" type="tel" onChange={e => setPhone_number(e.target.value)} className="{phone_numberError ? 'border-red-500' : ''}"/> {phone_numberError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio y tiene que tener 8 digitos</p>}
                                {loadingCategories ? <p>Cargando categorías...</p> : (
                                    <Selected
                                    label={t('iCategory')}
                                    options={category_id.map(district => ({ id: district.id, name: district.name }))}
                                    placeholder={t('iCategory')}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    className={categoryError ? 'border-red-500' : ''}
                                    cBorder="border-none outline-none"
                                />
                                )}
                            
                                {categoryError && <p className="text-red-500 text-sm mb-5">Por favor, selecciona una categoria</p>}

                                <Selected
                                    label={t('SubCategory')}
                                    options={sub_categories_id}
                                    placeholder={t('SubCategory')}
                                    onChange={e => setSelectedSub_categories(e.target.value)}
                                    className={sub_CategoriesError ? 'border-red-500' : ''}
                                    cBorder="border-none outline-none"
                                />
                                {sub_CategoriesError && <p className="text-red-500 text-sm mb-5">Por favor, selecciona una subcategoria</p>}

                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <Selected
                                    label={t('Canton')}
                                    options={canton_id}
                                    placeholder={t('Canton')}
                                    onChange={e => setSelectedCanton(e.target.value)}
                                    className={cantonError ? 'border-red-500' : ''}
                                    cBorder="border-none outline-none"
                                />
                                {cantonError && <p className="text-red-500 text-sm mb-5">Por favor, selecciona un canton</p>}

                                <Selected
                                    label={t('District')}
                                    options={districts.map(district => ({ id: district.id, name: district.name }))}
                                    placeholder={t('District')}
                                    onChange={e => setSelectedDistrict(e.target.value)}
                                    className={districtError ? 'border-red-500' : ''}
                                    cBorder="border-none outline-none"
                                />
                                {districtError && <p className="text-red-500 text-sm mb-5">Por favor, selecciona un distrito</p>}


                                <AuthInput label={t('address')} name="address" placeholder={t('address')} type="text" onChange={e => setAddress(e.target.value)} className="{addressError ? 'border-red-500' : ''}"/> {addressError && <p className="text-red-500 text-sm mb-5">Este campo es obligatorio</p>}

                                <div className="flex items-center relative mt-[1rem] mb-2">
                                    <input className="shadow-md p-3 rounded-lg border-none" type="checkbox" id="share-location" name="shareLocation" />
                                    <label htmlFor="share-location" className="ml-4 text-sky-500 font-medium">{t('ShareLocation')}</label>
                                    <div className="ml-2 relative">
                                        <svg onClick={handleTooltipToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>

                                        {/* Tooltip */}
                                        {isTooltipVisible && (
                                            <div className="absolute left-0 top-10 z-10 w-48 bg-white shadow-lg p-3 rounded-lg text-sm text-gray-700">
                                                <p>{t('ShareLocationInfo')}</p>
                                                <button
                                                    className="text-sky-500 mt-2"
                                                    onClick={handleTooltipToggle}
                                                >
                                                    {t('GotIt')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div
                        className={`flex lg:my-4 my-10 ${step === 3 ? 'flex-col gap-4' : 'justify-between gap-4'}`}
                    >
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handlePreviousStep}
                                className="text-sky-500 p-3 hover:bg-sky-500 border-2 border-sky-500 flex rounded-xl items-center justify-center w-full font-bold text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:text-white"
                            >
                                {t('back')}
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="text-sky-500 p-3 hover:bg-sky-500 border-2 border-sky-500 flex rounded-xl items-center justify-center w-full font-bold text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:text-white"
                            >
                                {t('next')}
                            </button>
                        ) : (
                            <div className="w-full">
                                <input
                                    className="text-white p-3 bg-sky-500 flex rounded-xl items-center justify-center w-full font-bold text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:bg-blue-800 hover:text-white"
                                    type="submit"
                                    name="btn-signup"
                                    value={t('signup')}
                                />
                                <p className="text-gray-400 text-center mt-4 dark:text-white">
                                    {t('goSignIn')}
                                    <NavLink className="text-sky-500 ml-2 font-medium" to="/signInCompanies">
                                        {t('iSignIn')}
                                    </NavLink>
                                </p>
                            </div>
                        )}
                    </div>

                    
                </form>


            </div>

            <AuthCarousel />

            {showSuccess && (
                <Alert severity="success" className="absolute top-4 right-4">
                    <AlertTitle>Éxito</AlertTitle>
                    ¡Inicio de sesión correctamente! Serás redirigido en breve.
                </Alert>
            )}

            {showError && (
                <Alert severity="error" className="absolute top-4 right-4">
                    <AlertTitle>Error</AlertTitle>
                    ¡Error! Datos incompletos, por favor digite los datos solicitados.
                </Alert>
            )}

        </div>
    );
}