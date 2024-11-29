import photo1 from "./../assets/photo1.webp";
import photo2 from "./../assets/photo2.jpg";
import photo3 from "./../assets/photo3.jpg";
import photo4 from "./../assets/photo4.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const carouselData = [
  {
    name: "John Morgan",
    img: photo1,
    review:
      "Best pizza I've ever had! The crust is perfectly crispy, and the toppings are fresh and flavorful. Every bite is a delicious experience. I can't wait to order again!",
  },

  {
    name: "Angela",
    img: photo2,
    review:
      "The pizza arrived hot and fresh, just as promised. The combination of flavors is amazing, and the ingredients are of high quality. I love the variety of options on the menu!",
  },

  {
    name: "Alexa",
    img: photo3,
    review:
      "I’ve tried many pizza places, but this one stands out! The service is excellent, the delivery is fast, and the pizza is always delicious. Highly recommend the margherita with extra cheese!",
  },

  {
    name: "Dave",
    img: photo4,
    review:
      "Amazing pizza! The crust was just the right thickness, and the toppings were generous. The whole family loved it, and we’ll definitely be ordering again soon. Great job!",
  },
];

export default function Footer() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-arrow-custom slick-next`}
        style={{
          ...style,
          display: "block",
          background: "red",
          marginRight: "17vw",
          marginTop: "10px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-arrow-custom slick-prev`}
        style={{
          ...style,
          display: "block",
          background: "lightgreen",
          marginLeft: "22vw",
          marginTop: "10px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    arrows: true,
    // dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    focusOnSelect: true,
    // lazyLoad: "ondemand",
  };

  return (
    <>
      <div className="max-w-[100vw] mx-auto relative max-h-[60vh] bg-slate-300 ">
        <p className="text-center italic font-bold text-3xl text-stone-700 mb-1 ml-12">
          {" "}
          Our Testimonials
        </p>{" "}
        <Slider {...settings}>
          {carouselData.map((data, idx) => (
            <div
              key={idx}
              className="border-2 shadow-custom ml-80 flex flex-col max-w-[60vw] mx-auto"
            >
              <div className="border-2 shadow-custom rounded-full bg-stone-100 flex justify-center max-w-[20vw] ml-[20vw]">
                <img
                  className="h-[30vh] w-full  object-cover object-fill rounded-full"
                  src={data.img}
                  alt={data.name}
                ></img>
              </div>
              <div className="text-center bg-stone-100">
                <p className="text-xl font-bold italic">{data.name}</p>
                <p className="text-xl font-semibold italic">{data.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <footer>
        <div className="flex flex-col justify-center items-center border-t-2 border-black min-h-[30vh] bg-gray-800 text-white py-6">
          <div className="text-center mb-6">
            <h3 className="text-white text-2xl font-semibold ">Contact Us</h3>
            <p className="text-gray-300 text-lg mb-1">
              Email:{" "}
              <a href="mailto:support123@gmail.com" className="underline">
                support123@gmail.com
              </a>
            </p>
            <p className="text-gray-300 text-lg mb-3">
              Phone:{" "}
              <a href="tel:+12345678910" className="underline">
                +123 45678910
              </a>
            </p>
          </div>

          <div className="flex justify-center space-x-8 ">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              About
            </a>
            <a
              href="/services"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Contact
            </a>
          </div>

          <div className="text-center text-sm text-gray-300">
            <p>&copy; 2024 YourWebsite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
