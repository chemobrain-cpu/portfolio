import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import Spinner from "react-activity/dist/Spinner"
import "react-activity/dist/Spinner.css"


const Home = React.lazy(() => import('./screen/general_screen/Home'))
const Dashboard = React.lazy(() => import('./screen/Admin/Dashboard'))


let suspenseStyle = {
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  width: '100vw',
  height: '100vh'
}


function App() {
  let dispatch = useDispatch()

  let loadUser =async()=>{
    let res = await dispatch(checkIfIsLoggedIn())
    if(!res.bool){
     throw new Error('an error occured')
    }
    return true
   } 

  useEffect(() => {

    loadUser().then(data=>{
    }).catch(data=>{
    })
    
  }, [loadUser])

  


  

  return (
    <div className="App">

      <Suspense fallback={<div style={suspenseStyle} >
        <Spinner
          size={30}
          color="rgb(20, 40, 56)"
        />
      </div>}>

        <Routes>
          {/* Admin Routes*/}
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        
        </Routes>
      </Suspense>


    </div>

  );
}

export default App;
