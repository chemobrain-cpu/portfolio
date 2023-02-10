import React from 'react';
import './Navigation.css';


function Navigation({clearHandler}) {

    let handleclearHandler = ()=>{
        clearHandler()
    }

    window.addEventListener("scroll", function () {
        const navigation = document.querySelector(".navigation")
        const button = document.querySelector(".navigation li button")
        

        if (window.scrollY > 150) {
           navigation.style.backgroundColor = '#fff'
            button.style.backgroundColor = 'rgb(72, 63, 148)'
            button.style.color = '#fff'

        } else {
            navigation.style.backgroundColor = 'transparent'
            button.style.color = '#fff'
            
        }
    })

    return (
        <div className='navContainer'>
            <div className='navigation'>
                <div className='logoContainer'>
                    <h1></h1>
                </div>
        
                <div className='menuContainer'>
                    <ul>
                        <li> <button onClick={handleclearHandler}>Register</button></li>
                    </ul>

                </div>

            </div>
        </div>

    );
}

export default React.memo(Navigation);