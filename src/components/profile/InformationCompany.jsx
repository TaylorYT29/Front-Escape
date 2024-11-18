import "../../index.css"
import { Navigation } from "../navigation/Navigation.jsx";
import { SearchDropdown } from "../dropdown/SearchDropdown.jsx";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { useUser } from '../../context/UserContext.jsx';
("use client");
import propTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Drawer } from "flowbite-react";
import { useState,useEffect } from "react";
import { Posts } from "../routes/Posts.jsx";
import { CardComments } from "../cards/CardComments.jsx";

import { useTranslation } from "react-i18next";
import  useFetchData  from "../hooks/useFetchData.js";

export function InformationCompany() {

    const { isMobile } = useFetchMenubar();
    const { user } = useUser();

    const { t } = useTranslation();

    const [isOpenComments, setOpenComments] = useState(false);
    const handleCloseComments = () => setOpenComments(false);
    const [postId, setPostId] = useState(null);


    const openCardComments = (postId) => () => {
        if (postId) {
            setOpenComments(true);
            setPostId(postId);
        } else {
            console.error('Invalid postId:', postId);
        }
    };
    const location = useLocation();
    const [idCompany] = useState(location.state);
     const { data, loading } = useFetchData(
        `http://localhost/escape-desarrollo-backend/public/api/companyinfo/${idCompany}/` + user.id,
        ["description", "sub_category_id"]
     
       );

       const[follow, setFollow] = useState(t('Follow'));
       const[followers, setFollowers] = useState(null);

       
       const follower = async () => {
        try {
            const response = await fetch("http://localhost/escape-desarrollo-backend/public/api/follower", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_id: idCompany,
                    user_id: user.id,
                }),
            });
            if(follow === t('Follow')){
                setFollow(t('Following'));
                setFollowers(followers + 1);
            }else{
                setFollow(t('Follow'));
                setFollowers(followers - 1);
            }
           
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData.message);
                return;
            }         
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    useEffect(() => {
        if (!loading) {
            if (data[0].follow != null) {
                setFollow(t('Following'));
            } else {
                setFollow(t('Follow'));
            }
            setFollowers(data[0].followers_count);
        }
    }, [loading]);

    
  
    return (
        
        <div className="flex overflow-x-hidden dark:bg-[#2a2a2a]">

            <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
                <Navigation />
            </div>

            <Drawer open={isOpenComments} onClose={handleCloseComments} position="right" className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a] overflow-hidden">
                <Drawer.Items>
                    {postId ? (
                        <CardComments postId={postId} onClose={handleCloseComments} />
                    ) : (
                        <p className="text-center dark:text-white">Cargando comentarios...</p>
                    )}
                </Drawer.Items>
            </Drawer>

            <main className="flex flex-col lg:px-12 md:px-5 overflow-x-hidden transition-all duration-500"
                style={{
                    marginLeft: isMobile ? '0px' : '80px',
                }}>
                <div className="flex pt-4 justify-between">
                    <h1 className="font-black text-3xl lg:text-4xl mt-2 dark:text-white">ESCAPE</h1>
                    <SearchDropdown />
                </div>

                    {loading?(<p>Loading...</p>):
                    (   
                            
                             <div className="flex flex-col items-center w-[100vw]  md:flex-row md:justify-between md:w-[80vw] dark:bg-[#2a2a2a]">

                    <div className="flex flex-col items-center md:block">
                        <img src={data[0].image} alt="Profile_Img" className="rounded-full h-[7rem] w-[7rem] mt-[2rem]" />
                        <h3 className="font-bold lg:text-2xl text-xl mt-[2rem] dark:text-white">{data[0].name}</h3>
                        <h4 className=" text-[#606060] font-semibold  pt-[1rem]">{data[0].sub_category_id}</h4>
                        <div className="col-span-3 text-left lg:pt-[2rem] pt-[1rem] dark:text-white">
                            <p>{data[0].description}</p>
                        </div>
                    </div>

                    <div className="flex  text-center lg:align-center">
                        
                        <div className="flex  gap-2">

                        <div className="block">
                            <button onClick={follower} className="bg-[#E0E1E3] font-semibold rounded-xl px-8 md:px-[4rem] py-[0.5rem] mt-[1rem] lg:mt-[0rem] dark:text-white dark:bg-[#404040]">{follow}</button>
                            <p className="pt-[2rem] dark:text-white">{data[0].posts}</p>
                            <h4 className="dark:text-white">{t('Posts')}</h4>
                        </div>

                        <div className="block">
                            <button className="bg-[#E0E1E3] font-semibold rounded-xl px-8 md:px-[4rem] py-[0.5rem] mt-[1rem] lg:mt-[0rem] dark:text-white dark:bg-[#404040]">{t('Share')}</button>
                            <p className="pt-[2rem] dark:text-white">{followers}</p>
                            <h4 className="dark:text-white">{t('Followers')}</h4>
                        </div>

                        </div>               
                    </div>
                    </div>)}
                    
               

                <div className="mt-10 pb-[5rem]">
                    <h2 className="font-bold lg:text-2xl text-xl mb-8 dark:text-white">
                        {t('Posts')}
                    </h2>
                    <div className="mt-10">
                        <Posts  setOpenComments={openCardComments} company_id={idCompany}/>
                    </div>
                </div>
            </main>
        </div>
    );
}

InformationCompany.propTypes = {
    toggleDarkMode: propTypes.func,
    darkMode: propTypes.bool
};