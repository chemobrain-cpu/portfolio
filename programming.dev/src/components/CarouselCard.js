import React from 'react';
import './CarouselCard.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AnimatedText from 'react-animated-text-content';

function CarouselCard({ headText }) {
    return (
        <div className='carouselCard'
            style={{ backgroundImage: 'url(../code6.jpeg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

            <div className='carouselContent'>

                <AnimatedText
                    type="words" // animate words or chars
                    animation={{
                        x: '200px',
                        y: '-20px',
                        scale: 1.1,
                        ease: 'ease-in-out',
                    }}
                    animationType="float"
                    interval={0.06}
                    duration={4}
                    tag="h1"
                    includeWhiteSpaces
                    threshold={0.1}
                    rootMargin="20%"
                    className='h1'
                >
                   we're creating technical awareness accross africa
                </AnimatedText>

                <p>Programming.dev strives to bring technolog0cal knowledge into every doorstep</p>

                <div className='buttons-container'>
                    <button>
                        Start learning
                    </button>

                    
                </div>

              
            
            </div>


        </div>

    );
}

export default React.memo(CarouselCard);