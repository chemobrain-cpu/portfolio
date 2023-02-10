import React, { useEffect } from 'react';
import './CallToAction.css';
import AOS from 'aos'
import "aos/dist/aos.css";


function CallToAction() {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className='call-to-action-section' data-aos="fade-up">
            <div className='inner' style={{ backgroundImage: 'url(../../learntocode.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='curtain'>
                    <div className='inner-curtain'>
                        <h1>Its time to start investing in yourself</h1>

                        <p>
                            Online courses open the oppotunity for learning at almost anyone,regardless of their scheduling commitments
                        </p>

                        <button>GET STARTED</button>

                    </div>


                </div>

            </div>


        </div>
    );
}

export default React.memo(CallToAction);