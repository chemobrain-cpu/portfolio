import React from 'react';
import './Feature.css';
import FeatureCard from './FeatureCard';
import {featureData} from '../data'

function Feature() {

    return (
        <div className='feature-section'>
            <div className='feature-container'>
                
                <div className='feature-card-container'>

                    {featureData.map(data=>< FeatureCard {...data}/>)}

                </div>




            </div>

        </div>

    );
}

export default React.memo(Feature);