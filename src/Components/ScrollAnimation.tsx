import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
    children: React.ReactNode;
    duration?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, duration }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: duration,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            },
        });
    }, []);

    return <div ref={elementRef} style={{ opacity: 0, transform: "translateY(50px)" }}>{children}</div>;
};

export default ScrollAnimation;
