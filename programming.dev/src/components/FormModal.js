import React,{useState} from 'react';
import './FormModal.css';


let FormModal = ({clearHandler,handleRegisterHandler}) => {
    let [firstName,setFirstName] = useState('')
    let [lastName,setLastName] = useState('')
    let [ageRange,setAgeRange] = useState('0-18')
    let [course,setCourse] = useState('Front-end development')
    let [email,setEmail] = useState('')
    let [phoneNumber,setPhoneNumber] = useState('Front-end development')
    let [modeOfLearning,setModeOfLearning] = useState('online')


    let [price,setPrice] = useState('12')
    let [duration,setDuration] = useState('4 month')

    let changeFirstName = (e)=>{
        let value = e.target.value
        setFirstName(value)
    }
    let changeEmail = (e)=>{
        let value = e.target.value
        setEmail(value)
    }
    let changePhoneNumber = (e)=>{
        let value = e.target.value
        setPhoneNumber(value)
    }

    let changeLastName = (e)=>{
        let value = e.target.value
        setLastName(value)

    }
    let changeAgeRange = (e) =>{
        let value = e.target.value
        setAgeRange(value)

    }

    let changeCourse =(e)=>{
        let value = e.target.value
        setCourse(value)

    }

    let changeModeOfLearning =(e)=>{
        let value = e.target.value
        setModeOfLearning(value)
        if(e.target.value === 'online'){
            setPrice(12)
        }else{
            setPrice(450)
        }

    }

    
    

    let handleClearHandler = ()=>{
        clearHandler()
    }

    let registerHandler = (e)=>{
        e.preventDefault()
        if(!course || !modeOfLearning || !ageRange){

            return
        }
        handleRegisterHandler({firstName,
            lastName,
            ageRange,
            course,
            modeOfLearning,
            price,
            duration,
            email,
            phoneNumber,
        })
    }


    


    return <div className='form_modal_screen'>

        <div className='modal_input_card'>
            <div className='cancel'>

                <span className='material-icons' onClick={handleClearHandler}>
                    clear
                </span>

            </div>
            <h1>LOGO</h1>
            <p>Please contact administrator before registering for a course</p>
            <form onSubmit={registerHandler}>
                <div className='form-card'>
                    <label>First Name</label>
                    <input className='input' value={firstName} onChange={changeFirstName} required={true}></input>

                </div>
                <div className='form-card'>
                    <label>Last Name</label>
                    <input className='input' value={lastName} onChange={changeLastName}required={true}></input>

                </div>
                <div className='form-card'>
                    <label>Select Age Range</label>
                    <select className='input' value={ageRange} onChange={changeAgeRange} required={true}>
                        <option >0-18</option>
                        <option>19-25</option>
                        <option>26-45</option>
                        <option>45 and above</option>
                    </select>

                   

                </div>

                <div className='form-card'>
                    <label>Select Course</label>
                    <select className='input' value={course} onChange={changeCourse} required={true}>
                        <option>Front-end development</option>

                        <option>Back-end development</option>

                        <option>full stack web development</option>

                        <option>full stack mobile app development</option>

                        <option>Ethical Hacking</option>

                        <option>Blockchain</option>

                    </select>

                </div>

                <div className='form-card'>
                    <label>Mode Of Learning</label>
                    <select className='input' value={modeOfLearning} onChange={changeModeOfLearning} required={true}>
                    <option  defaultValue={true}>online</option>
                        <option>offline</option>
                        
                    </select>

                </div>

                <div className='form-card'>
                    <label>Duration</label>
                    <input className='input' value={duration}  readOnly={true}></input>

                </div>

                <div className='form-card'>
                    <label>Phone Number</label>
                    <input className='input' value={phoneNumber} onChange={changePhoneNumber} required={true}></input>

                </div>

                <div className='form-card'>
                    <label>Email</label>
                    <input className='input' value={email} type='email' onChange={changeEmail}  required={true}></input>

                </div>



                <div className='form-card'>
                    <label>Price In Dollars</label>
                    <input className='input' value={price}readOnly={true}>

                    </input>


                </div>

                <div className='form-card'>
                    <button>
                        register
                    </button>
                </div>


            </form>



        </div>
    </div >
}

export default React.memo(FormModal)