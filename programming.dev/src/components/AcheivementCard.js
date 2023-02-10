import React, { useEffect } from 'react';
import './AcheivementCard.css';
import AOS from 'aos'
import "aos/dist/aos.css";
import NumberCounter from 'number-counter'


function AcheivementCard({icon,no,text}) {
     useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className='acheivement-card' data-aos="fade-up">
            <div className='icon-container'>
                <div className='icon'>
                    <span className='material-icons'>{icon}
                    </span>

                </div>

            </div>
            <div className='numbers-container'>
                <h2><NumberCounter end={`${no}`} delay={1000}/></h2>
                <p>{text}</p>
            </div>

        </div>

    );
}

export default React.memo(AcheivementCard);