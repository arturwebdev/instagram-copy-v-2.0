import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import loginImage from '../../images/loginImages';
import { fetchUsers, selectUsers, setInitialUser } from '../../store/slices/usersSlice/usersSlice';
import './Login.css'

function Login() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(selectUsers) 
    const formRef = useRef(null)

    useEffect(() => {
        console.log(users.initialUser);
        if(users.initialUser.username === formRef.current[0].value && formRef.current[1].value === users.initialUser.password) {
            navigate('/inst')
            formRef.current[0].value = '';
            formRef.current[1].value = '';
        }
    },[users.initialUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formRef.current[0].value);
        console.log(formRef.current[1].value);

        dispatch(setInitialUser({log: formRef.current[0].value,pass: formRef.current[1].value}))
          
        
    }


    useEffect(() => {
        if(!users.data.length) {
            dispatch(fetchUsers())
        }
    },[])
    return(
        <div className='login'>
            <form onSubmit={handleSubmit} ref={formRef}>
                <img src={loginImage.loginImage} alt=''/>
                <input type='text' placeholder='Login'/>
                <input type='text' placeholder='Password'/>
                <button style={{cursor: 'pointer'}}>Login</button>
            </form>
        </div>
    )
}

export default Login