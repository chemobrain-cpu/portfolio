import React from 'react';
import './ModalError.css';
import "react-activity/dist/Spinner.css";

let Loader = ({errorText,gotIt}) => {
    return <div className='error_modal_screen'>
        <div className='modal_center'>
            <div className='modal_input_card'>
                <div className='modal_heading_con'>
                    <p >{errorText}</p>
                    <button onClick={gotIt}>got it</button>
                </div>
            </div>

        </div>

    </div>
}

export default React.memo(Loader)