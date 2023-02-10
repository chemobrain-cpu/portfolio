import React from 'react';
import './Slider.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import CarouselCard from './CarouselCard';

//let { admin} = useSelector(state => state.userAuth)
function Slider() {
    let carouselData = [
        {
            headText:'PROGRAMMING.DEV',
            
        },
       
    ]






    return (
        <Carousel 
        showStatus={false} 
        autoplay={true} 
        interval={3000} 
        showThumbs={false} 
        showArrows={false} 
        showIndicators={false} >

            {carouselData.map(data=><CarouselCard {...data}/>)}
            


        </Carousel>

    );
}

export default React.memo(Slider);