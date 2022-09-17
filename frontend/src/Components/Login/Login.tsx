import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logoSmathom from '../../Asset/Image/smathom.png'
import {HiOutlineMail} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {VscKey} from 'react-icons/vsc'
import { LoginUser, reset } from '../../Features/authSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isError, isLoading, isSuccess, message} = useSelector((state: any) => state.auth)
    useEffect(() => {
        if(user || isSuccess){
            navigate('/halaman-utama')
        }
        dispatch(reset())
    }, [user, isSuccess, dispatch, navigate])
    const Auth = (e: any) => {
        e.preventDefault()
        dispatch(LoginUser({email, password}) as any) 
    }
  return (
    <div className='login'>
        <div className="login-page">
            <div className="left-login-page"></div>
            <div className="right-login-page">
                <img src={logoSmathom} alt="logo-smathom" className='logo-smathom'/>
                <p>Login</p>
                <div className="form-login">
                    <form onSubmit={Auth}>
                        {isError && <p className='error'>{message}</p>}
                        <div className="input">
                            <label htmlFor="email" className='icon'><HiOutlineMail/></label>
                            <input type="email" placeholder='Email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
                        </div>
                        <div className="input">
                            <label htmlFor="password" className='icon'><VscKey/></label>
                            <input type="password" placeholder='Password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
                        </div>
                        <button type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login