import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, Logout, reset } from '../../Features/authSlice'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaUserFriends, FaCalendarAlt} from 'react-icons/fa'
import {BiLogOutCircle, BiMenu} from 'react-icons/bi'

const Dashboard = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState([])
    const [users, setUsers] = useState([])
    const {isError, user} = useSelector((state: any)=>state.auth)

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
    useEffect(() => {
        getCountSchedule()
        getCountUser()
    }, [])
    const getCountSchedule = async () => {
        const response = await axios.get('http://localhost:8000/count-schedule')
        setSchedule(response.data)
    }
    const getCountUser = async () => {
        const response = await axios.get('http://localhost:8000/count-user')
        setUsers(response.data)
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
                        <button type='submit' onClick={(logout)}>
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
                    <p>Halaman Utama</p>
                </nav>
                <section>
                    <main>
                        <p className='p'>Selamat Datang {user && user.nama}</p>
                        <div className="main-dashboard">
                            <div className="content-dashboard">
                                {schedule.map((schedule: any) => (
                                    <div className="content" key={schedule.id}>
                                        <p>{schedule.data}</p>
                                        <div>Jadwal</div>
                                        <div>Pembelajaran</div>
                                    </div>
                                ))}
                                <div className="content2">
                                    <FaCalendarAlt className='icon'/>
                                </div>
                            </div>
                            {user && user.role === "Admin" && (
                                <>
                                {users.map((users: any) => (
                                    <div className="content-dashboard">
                                        <div className="content" key={users.id}>
                                            <p>{users.data}</p>
                                            <div>Pengguna</div>
                                        </div>
                                        <div className="content2">
                                            <FaUserFriends className='icon'/>
                                        </div>
                                    </div>
                                ))}
                                </>
                            )}
                        </div>
                    </main>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Dashboard