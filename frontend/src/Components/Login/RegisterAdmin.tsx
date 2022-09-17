import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const RegisterAdmin = () => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ulangiPassword, setUlangiPassword] = useState('')
  const [role, setRole] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const createAdmin = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/register', {
        nama: nama,
        email: email,
        password: password,
        ulangiPassword: ulangiPassword,
        role: role
      })
      navigate('/')
    } catch (error: any) {
      setMsg(error.response.data.msg)
    }
  }
  return (
    <div className='register'>
      <form onSubmit={createAdmin}>
        <p>Register</p>
        <p className='error'>{msg}</p>
        <div className="form-register">
          <input type="text" placeholder='Nama'  value={nama} onChange={(e)=>setNama(e.target.value)}/>
        </div>
        <div className="form-register">
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-register">
          <input type="password" placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="form-register">
          <input type="password" placeholder='Ulangi Password'  value={ulangiPassword} onChange={(e)=>setUlangiPassword(e.target.value)}/>
        </div>
        <div className="form-register">
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value=""></option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type='submit'>Daftar</button>
      </form>
    </div>
  )
}

export default RegisterAdmin