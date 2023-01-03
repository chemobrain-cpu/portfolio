import React from "react";
import { Summary } from "../../common/Summary"
import { Heading } from "../../common/Heading"

export const Card = ({title,content,images,link,actiontext}) => {
    return (<div className='portfolio-card'>
        <Summary
            Heading={Heading}
            title={title}
            content={content}
        />

        <div className="porfolio-image">
            <div className="porfolio-image-box">
                {images.map(data => <img src={data.images}
                    alt='l'
                />)}
            </div>
        </div>

        <p className='p'>
            click <a href={link} className='a'>here</a> {actiontext}
        </p>

    </div>)
}