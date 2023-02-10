import React from 'react';
import './CourseModal.css';
import "react-activity/dist/Spinner.css";

let CourseModal = ({courseHandler,content,clearHandler,}) => {

    let handleCourseHandler = ()=>{
        clearHandler()
    }

    
    return <div className='course_modal_screen'>
        <div className='modal_input_card'>
            <div className='cancel'>

                <span className='material-icons' onClick={courseHandler} >
                    clear
                </span>

            </div>
            <h1>{content.title}</h1>

            <p>{content.about}</p>
            
            <button onClick={clearHandler}>Register</button>



        </div>
    </div >
}

export default React.memo(CourseModal )