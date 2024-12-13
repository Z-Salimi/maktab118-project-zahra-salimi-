"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "@/public/1-1.jpeg";
import image2 from "@/public/3-8.jpeg";
import image3 from "@/public/6-1_11zon.jpeg";
import image4 from "@/public/8-2_11zon.jpeg";
import image5 from "@/public/9-1-1_11zon.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface for image data
interface ImageData {
  src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
  {
    src: image4,
  },
  {
    src: image5,
  },
];

export default function ImageSlider(): JSX.Element {
  // State to keep track of the current image index
  let [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);


  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const clickSlide = (index:number): void => {
    setCurrentIndex(index)
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto py-4">
      <div
        className="relative w-[80vw] h-[560px] group mx-auto"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          className="rounded-2xl object-center transition-all duration-500 ease-in-out cursor-pointer border-8 border-white"
        />
      </div>
      
      <div className="flex justify-center gap-4 pt-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={()=>clickSlide(index)}
            className={`h-6 w-6 mx-1 cursor-pointer border-2 border-white shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] rounded-full ${
              index === currentIndex
                ? "bg-gray-600 rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}