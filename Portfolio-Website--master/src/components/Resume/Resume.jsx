import React from "react"
import { Summary } from "./Summary"
import { Skill } from "./Skill"
import { Heading } from "../../common/Heading"

export const Resume = () => {
  return <div className='pages'>
    {/* about*/}
    <Summary Heading={Heading}
    />
    <Skill Heading={Heading}
    />

  </div>
}
