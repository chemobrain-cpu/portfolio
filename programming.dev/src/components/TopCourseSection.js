import React from 'react';
import './TopCourseSection.css';
import CourseCard from './CourseCard';
import {topCourses} from '../data'

function TopCourse({openCourseHandler}) {

    return (
        <div className='top-course-section'>
            <h1 className='heading'>Top courses</h1>

            <div className='course-container'>

                {topCourses.map(data=><CourseCard {...data}
                detailHandler={openCourseHandler}/>)}

            </div>


        </div>

    );
}

export default React.memo(TopCourse);