import React from "react"
import { Summary } from "../../common/Summary"
import { Skill } from "./Skill"
import { Experience } from "./Experience"
import { Heading } from "../../common/Heading"
import { Education } from "./Education"

export const Resume = () => {
  return <div className='pages'>
    {/* about*/}
    <Summary
      Heading={Heading}
      title='Summary'
      content='Web developer with a passion for web application development and sucess in managing development project using the agile methodologies.skilled in concptualizing,designing,development and deploying software containing logical and mathematical solution to business problems'
    />
    
    <Skill Heading={Heading}
    />

    <Education Heading={Heading}
    />
    <Experience Heading={Heading} />

  </div>
}
