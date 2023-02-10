import React, { useEffect } from 'react';
import './FeatureCard.css';


function Feature({iconName,title,about}) {
  

    return (
        <div className='feature-card' >
            <div className='card-head'>
                <span className='material-icons'>
                    {iconName}
                </span>
                <h2>{title}</h2>

            </div>
            <div className='card-tail'>
                <p>{about}</p>
            </div>

        </div>

    );
}

export default React.memo(Feature);