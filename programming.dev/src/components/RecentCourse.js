import React from 'react';
import './RecentCourse.css';
import CourseCard from './CourseCard';
import {recentCourses} from '../data'

function RecentCourseSection({openCourseHandler}) {
    return (
        <div className='recent-course-section'>
            <h1 className='heading'>Recent courses</h1>

            <div className='course-container'>
            {recentCourses.map(data=><CourseCard {...data}
                detailHandler={openCourseHandler}/>)}


            </div>


        </div>

    );
}

export default React.memo(RecentCourseSection);