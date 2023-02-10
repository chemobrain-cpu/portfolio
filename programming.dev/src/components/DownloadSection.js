import React, { useEffect } from 'react';
import './DownloadSection.css';
import AOS from 'aos'
import "aos/dist/aos.css";


function Download() {
    useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className='download-section'  data-aos="fade-up">

            <div className='download-left'>
                <div className='download-left-inner'>
                    <img src='../../phone.png' />
                </div>
            </div>


            <div className='download-right'>
                <div className='inner'>
                    <h1 className='heading'>Learning <span>anytime</span> from anywhere</h1>
                    <p className='download-about'>
                        Increase the mobility level with Programming.dev app.Take your courses in your pocket and access them whenever you want without any limits.Make your learning more engaging and productive using mordern app
                    </p>
                    <div className='download-button-con'>
                        <div className='download-button'>
                            <div className='left'>
                                <span className='material-icons'>
                                    apple
                                </span>

                            </div>
                            <div className='right'>
                                <p>Download on the</p>
                                <h2>App Store</h2>

                            </div>

                        </div>


                        <div className='download-button'>
                            <div className='left'>
                                <span className='material-icons' style={{fontSize:'30px'}}>
                                    play_arrow
                                </span>

                            </div>
                            <div className='right'>
                                <p>GET IT ON</p>
                                <h2>Google Play</h2>

                            </div>

                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default React.memo(Download);