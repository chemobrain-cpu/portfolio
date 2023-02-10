import React, { useEffect } from 'react';
import './LearningCard.css';
import AOS from 'aos'
import "aos/dist/aos.css";



function LearningCard({imgUrl,courseName}) {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className="learning-card" data-aos="fade-up">
            <img src={`${imgUrl}`} />
            <h2>{courseName}</h2>
        </div>
    );
}

export default React.memo(LearningCard);