import axios from "axios";
import "./Categories.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { useEffect } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Loader from "../../../components/Loader/Loader";
import ErrorLoad from "./../../../components/ErrorLoad";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loader, setLodaer] = useState(true);
  const [error, setError] = useState(false);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
      );
      setCategories(data.categories);
      setLodaer(false);
    } catch (error) {
      setLodaer(false);
      setError(true);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const handel = async (category) => {
    console.log(category.name);
    navigate(`/products/${category.name}/${category._id}`);
  };
  if (loader) {
    return <Loader />;
  }
  if (error) {
    return <ErrorLoad />;
  }
  return (
    <>
      <Swiper
        breakpoints={{
          200: {
            slidesPerView: 1,
          },
          350: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div class="swiper-wrapper">
          <span slot="wrapper-start">Wrapper Start</span>
          {categories.map((category) => (
            <SwiperSlide
              key={category.id}
              onClick={() => handel(category, category.name)}
            >
              <img src={category.image.secure_url} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default Categories;
