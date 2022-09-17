import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Me, Logout, reset } from '../../Features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaUserFriends, FaCalendarAlt} from 'react-icons/fa'
import {BiLogOutCircle, BiMenu} from 'react-icons/bi'

const CreateUser = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, user} = useSelector((state: any)=>state.auth)
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ulangiPassword, setUlangiPassword] = useState('')
    const [role, setRole] = useState('')
    const [msg, setMsg] = useState('')
    useEffect(() => {
        dispatch(Me() as any)
    }, [dispatch])
    useEffect(() => {
        if(isError){
            navigate('/')
        }
    }, [isError, navigate])
    const logout = () => {
        dispatch(Logout() as any)
        dispatch(reset())
        navigate('/')
    }
    const saveUser = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/users', {
                nama: nama,
                email: email,
                password: password,
                ulangiPassword: ulangiPassword,
                role: role
            })
            navigate('/pengguna')
        } catch (error: any) {
            setMsg(error.response.data.msg)
        }
    }
  return (
    <div className='dashboard'>
        <div className="dashboard-page">
            {open &&
            <div className="left-dashboard">
                <Link to='/halaman-utama' className='smathom'>smathom</Link>
                <div>
                    <div className="main-menu">
                        <Link to='/halaman-utama' className='link'>
                            <AiFillHome className='icon'/>
                            <span>Halaman Utama</span>
                        </Link>
                    </div>
                    <div className="main-menu">
                        <Link to='/jadwal-pembelajaran' className='link'>
                            <FaCalendarAlt className='icon'/>
                            <span>Jadwal</span><span className='span'>Pembelajaran</span>
                        </Link>
                    </div>
                    {user && user.role === "Admin" && (
                        <div className="main-menu">
                            <Link to='/pengguna' className='link'>
                                <FaUserFriends className='icon'/>
                                <span>Pengguna</span>
                            </Link>
                        </div>
                    )}
                    <div className="main-menu">
                        <button type='submit' onClick={logout}>
                            <BiLogOutCircle className='icon'/>
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
            }
            <div className="right-dashboard">
                <nav>
                    <BiMenu className='icon' onClick={()=>setOpen(!open)}/>
                    <p>Pengguna</p>
                </nav>
                <section>
                    <main>
                        {user && user.role === "Admin" && (
                            <>
                            <p className='content-schedule'>Tambah Pengguna</p>
                            <form className='form-schedule' onSubmit={saveUser}>
                                <p className='error'>{msg}</p>
                                <div className="main-form-schedule">
                                    <label htmlFor="nama">Nama</label><br />
                                    <input type="text" id='nama' value={nama} onChange={(e)=>setNama(e.target.value)}/>
                                </div>
                                <div className="main-form-schedule">
                                    <label htmlFor="email">Email</label><br />
                                    <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div className="main-form-schedule">
                                    <label htmlFor="password">Password</label><br />
                                    <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <div className="main-form-schedule">
                                    <label htmlFor="ulangiPassword">Ulangi Password</label><br />
                                    <input type="password" id='ulangiPassword' value={ulangiPassword} onChange={(e)=>setUlangiPassword(e.target.value)}/>
                                </div>
                                <div className="main-form-schedule">
                                    <label htmlFor="role">Role</label><br />
                                    <select name="" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                                        <option value=""></option>
                                        <option value="Admin">Admin</option>
                                        <option value="Siswa">Siswa</option>
                                    </select>
                                </div>
                                <button type='submit'>Simpan</button>
                            </form>
                            </>
                        )}
                    </main>
                </section>
            </div>
        </div>
    </div>
  )
}

export default CreateUser