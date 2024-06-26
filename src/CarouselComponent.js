import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarouselComponent.css";
import slide1 from "./slide1.jpg";
import slide2 from "./slide2.jpg";
import slide3 from "./slide3.png";

function CarouselComponent() {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img src={slide1} alt="Slide 1" className="d-block w-100"  />
         
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide2} alt="Slide 2" className="d-block w-100" />
          
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide3} alt="Slide 3" className="d-block w-100" />
          
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
