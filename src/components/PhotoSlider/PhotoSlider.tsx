import React from "react";
import Carousel from "react-bootstrap/Carousel";

export const PhotoSlider = ({ images }) => {
  return (
    <Carousel
      fade
      controls={false}
      indicators={true}
      className="carousel slide carousel-dark text-center"
    >
      {images.map((image, index) => (
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image}
            height={200}
            style={{
              minWidth: "250px",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
