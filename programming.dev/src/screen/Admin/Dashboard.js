import React, { useEffect, useState, useCallback } from 'react';
import './Dashboard.css';
import Navigation from '../../components/Navigation';
import Slider from '../../components/Slider';
import "aos/dist/aos.css";
import Loader from '../../components/Loader';
import FormModal from '../../components/FormModal';
import CourseModal from '../../components/CourseModal';
import ModalError from '../../components/ModalError.js';
import { useDispatch } from "react-redux";

import Footer from '../../components/Footer';

import { getUsers } from "../../store/action/userAppStorage";



function Dashboard() {
    let [isLoading, setIsLoading] = useState(false)
    let [isRegister, setIsRegister] = useState(false)
    let [isError, setIsError] = useState(false)
    let [errorContent, setErrorContent] = useState('')
    let [data,setData] = useState([])
    let dispatch = useDispatch()

    let clearHandler = () => {

    }

    let loadUsers = async () => {
        setIsLoading(true)
        let res = await dispatch(getUsers())
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setErrorContent(res.message)
            return

        }
        setData(res.message)
        setIsLoading(false)
    }


    useEffect(()=>{
        loadUsers()
        setIsLoading(false)

    },[loadUsers])

    let gotIt = useCallback(() => {
        setIsError(false)
        setErrorContent('')
        setIsLoading(false)
    }, [])






    return (
        <>
           
            {isLoading ? <Loader /> : <></>}

            {isError ? <ModalError errorText={errorContent} gotIt={gotIt} /> : <></>}
            <Navigation clearHandler={clearHandler} />

            <div className='table-container'>
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age Range</th>
                        <th>Course</th>
                        <th>Mode of Learning</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        
                    </tr>

                    {data.map(datas=><tr>
                        <td>{datas.firstName}</td>
                        <td>{datas.lastName}</td>
                        <td>{datas.ageRange}</td>
                        <td>{datas.course}</td>
                        <td>{datas.modeOfLearning}</td>
                        <td>{datas.price}</td>
                        <td>{datas.duration}</td>
                        <td>{datas.email}</td>
                        <td>{datas.phoneNumber}</td>
                    </tr>)}
                </table>

            </div>



            <Footer />
        </>

    );
}

export default Dashboard;