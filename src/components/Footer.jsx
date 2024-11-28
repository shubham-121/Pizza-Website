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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sit. Rerum, consectetur officiis! Nisi, necessitatibu",
  },

  {
    name: "Angela",
    img: photo2,
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sit. Rerum, consectetur officiis! Nisi, necessitatibu",
  },

  {
    name: "Alexa",
    img: photo3,
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sit. Rerum, consectetur officiis! Nisi, necessitatibu",
  },

  {
    name: "Dave",
    img: photo4,
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sit. Rerum, consectetur officiis! Nisi, necessitatibu",
  },
];

// export default function Footer() {
//   const settings = {
//     arrows: true,
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="w-3/4 m-auto">
//       <div className="mt-20">
//         <Slider {...settings}>
//           {carouselData.map((data, idx) => (
//             <div
//               key={idx}
//               className="bg-white h-[450px] text-black rounded-xl "
//             >
//               <div className="h-56 rounded-t-xl bg-indigo-300 border-2 flex justify-center items-center ">
//                 <img className="h-44 w-44 rounded-full " src={data.img}></img>
//               </div>
//               <div className="flex flex-col justify-center items-center gap-4 p-4">
//                 <p className="text-xl font-semibold">{data.name}</p>
//                 <p>{data.review}</p>
//                 <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
//                   Read More!
//                 </button>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }
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
          marginRight: "19.5vw",
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
          marginLeft: "19vw",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    arrows: true,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div className="max-w-[100vw] mx-auto relative max-h-[50vh] bg-red-200">
        {" "}
        <Slider {...settings}>
          {carouselData.map((data, idx) => (
            <div
              key={idx}
              className="border-2 ml-60 flex flex-col max-w-[60vw] mx-auto"
            >
              <div className="border-2 bg-stone-100 flex justify-center max-w-[20vw] ml-[20vw]">
                <img
                  className="h-[30vh] object-cover rounded"
                  src={data.img}
                  alt={data.name}
                ></img>
              </div>
              <div className="text-center bg-stone-100">
                <p>{data.name}</p>
                <p>{data.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
