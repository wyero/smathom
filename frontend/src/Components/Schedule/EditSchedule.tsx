import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Me, Logout, reset } from '../../Features/authSlice'
import {AiFillHome} from 'react-icons/ai'
import {FaUserFriends, FaCalendarAlt} from 'react-icons/fa'
import {BiLogOutCircle, BiMenu} from 'react-icons/bi'

const EditSchedule = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hari, setHari] = useState("");
    const [mulai, setMulai] = useState("");
    const [selesai, setSelesai] = useState("");
    const [matpel, setMatpel] = useState("")
    const {id} = useParams()
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
        const getScheduleByid = async()=>{
            const response = await axios.get(`http://localhost:8000/schedule/${id}`)
            setHari(response.data.hari)
            setMulai(response.data.mulai)
            setSelesai(response.data.selesai)
            setMatpel(response.data.matpel)
        }
        getScheduleByid()
    }, [id])
    const editSchedule = async(e:any)=>{
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:8000/schedule/${id}`,{
                hari,
                mulai,
                selesai,
                matpel
            })
            navigate('/jadwal-pembelajaran')
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
                        <>
                        <p className='content-schedule'>Edit Jadwal Pembelajaran</p>
                        <form className='form-schedule' onSubmit={editSchedule}>
                            <div className="main-form-schedule">
                                <label htmlFor="hari">Hari</label><br />
                                <select name="" id="hari" value={hari} onChange={(e)=>setHari(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumad">Jumad</option>
                                    <option value="Sabtu">Sabtu</option>
                                </select>
                            </div>
                            <div className="main-form-schedule">
                                <label htmlFor="mulai">Mulai</label><br />
                                <input type="time" id='mulai'  value={mulai} onChange={(e)=>setMulai(e.target.value)}/>
                            </div>
                            <div className="main-form-schedule">
                                <label htmlFor="selesai">Selesai</label><br />
                                <input type="time" id='selesai'  value={selesai} onChange={(e)=>setSelesai(e.target.value)}/>
                            </div>
                            <div className="main-form-schedule">
                                <label htmlFor="matpel">Mata Pelajaran</label><br />
                                <select name="" id="matpel" value={matpel} onChange={(e)=>setMatpel(e.target.value)}>
                                <option value=""></option>
                                    <option value="Matematika">Matematika</option>
                                    <option value="Fisika">Fisika</option>
                                    <option value="Biologi">Biologi</option>
                                    <option value="Kimia">Kimia</option>
                                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                                    <option value="Sejarah">Sejarah</option>
                                    <option value="PKN">PKN</option>
                                    <option value="Agama">Agama</option>
                                    <option value="PJOK">PJOK</option>
                                    <option value="Seni Budaya">Seni Budaya</option>
                                    <option value="Prakarya">Prakarya</option>
                                </select>
                            </div>
                            <button type='submit'>Simpan</button>
                        </form>
                        </>
                    </main>
                </section>
            </div>
        </div>
    </div>
  )
}

export default EditSchedule