import React, { useEffect } from 'react';
import './Testimonial.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import AOS from 'aos'
import "aos/dist/aos.css";





function Testimonial() {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className='testimonial-section' data-aos="fade-up">
            <div className='testimonial-container'>
                <h1 className='heading'>Testimonials</h1>
                <span className='material-icons'>
                    format_quote
                </span>

                <Carousel
                    showStatus={false}
                    autoplay={true}
                    interval={3000}
                    showArrows={false}
                    showIndicators={false}>
                    <div className='carousel-card'>
                        <p className='testimony'>
                            It is no exaggeration to say this Programming.dev experience was transformative-both professionally and personally.This workshop will long remain a high point of my life.
                        </p>
                        <h1 className='testimony-author'>Linda Green</h1>

                        <p className='author-position'>Product Manager,Apple Inc
                        </p>

                    </div>


                </Carousel>

            </div>

        </div>
    );
}

export default React.memo(Testimonial);