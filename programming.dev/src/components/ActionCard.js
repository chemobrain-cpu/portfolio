import React, { useEffect } from 'react';
import './ActionCard.css';
import AOS from 'aos'
import "aos/dist/aos.css";

function ActionCard({title,content,imgUrl}) {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })

    return (<div className='work-image' style={{ backgroundImage: `${imgUrl}`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} data-aos="fade-up">
    <div className='curtain'>
        <h1>{title}</h1>
        <p>{content}</p>

    </div>

</div>);
}

export default React.memo(ActionCard);