import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Image {
    id: number;
    url_image: string;
}

interface ImageCarouselProps {
    images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevSlide = () => {
        const index = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(index);
    };

    const nextSlide = () => {
        const index = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(index);
    };

    const jumpToSlide = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full">

            <div className="overflow-hidden">
                <div
                    className={`flex w-${images.length}/1 transition-transform duration-500 ease-in-out`}
                    style={{ transform: `translateX(-${activeIndex * (100 / images.length)}%)` }}
                >
                    {images.map((image, index) => (
                        // <div key={image.id} className={`w-${images.length}/1`}>
                        <div key={image.id} className={`w-${images.length}/1`}>
                            <div className='h-0 pb-2/3 relative '>
                                <img src={image.url_image} className="rounded-2xl inset-0 w-full h-full absolute  object-cover" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`${index === activeIndex ? "bg-primary" : "bg-neutral"
                            } h-2 w-2 mx-2 rounded-full`}
                        onClick={() => jumpToSlide(index)}
                    ></button>
                ))}
            </div>


            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <button
                    className="btn btn-circle btn-primary text-4xl text-bold"
                    onClick={prevSlide}
                >
                    <IoIosArrowBack />
                </button>
            </div>


            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <button
                    className="btn btn-circle btn-primary text-4xl text-bold"
                    onClick={nextSlide}
                >
                    <IoIosArrowForward />
                </button>
            </div>


        </div>
    );
};

export default ImageCarousel;
