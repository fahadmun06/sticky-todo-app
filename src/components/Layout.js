import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../contexts/AuthContext';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';


export default function LayOut(props) {
    // const [collapsed, setCollapsed] = useState(false);
    const { dispatch } = useAuthContext()

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                message.success("Sign Out successfully")
                dispatch({ type: "SET_LOGGED_OUT" })
            })
            .catch((err) => {
                message.error("Please try again to signOut")
                console.log('err', err)
            })
    }
    return (
        <>
            <Layout className={`bg-${props.mode === "light" ? 'light' : 'dark'} sider`}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        minWidth: '250px',
                        minHeight: "100vh",
                        marginRight: '10px',
                    }}
                    theme={props.mode === 'light' ? 'light' : 'dark'}
                >
                    <div className="demo-logo-vertical" />
                    <span className={`text-${props.mode === "light" ? "dark" : "white"} float-left fs-4 fw-bold m-3`}>Menu
                    </span>
                    <Menu
                        style={{
                            fontFamily: 'Roboto',
                            paddingTop: '5px',
                        }}

                        mode="inline"
                        theme={props.mode === "light" ? 'light' : 'dark'}
                        items={[
                            {
                                label: <Link to='/' className='text-decoration-none fw-bold'>All Todo Lists</Link>
                            },
                            {
                                key: '1',
                                icon: <i className="fa-solid fa-forward-fast"></i>,
                                label: <Link to='/up-coming-todo' className='text-decoration-none'>Upcoming</Link>
                            },
                            {
                                key: '2',
                                icon: <i className="fa-solid fa-list"></i>,
                                label: <Link to='/today-todo' className='text-decoration-none'>Today</Link>,
                            },
                            // {
                            //     key: '3',
                            //     icon: <i className="fa-solid fa-calendar-days"></i>,
                            //     label: <Link to='/calender' className='text-decoration-none'>Calendar</Link>,
                            // },
                            {
                                key: '4',
                                icon: <i className="fa-solid fa-note-sticky"></i>,
                                label: <Link to='/' className='text-decoration-none'>Sticky Wall</Link>,
                            },
                        ]}
                    />
                    <hr className={`text-${props.mode === "light" ? 'dark' : 'light'}`} />
                    <Menu
                        style={{
                            fontFamily: 'Roboto',
                            paddingTop: '5px',
                        }}

                        mode="inline"
                        theme={props.mode === "light" ? 'light' : 'dark'}
                        items={[

                            {
                                key: '1',
                                icon: <i className="bg-danger p-2 rounded-1"></i>,
                                label: <Link to='/personal-todo' className='text-decoration-none'>Personal</Link>,
                            },
                            {
                                key: '2',
                                icon: <i className="bg-info p-2 rounded-1"></i>,
                                label: <Link to='/public-todo' className='text-decoration-none'>Work</Link>,
                            },
                            {
                                key: '3',
                                icon: <i className="fa-solid fa-plus"></i>,
                                label: <Link to='/sticky' className='text-decoration-none'>Add new List</Link>,
                            },
                        ]}
                    />
                    <hr className={`text-${props.mode === "light" ? 'dark' : 'light'}`} />
                    <Menu
                        style={{
                            fontFamily: 'Roboto',
                            marginTop: '50px',
                        }}
                        mode='inline'
                        theme={props.mode === "light" ? 'light' : 'dark'}
                        items={[
                            {
                                key: '1',
                                icon: <i className="fa-solid fa-sliders"></i>,
                                label: <Link className='text-decoration-none'>Setting</Link>,
                            },
                            {
                                key: '2',
                                icon: <i className="fa-solid fa-right-from-bracket text-danger"></i>,
                                label: <Link onClick={handleLogOut} className='text-decoration-none text-danger'>SignOut</Link>,
                            },
                        ]}
                    />
                </Sider>
                <Layout className={`bg-${props.mode === "light" ? 'light' : 'dark'}`}>
                    <div className="d-flex justify-content-between">
                        <span className={`text-${props.mode === "light" ? 'dark' : 'light'} mt-1 fs-2 mb-0 fw-bold sticky-wall`} style={{ marginLeft: 30 }}>Sticky Wall</span>
                        <span className={`form-check form-switch mt-3 me-5 text-${props.mode === 'light' ? 'dark' : 'light'} fs-5`}>
                            <input className="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label me-4" htmlFor="flexSwitchCheckDefault">{props.mode === 'dark' ? <i className="fa-solid fa-moon fs-4 text-info"></i> : <i className="fa-solid fa-sun fs-4 text-info"></i>}</label>
                        </span>
                    </div>
                    <Content className={`content-home`}
                        style={{
                            overflow: "auto",
                            backgroundColor: props.mode === 'light' ? '#fff' : "#171427",
                            boxShadow: props.mode === 'light' ? "rgba(0, 0, 0, 0.30) 0px 5px 15px" : "rgba(255, 255, 255, 0.705) 0px 5px 15px"
                        }}
                    >

                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
