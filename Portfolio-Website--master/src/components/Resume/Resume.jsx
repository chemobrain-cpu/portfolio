import React from "react"
import { Summary } from "./Summary"
import { Skill } from "./Skill"
import { Experience } from "./Experience"
import { Heading } from "../../common/Heading"
import { Education } from "./Education"

export const Resume = () => {
  return <div className='pages'>
    {/* about*/}
    <Summary Heading={Heading}
    />
    <Skill Heading={Heading}
    />

    <Education Heading={Heading}
    />
    <Experience Heading={Heading}/>

  </div>
}
