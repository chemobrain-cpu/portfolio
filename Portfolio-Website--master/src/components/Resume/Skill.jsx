import React from "react";
import { skill} from "../../data/data";


const Progress = ({ done, title, back }) => {
    return (
        <div className='progress'>
            <div className='progress_num'>
                <h4>{done}.</h4>
            </div>

            <div className='progress_title'>
                <h3> {title}</h3>
            </div>

            <div
                className={`progress_done ${back}`}
                style={{
                    opacity: 1,
                    width: `${done}%`,
                }}
            >
            </div>
        </div>



    )
}


export const Skill = ({ items, Heading }) => {
    return (
        <>
            <Heading title='Technical Skills' />
            <div className='skills'>
            {skill.map((item) => (
              <div className = 'skill-box' >
                <Progress title={item.text} done={item.num} back={item.class} />
              </div>
            ))}
          </div>

        </>
    )
}