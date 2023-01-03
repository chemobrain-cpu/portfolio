import React from "react"

export const Summary = ({ items, Heading,content,title }) => {
    return (
        <>
            <Heading title={title} />
            <div className='about_details_bio'>

                <div className='about_details_bio_box'>
                    <div className='about_details_bio_box_item'>
                        <p>{content} </p>
                    </div>



                </div>

            </div>

        </>
    )
}