import React from "react";
import { projects } from "../../data/data";
import { projects_2 } from "../../data/data";
import { Card } from "./Portfolio-card";

import { Summary } from "../../common/Summary"
import { Heading } from "../../common/Heading"

export const Portfolio = () => {
    return (
        <>
            <section className='pages portfolio'>

                <Card
                    title='Coinbase(mobile)'
                    content='I built a crypto trading application called Coincap that update users the price of current crypto assets and know when its right to trade.It teaches users basic trading technique that would enable them trade on a more live application like coinbase and blockchain.The project was built with the React native framework while the backend was a REST api built with nodejs/express. I integrated other external libraries and API such as AWS bucket for images storage,mailjet sms and email API for sending transactional sms and emails.
            The backend was deployed on the Heroku platform'
                    images={projects}
                    link='./images/app.apk'
                    actiontext='here</a> to download the android version of the project'
                />

                <Card
                    title='Coinbase(web)'
                    content='Its the web version of my coinbase clone called coincap'
                    images={projects_2}
                    link='https://coincap.cloud'
                    actiontext='here</a> to view the web version of the project'
                />



            </section>




        </>
    )
}