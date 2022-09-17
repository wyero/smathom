import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, Logout, reset } from '../../Features/authSlice'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillHome, AiOutlineDelete} from 'react-icons/ai'
import {FaUserFriends, FaCalendarAlt} from 'react-icons/fa'
import {BiLogOutCircle, BiMenu, BiEdit} from 'react-icons/bi'
import {FiPlus} from 'react-icons/fi'

const User = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
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
        if(user && user.role !== "Admin"){
            navigate('/halaman-utama')
        }
    }, [isError, navigate, user])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await axios.get('http://localhost:8000/users')
        setUsers(response.data)
    }
    const deleteUsers = async (id: number) => {
        try {
            axios.delete(`http://localhost:8000/users/${id}`)
            getUsers()
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
                    <p>Pengguna</p>
                </nav>
                <section>
                    <main>
                        {user && user.role === "Admin" && (
                            <>
                            <div className="new-schedule tuser">
                                <Link to='/tambah-pengguna' className='link'>
                                    <FiPlus className='icon'/>
                                    <span>Tambah Pengguna</span>
                                </Link>
                            </div>
                            <div className="table">
                                <p>Pengguna</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((users: any, index) => (
                                            <tr key={users.id}>
                                                <td>{index+1}</td>
                                                <td>{users.nama}</td>
                                                <td>{users.email}</td>
                                                <td>{users.role}</td>
                                                <td className='td'>
                                                    <Link to={`/edit-pengguna/${users.id}`} className='link'>
                                                        <BiEdit className='icon'/>
                                                    </Link>
                                                    <button type='submit' onClick={()=>deleteUsers(users.id)}>
                                                        <AiOutlineDelete className='icon'/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </>
                        )}
                    </main>
                </section>
            </div>
        </div>
    </div>
  )
}

export default User