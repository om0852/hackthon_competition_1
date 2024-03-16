import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slider = () => {
    const images = [
        "https://source.unsplash.com/random/?saiababa",
        "https://source.unsplash.com/random/?saiababa",
        "https://source.unsplash.com/random/?saiababa",
       
    ];

    return (
        <Slide className="w-[80vw] h-[50vh]">
            <div className="each-slide-effect w-[80vw] h-[50vh] ">
                <div className="w-[80vw] h-[50vh] flex justify-center items-center " style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div  className="each-slide-effect w-[80vw] h-[50vh]">
                <div className="w-[80vw] h-[50vh] flex justify-center items-center" style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className="each-slide-effect w-[80vw] h-[50vh]">
                <div className="w-[80vw] h-[50vh]" style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span>Slide 3</span>
                </div>
            </div>
        </Slide>
    );
};

export default Slider;