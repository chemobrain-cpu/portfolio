import React, { useEffect } from 'react';
import './CourseCard.css';
import AOS from 'aos'
import "aos/dist/aos.css";
import AnimatedText from 'react-animated-text-content';

function CourseCard({title,name,about,price,detailHandler,imgUrl}) {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })

    let handleClick = ()=>{
        let data = {
            title,
            about
        }

        detailHandler(data)
    }


    return (
        <div className='course-card' data-aos="fade-up" onClick={handleClick}>
            <div className='course-card-head' style={{ backgroundImage: `${imgUrl}`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='curtain'>
                    <div className='trend'>
                        <p>HOT</p>
                    </div>

                </div>

            </div>
            <div className='course-card-tail'>
                <div className='about'>
                    <p className='course-name'>{title}</p>
                    <h3 className='course-title'>{name}</h3>
                </div>
                <div className='pricing'>
                    <p>{price}</p>


                </div>



            </div>

        </div>
    );
}

export default React.memo(CourseCard);