import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "../common/Header"
import { Home } from "../components/home/Home"
import { Resume } from "../components/Resume/Resume"
import { Portfolio } from "../components/page/Portfolio"
import { Blog } from "../components/page/Blog"
import { Contact } from "../components/page/Contact"
import { SideContent } from "../components/side/SideContent"

export const Pages = () => {
  return (
    <>
      <BrowserRouter>
        <div className='main-div'>

          <div className='side'>
            <SideContent />
          </div>

          <main>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/resume' element={<Resume />} />
              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>


        </div>
      </BrowserRouter>
    </>
  )
}
