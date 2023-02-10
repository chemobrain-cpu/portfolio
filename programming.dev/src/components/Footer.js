import React, { useEffect } from 'react';
import './Footer.css';
import AOS from 'aos'
import "aos/dist/aos.css";



function Footer() {
     useEffect(()=>{
        AOS.init({
            duration:1000
        });
    })


    return (
        <div className='footer-section' >
            <div className='footer-inner'>

                <div className='footer-about' data-aos="fade-up">
                    <h1 className='footer-heading'>ABOUT</h1>
                    <p className='footer-about'><span>Programming.dev</span> is an online learning platform designed for youth and teenages to incrase technological awareness accross the african continent.</p>

                </div>

                <div className='footer-courses' data-aos="fade-up">
                    <h1 className='footer-heading'>courses
                    </h1>


                    <div className='courses'>
                        <div className='courses-img-con'>
                            <img src='../../code1.jpg' />

                        </div>
                        <div className='courses-detail-con'>
                            <h3>Basics of React</h3>
                            <p>By Arierhi .p</p>

                        </div>

                    </div>
                    <div className='courses'>
                        <div className='courses-img-con'>
                            <img src='../../code2.jpeg' />

                        </div>
                        <div className='courses-detail-con'>
                            <h3>Basics of python</h3>
                            <p>By Arierhi .p</p>

                        </div>

                    </div>
                    <div className='courses'>
                        <div className='courses-img-con'>
                            <img src='../../code3.jpeg' />

                        </div>
                        <div className='courses-detail-con'>
                            <h3>Fundamentals of Nodejs</h3>
                            <p>By Arierhi .p</p>

                        </div>

                    </div>


                </div>

                <div className='footer-links' data-aos="fade-up">
                    <h1 className='footer-heading'>PAGES</h1>
                    <ul>
                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Blog
                        </li>

                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Courses
                        </li>

                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Home
                        </li>

                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Shortcodes
                        </li>

                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Typography
                        </li>

                        <li>
                            <span className='material-icons'>chevron_right</span>
                            Membership
                        </li>

                    </ul>
                </div>

                <div className='footer-contact' data-aos="fade-up">
                    <h1 className='footer-heading'>CONTACT</h1>

                    <p>No 133 ughelli,Delta state
                    </p>

                    <p>+2349071991647</p>
                  

                    <p className='footer-email'>
                        programmingdev@gmail.com
                    </p>

                </div>
            </div>

            <div className='footer-foot'>
                <p>Copyright @ 2022 Programming.dev </p>
                
            </div>
        </div>
    );
}

export default React.memo(Footer);