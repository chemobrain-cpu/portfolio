import React, { useEffect } from 'react';
import './Action.css';
import TopicHead from './TopicHead';
import ActionCard from './ActionCard';
import {actionData} from "../data"

function Work() {


    return (
        <div className='work' >
            <div className='work-head'>
                <div className='left'>
                    <TopicHead headText='WHAT WE' colorText='DO' headColor='#fff' />

                </div>
                <div className='right'>
                    <button>View all</button>

                </div>


            </div>
            <div className='work-image-wrapper'>

                {actionData.map(data=><ActionCard 
                key={data.title} {...data}/>)}


            </div>

        </div>

    );
}

export default React.memo(Work);