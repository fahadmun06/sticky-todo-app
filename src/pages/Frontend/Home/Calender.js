import React, { useEffect, useState } from 'react'
import { Button, Card, DatePicker, Form, message } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useAuthContext } from '../../../contexts/AuthContext'
import dayjs from 'dayjs'

export default function Calender(props) {
    const { user, isAppLoading } = useAuthContext();
    const [state, setState] = useState({ date: '' })
    const [documents, setDocuments] = useState([])

    const handleDate = (_, date) => setState(s => ({ ...s, date }))

    const getTodos = async () => {
        let { date } = state
        try {
            const q = query(collection(db, "todos"), where("createdBy.uid", "==", user.uid), where('date', '==', date));
            const querySnapshot = await getDocs(q);
            const array = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                array.push(data)
            });
            setDocuments(array);
        }
        catch (err) {
            message.error("Up coming date not found")
        }
    };

    useEffect(() => {
        getTodos();
        console.log("me bhi chalo ga")
    }, []);

    return (
        <>
            {isAppLoading ?
                <main className="d-flex justify-content-center align-items-center bg-white">
                    <div className='spinner-border text-info' style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                </main>
                :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col my-4">
                            <h1 className={`text-center text-${props.mode === "light" ? "dark" : 'light'}`}>Calender Todos</h1>
                            <hr className={`text-${props.mode === "light" ? 'dark' : 'light'}`} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-between">
                        <div className="col my-3">
                            <h4 className={`text-${props.mode === "light" ? "dark" : 'light'}`}>Select Date</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6">
                            <Form.Item>
                                <DatePicker name="date" placeholder='Date here' className='w-100' onChange={handleDate} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6%'
                    }}>
                        <>
                            {documents.map((todo, i) => {
                                return <div className="col-12 col-md-5 col-lg-3 m-3 p-1 rounded-3" key={i}>
                                    <Card
                                        hoverable={true}
                                        className='list-card'
                                        bordered={false}
                                        style={{
                                            backgroundColor: todo.color,
                                            boxShadow: props.mode === 'light' ? "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(225, 225, 225, 0.3) 0px 3px 7px -3px" : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                            fontFamily: 'Roboto'
                                        }}
                                    >
                                        <h3 style={{ wordBreak: 'break-all' }}><b>{todo.title}</b></h3>
                                        <p className='mb-0'><b>{todo.status}</b></p>
                                        {/* <p className='mt-3' style={{ lineHeight: '1.5', wordBreak: 'break-all' }}>{todo.description}</p> */}
                                        <p className='mt-3' style={{ lineHeight: '1.5', wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: todo.description }}></p>
                                        <p><b>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</b></p>
                                    </Card>
                                </div>
                            })}
                        </>
                    </div>
                </div>
            }
        </>
    )
}
