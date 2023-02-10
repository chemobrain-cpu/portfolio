import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import Navigation from '../../components/Navigation';
import Slider from '../../components/Slider';
import "aos/dist/aos.css";
import Loader from '../../components/Loader';
import FormModal from '../../components/FormModal';
import CourseModal from '../../components/CourseModal';
import ModalError from '../../components/ModalError.js';
import { useDispatch } from "react-redux";

import Feature from '../../components/Feature';
import TopCourseSection from '../../components/TopCourseSection';
import LearningSection from '../../components/LearningSection';
import RecentCourse from '../../components/RecentCourse';
import Acheivement from '../../components/Acheivement';
import Testimonial from '../../components/Testimonial';
import DownloadSection from '../../components/DownloadSection';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';
import Action from '../../components/Action';

import { register } from "../../store/action/userAppStorage";



function Home() {
    let [isLoading, setIsLoading] = useState(false)
    let [isRegister, setIsRegister] = useState(false)
    let [isOpenCourse, setIsOpenCourse] = useState(false)
    let [openCourseContent, setOpenCourseContent] = useState('')
    let [isError, setIsError] = useState(false)
    let [errorContent, setErrorContent] = useState('')
    let dispatch = useDispatch()



    let handleRegisterHandler = async (data) => {
        setIsLoading(true)
        setIsError(false)
        setErrorContent('')
        setIsRegister(false)

        let res = await dispatch(register(data))

        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setErrorContent(res.message)
            return

        }

        setIsLoading(false)
        setIsError(true)
        setErrorContent(res.message)

    }





    let gotIt = useCallback(() => {
        setIsError(false)
        setErrorContent('')
        setIsLoading(false)
    }, [])



    let clearHandler = () => {
        setIsLoading(false)
        setIsOpenCourse(false)
        setIsError(false)
        setErrorContent('')
        setIsRegister(prev => !prev)

    }



    let courseHandler = () => {
        setIsLoading(false)
        setIsError(false)
        setErrorContent('')
        setIsRegister(false)
        setIsOpenCourse(prev => !prev)

    }

    let openCourseHandler = (data) => {
        setIsLoading(false)
        setIsRegister(false)
        setOpenCourseContent(data)
        setIsError(false)
        setErrorContent('')
        setIsOpenCourse(true)
    }



    return (
        <>
            {isRegister ? <FormModal clearHandler={clearHandler} handleRegisterHandler={handleRegisterHandler} /> : <></>}

            {isOpenCourse ? <CourseModal courseHandler={courseHandler} content={openCourseContent} clearHandler={clearHandler} /> : <></>}

            {isLoading ? <Loader /> : <></>}

            {isError ? <ModalError errorText={errorContent} gotIt={gotIt} /> : <></>}

            <Navigation clearHandler={clearHandler} />

            <Slider />

            <Feature />

            <Action />

            <TopCourseSection openCourseHandler={openCourseHandler} />

            <LearningSection />

            <RecentCourse openCourseHandler={openCourseHandler} />

            <Acheivement />

            <Testimonial />

            <DownloadSection />

            <CallToAction />

            <Footer />
        </>

    );
}

export default Home;