"use client";
import "../../index.css";
import { Carousel } from "flowbite-react";
import image from "../../assets/imgs/descarga (4).jpg";
import monteverde from "../../assets/imgs/monteverde.jpg";
import arenal from "../../assets/imgs/arenal.jpg";
import rio from "../../assets/imgs/rio.jpg";

export function AuthCarousel() {
  return (
      <Carousel leftControl={<></>} rightControl={<></>} pauseOnHover className="rounded-none h-full hidden md:block">
        <img className="h-full" src={image} alt="..." />
        <img className="h-full" src={monteverde} alt="..." />
        <img className="h-full" src={arenal} alt="..." />
        <img className="h-full" src={rio} alt="..." />
      </Carousel>

  );
}