import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, Logout, reset } from '../../Features/authSlice'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillHome, AiOutlineDelete} from 'react-icons/ai'
import {FaUserFriends, FaCalendarAlt} from 'react-icons/fa'
import {BiLogOutCircle, BiMenu, BiEdit} from 'react-icons/bi'
import {FiPlus} from 'react-icons/fi'

const Schedule = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState([])
    const {isError, user} = useSelector((state: any)=>state.auth)
    const logout = () => {
        dispatch(Logout() as any)
        dispatch(reset())
        navigate('/')
    }

    useEffect(() => {
        dispatch(Me() as any)
    }, [dispatch])
    useEffect(() => {
        if(isError){
            navigate('/')
        }
    }, [isError, navigate])
    useEffect(() => {
        getSchedule()
    }, [])
    const getSchedule = async() => {
        const response = await axios.get('http://localhost:8000/schedule')
        setSchedule(response.data)
    }
    const deleteSchedule = async(id: number) => {
        try {
            await axios.delete(`http://localhost:8000/schedule/${id}`)
            getSchedule()
        } catch (error) {
            console.log(error)
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
                    <p>Jadwal Pembelajaran</p>
                </nav>
                <section>
                    <main>
                        {user && user.role === "Admin" && (
                            <div className="new-schedule">
                                <Link to='/tambah-jadwal' className='link'>
                                    <FiPlus className='icon'/>
                                    <span>Tambah Jadwal</span>
                                </Link>
                            </div>
                        )}
                        <div className="table">
                            <p>Jadwal Pembelajaran</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Hari</th>
                                        <th>Mulai</th>
                                        <th>Selesai</th>
                                        <th>Matpel</th>
                                        {user && user.role === "Admin" && (
                                            <th>Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedule.map((schedule: any, index) => (
                                        <tr key={schedule.id}>
                                            <td>{index+1}</td>
                                            <td>{schedule.hari}</td>
                                            <td>{schedule.mulai}</td>
                                            <td>{schedule.selesai}</td>
                                            <td>{schedule.matpel}</td>
                                            {user && user.role === "Admin" && (
                                                <td className='td'>
                                                    <Link to={`/edit-jadwal/${schedule.id}`} className='link'>
                                                        <BiEdit className='icon'/>
                                                    </Link>
                                                    <button type='submit' onClick={()=>deleteSchedule(schedule.id)}>
                                                        <AiOutlineDelete className='icon'/>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Schedule