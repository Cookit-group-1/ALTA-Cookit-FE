import React, { useState } from "react";

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
                    className="grid grid-cols-2 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={image.id} className="w-2/1">
                            <div className={`h-0 pb-2/3 relative ${index !== activeIndex ? '' : ''}`}>
                                <img src={image.url_image} className="inset-0 absolute  object-cover" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * (100 / images.length)}%)` }}
                >
                    {images.map((image) => (
                        <div key={image.id} className={`w-${100 / images.length} overflow-hidden`}>
                            <div className={`h-0 pb-2/3 relative ${image.id !== activeIndex ? '' : ''}`}>
                                <img src={image.url_image} className="inset-0 absolute w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>






            <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`${index === activeIndex ? "bg-gray-900" : "bg-gray-300"
                            } h-2 w-2 mx-2 rounded-full`}
                        onClick={() => jumpToSlide(index)}
                    ></button>
                ))}
            </div>


            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <button
                    className="bg-gray-800 text-white px-3 py-2 rounded-l-md"
                    onClick={prevSlide}
                >
                    Prev
                </button>
            </div>


            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <button
                    className="bg-gray-800 text-white px-3 py-2 rounded-r-md"
                    onClick={nextSlide}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default ImageCarousel;
