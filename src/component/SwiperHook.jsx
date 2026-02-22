import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const SwiperHook = () => {
  const images = [
    {
      id: 4,
      name: "swiperImage4",
      url: "/swiperImg1.png",
    },
    {
      id: 1,
      name: "swiperImage1",
      url: "/swiperImg2.jpg",
    },

    {
      id: 3,
      name: "swiperImage3",
      url: "/swiperImg3.jpg",
    },

    {
      id: 5,
      name: "swiperImage5",
      url: "/swiperImg4.jpg",
    },
    // {
    //   id: 2,
    //   name: "swiperImage2",
    //   url: "/swiperImg5.jpg",
    // },
    {
      id: 6,
      name: "swiperImage6",
      url: "/swiperImg6.jpg",
    },
    {
      id: 7,
      name: "swiperImage6",
      url: "/swiperImg7.jpg",
    },
  ];
  return (
    <div>
      <div className="w-xl">
        <Swiper
          style={{
            "--swiper-pagination-color": "#FFBA08",
            "--swiper-navigation-color": "#FFBA08",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "16px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
          className="mySwiper"
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {images.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <img className="rounded-lg" src={item.url} alt={item.name} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperHook;
