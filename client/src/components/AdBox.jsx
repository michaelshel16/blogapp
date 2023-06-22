import React from 'react';
import { Container } from '@mui/material';
import Carousel from "react-bootstrap/Carousel";
import HomeBanner1 from "../assets/reviewad1.jpg";
import HomeBanner2 from "../assets/reviewad2.jpg";
import HomeBanner3 from "../assets/reviewad3.jpg";
import "./Adbox.css";

const AdBox = () => {
  return (

    <Carousel fade >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeBanner1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeBanner2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeBanner3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            
    
    
  )
}

export default AdBox
