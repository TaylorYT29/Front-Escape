import propTypes from "prop-types";
import "../../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, } from 'swiper/modules';
import { PostDropdown } from "../dropdown/PostDropdown";
import { useUser } from "../../context/UserContext.jsx";
import { useFetchComments } from "../hooks/useFetchComments.js";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate, NavLink } from "react-router-dom";

export function PostCard({
  id,
  media = [],
  name,
  city,
  info,
  category,
  likesCount,
  darkMode,
  setOpenComments,
  handleDeletePost,
  handleLike,
  liked,
  companyId,
  profilePicture,
}) {
  const { user } = useUser();
  const { getCommentCount } = useFetchComments();
  const [commentCount, setCommentCount] = useState(0);
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(liked);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const toggleLike = async () => {
    try {
      await handleLike(id);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  useEffect(() => {
    const fetchCommentCount = async () => {
      const count = await getCommentCount(id);
      setCommentCount(count);
    };

    fetchCommentCount();
  }, [id, getCommentCount]);

  const handleSharePost = () => {
    const postUrl = `http://localhost/escape-desarrollo-backend/public/api/posts/${id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => alert("Link del post copiado al portapapeles"))
      .catch(error => console.error("Error al copiar el enlace:", error));
  };

  return (
    <div className=" items-center py-4 justify-between lg:max-w-sm sm:w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-[#404040] dark:border-gray-700">
      <div className="flex items-center px-4 ">
        <NavLink to="/InformationCompany" state={companyId}>
          <img
            alt={name + 'Post' + id}
            src={profilePicture}
            className=" inline-block h-10 w-10 rounded-full"
          />
        </NavLink>
    
        <div className="flex flex-col ml-3 text-sm">
          <NavLink to="/InformationCompany" state={companyId}>
            <span className="text-black font-semibold text-lg dark:text-white">
              {name}
            </span> 
          </NavLink>
          <span className="text-[#9A9797] dark:text-[#BCBCBC]">
            {category} - {city}
          </span>
        </div>
        {user && user.user_type_id === 1 && companyId === user.id && (
          <div className="ml-auto">
            <PostDropdown postId={id} onDelete={() => { handleDeletePost(id) }} />
          </div>
        )}

      </div>
      <p className="px-4 dark:text-white">{info}</p>

      <div className="mt-2">
        {media.length > 0 && (
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index}>
                {item.type === 'image' ? (
                  <img src={item.url} alt={`Post Image ${index}`} className="w-full h-72 object-fill" />
                ) : (
                  <video className="w-full h-72 object-contain" controls>
                    <source src={item.url} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="cursor-pointer">
            {isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 dark:text-white">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" className="size-9 dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            )}
          </button>


          <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={setOpenComments(id)}
            className="cursor-pointer"
          >
            <path
              d="M13.4488 0.0202389C10.0312 0.361166 7.19989 1.44751 4.81405 3.33127C1.46685 5.97201 -0.362093 9.97067 0.0599708 13.7266C0.382381 16.6216 1.92409 19.1699 4.51509 21.0826C4.81992 21.3079 5.09543 21.5102 5.13646 21.5333C5.24198 21.5911 5.07198 22.3307 4.83164 22.8854C4.48578 23.6886 4.28061 23.9602 3.2489 24.9946L2.25236 26L3.92303 25.9711C5.49405 25.948 5.62887 25.9364 6.19749 25.7978C7.5223 25.4568 8.56573 24.9079 9.65021 23.9776L10.0136 23.6655L10.9105 23.8447C12.6105 24.1798 13.1088 24.226 15.0901 24.226C17.0422 24.226 17.7222 24.1682 19.2053 23.8735C21.7142 23.3766 24.0238 22.3191 25.7942 20.8572C28.8307 18.3436 30.3782 14.5818 29.921 10.7912C29.6807 8.76298 28.8952 6.87344 27.6114 5.21504C27.2128 4.70076 26.1224 3.60864 25.5538 3.1637C23.5138 1.56308 20.9756 0.56341 17.816 0.13003C17.1712 0.0375748 14.0408 -0.0375443 13.4488 0.0202389ZM17.1301 1.80577C21.9663 2.30849 25.5773 4.51007 27.2831 7.98868C28.8893 11.2593 28.4555 15.0903 26.1459 18.0142C24.4107 20.2158 21.6849 21.7066 18.3729 22.2614C17.0949 22.4752 16.0339 22.5445 14.5391 22.5041C12.8157 22.4636 11.5202 22.2729 10.0078 21.8338L9.43917 21.672L8.9409 22.2094C8.66539 22.5041 8.26091 22.8739 8.04402 23.0415C7.66885 23.3188 6.39093 23.9949 6.33817 23.9371C6.32645 23.9255 6.39679 23.7175 6.49645 23.4806C6.75438 22.8623 6.91265 22.1458 6.96541 21.3426C6.99472 20.9554 7.0123 20.6434 7.00644 20.6376C7.00058 20.6319 6.72507 20.4527 6.38507 20.2389C5.48232 19.6669 4.90785 19.2046 4.21027 18.4938C3.00856 17.263 2.27581 15.934 1.91823 14.2987C1.73064 13.4493 1.73064 11.8371 1.92409 10.9646C2.80339 6.885 6.02163 3.64908 10.5119 2.32005C11.3326 2.07736 12.294 1.89822 13.566 1.75377C14.0877 1.69598 16.4091 1.73065 17.1301 1.80577Z"
              fill={darkMode ? "white" : "black"}
            />
          </svg>{" "}
        </div>


        <button onClick={handleSharePost} className="cursor-pointer">
          <svg
            width="30"
            height="25"
            viewBox="0 0 30 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

            className="cursor-pointer"
          >
            <path
              d="M28.0513 0.176934C27.9738 0.171329 22.1605 0.38261 15.127 0.651057C1.31043 1.18176 1.93209 1.14244 1.38398 1.53079C0.984663 1.8156 0.802323 2.07319 0.658314 2.56789C0.540075 2.97406 0.535994 3.04631 0.612189 3.46389C0.755676 4.29082 0.572629 4.08502 5.08602 8.35877L9.16627 12.2183L10.2391 17.733C11.4245 23.851 11.3468 23.5742 11.9715 24.1458C12.2793 24.4274 12.3425 24.4628 12.7488 24.5811C13.2436 24.7251 13.5589 24.7096 14.0136 24.5256C14.6356 24.2717 14.2687 24.775 22.1556 13.3843L29.4518 2.83843L29.5883 2.36977C29.6892 2.00375 29.7101 1.83474 29.6798 1.62822C29.5914 0.981113 29.1979 0.527658 28.5492 0.310567C28.3528 0.247741 28.1273 0.187747 28.0513 0.176934ZM18.2125 6.3167C13.7391 8.77645 10.0549 10.7768 10.034 10.7707C10.008 10.7631 8.6506 9.48681 7.01659 7.93791C5.37888 6.38228 3.65065 4.74945 3.17668 4.30081C2.70272 3.85216 2.28454 3.4254 2.24913 3.35296C2.14744 3.12 2.18401 2.95554 2.36558 2.85589C2.48813 2.78424 5.24736 2.66109 14.408 2.30579C20.9459 2.05123 26.3061 1.84362 26.3218 1.84817C26.3389 1.84751 22.6859 3.85695 18.2125 6.3167ZM20.3544 13.1085C15.1317 20.6655 13.5483 22.9215 13.422 22.9864C13.2405 23.0861 13.082 23.0287 12.94 22.8179C12.872 22.702 10.8272 12.3742 10.856 12.2753C10.8666 12.2389 27.0836 3.307 27.1201 3.31761C27.1253 3.31913 24.0798 7.72532 20.3544 13.1085Z"
              fill={darkMode ? "white" : "black"}
            />
          </svg>{" "}
        </button>

      </div>
      {likesCount > 0 && (
        <p className="mt-2 px-4 dark:text-white">{likesCount} {t('likes')}</p>
      )}


      {commentCount > 0 && (
        <p onClick={setOpenComments(id)} className="text-[#7F7B7B] px-4 dark:text-[#BCBCBC] cursor-pointer">
          {commentCount} {t("Comments")}
        </p>
      )}
    </div>
  );
}

PostCard.propTypes = {

  name: propTypes.string,
  city: propTypes.string,
  starts: propTypes.string,
  setIsOpen: propTypes.func,
  id: propTypes.number,
  category: propTypes.string,
  likes: propTypes.string,
  info: propTypes.string,
  darkMode: propTypes.bool,
};
