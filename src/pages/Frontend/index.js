import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Home/Hero'
import { message } from 'antd'
import UpComing from './Home/UpComing'
import Today from './Home/Today'
import PersonalTodo from './Home/PersonalTodo'
import PublicTodo from './Home/PublicTodo'
import LayOut from '../../components/Layout'
// import Calender from './Home/Calender'
import { useAuthContext } from '../../contexts/AuthContext'
import LoadingBar from 'react-top-loading-bar'

export default function Index() {
    const { isAppLoading } = useAuthContext();
    const [mode, setMode] = useState("light")
    const [progress, setProgress] = useState(0)
    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark")
            message.success("Dark Mode activated")
            document.body.style.backgroundColor = "#1d3557"
        }
        else {
            setMode("light")
            message.success("Light Mode activated")
            document.body.style.backgroundColor = "white"
        }
    }
    if (isAppLoading) return (
        <main className="d-flex justify-content-center align-items-center bg-white">
            <div className='spinner-border text-info' style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
        </main>
    )

    return (
        <>
            <LoadingBar
                color='#bbd0ff'
                length={5}
                height={4}
                progress={progress}
            />
            <Routes>
                <Route path='/' element={<LayOut mode={mode} toggleMode={toggleMode} />} >
                    <Route index element={<Hero mode={mode} toggleMode={toggleMode} />} />
                    <Route path='sticky' element={<Hero mode={mode} toggleMode={toggleMode} />} />
                    <Route path='up-coming-todo' element={<UpComing mode={mode} toggleMode={toggleMode} />} />
                    {/* <Route path='calender' element={<Calender mode={mode} toggleMode={toggleMode} />} /> */}
                    <Route path='today-todo' element={<Today mode={mode} toggleMode={toggleMode} />} />
                    <Route path='personal-todo' element={<PersonalTodo mode={mode} toggleMode={toggleMode} />} />
                    <Route path='public-todo' element={<PublicTodo mode={mode} toggleMode={toggleMode} />} />
                </Route>
            </Routes>
        </>
    )
}
