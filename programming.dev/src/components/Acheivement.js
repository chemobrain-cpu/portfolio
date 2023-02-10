import React from 'react';
import './Acheivement.css';
import AcheivementCard from './AcheivementCard';

import { AcheivementSectionData } from '../data'

function AcheivementSection() {
    return (
        <div className='achievement-section'>

            <div className='achievement-container'>
                <h1 className='heading'>School Achievements</h1>
                <p className='text'>Nullam leo ligula,dictum id eleifend interdum,Malesuada vulputate magna</p>

                <div className='numbers-container'>

                    {AcheivementSectionData.slice(0,2).map(data => <AcheivementCard {...data}/>)}

                </div>



                <div className='numbers-container'>
                {AcheivementSectionData.slice(2,4).map(data => <AcheivementCard {...data}/>)}

                </div>

            </div>



        </div>

    );
}

export default React.memo(AcheivementSection);