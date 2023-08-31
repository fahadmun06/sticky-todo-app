import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Button, Card, ColorPicker, DatePicker, Divider, Form, Input, Modal, Select, message } from 'antd';
import dayjs from 'dayjs';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Title from 'antd/es/skeleton/Title';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialstate = { title: '', date: '' }
export default function Hero(props) {
    const { isAppLoading, user } = useAuthContext();
    const [documents, setDocuments] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState('')
    const [state, setState] = useState(initialstate)
    const [selected, setSelected] = useState('personal');
    const [color, setColor] = useState("#B1FFF4")
    const [isProcessing, setIsProcessing] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handleDate = (_, date) => setState(s => ({ ...s, date }))

    const clearModal = () => {
        document.getElementsByClassName("text-clr").value = "";
    }

    const handleSubmit = async () => {
        let { title, date, description } = state

        if (title.length < 3) { return message.error("Your title should be atleast 3 chars") }
        if (!date) { return message.error("Please select the Date ") }
        if (!color) return message.error("Please select the color")


        const todo = {
            title, date, description: value, color, value,
            status: selected,
            dateCreated: date,
            id: Math.random().toString(36).slice(2),
            createdBy: {
                fullName: user.fullName,
                email: user.email,
                uid: user.uid,
                dob: user.dob,
            }
        }
        setIsProcessing(true)

        try {
            await setDoc(doc(db, "todos", todo.id), todo);
            message.success("A new List added successfully")
            setDocuments(docs => [...docs, todo])
        } catch (e) {
            message.error("Error adding document: ", e);
        }
        clearModal()
        setIsProcessing(false)
        setIsModalOpen(false)
    }


    const getTodos = async () => {
        try {
            const q = query(collection(db, "todos"), where("createdBy.uid", "==", user.uid))
            const querySnapshot = await getDocs(q);
            const array = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                array.push(data)
            });
            setDocuments(array)
        } catch (err) {
            message.error("todo does not created", err)
        }

    }
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col my-3">
                        <h1 className={`text-${props.mode === 'light' ? 'dark' : 'light'} text-center`}>All Todos Lists</h1>
                        <hr className={`text-${props.mode === 'light' ? 'dark' : 'light'}`} />
                    </div>
                </div>
                {isAppLoading ?
                    <main className="d-flex justify-content-center align-items-center bg-white">
                        <div className='spinner-border text-info' style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                    </main>
                    :
                    <div className="row" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5%'
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
                                        <p><b>{todo.dateCreated ? dayjs(todo.dateCreated).format("dddd, DD/MM/YYYY") : ""}</b></p>
                                    </Card>
                                </div>
                            })}
                        </>


                        <>
                            <div className="col-12 col-md-5 col-lg-3 m-3 rounded-3 p-1">
                                <Card
                                    className='d-flex justify-content-center align-items-center list-card'
                                    style={{
                                        backgroundColor: props.mode === "ligth" ? '#7a7a7a4f' : "lightgray",
                                        cursor: 'pointer'
                                    }}
                                    type="primary"
                                    onClick={showModal}>
                                    <i className="fa-solid fa-plus text-dark" style={{ fontSize: '50px' }}></i>
                                </Card>
                            </div>
                            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Title level={2} className="text-center my-1" >Add List</Title>
                                <Divider />
                                <Form layout='vertical'>
                                    <Form.Item label='Select your List'>
                                        <Select
                                            defaultValue='personal'
                                            value={selected}
                                            onChange={(value) => { setSelected(value) }}
                                            options={[
                                                {
                                                    value: 'personal',
                                                    label: 'personal',
                                                },
                                                {
                                                    value: 'public',
                                                    label: 'public',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Title here:">
                                        <Input type='text' placeholder='Input your Field' className='text-clr' name='title' onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Select Date:">
                                        <DatePicker name="date" placeholder='select date' className='w-100  text-clr' onChange={handleDate} />
                                    </Form.Item>
                                    <Form.Item label="Select Color:">
                                        <ColorPicker value={color} onChange={(e, color) => { setColor(color) }} className='text-clr' />
                                    </Form.Item>
                                    {/* <Form.Item label="List Description:">
                                        <TextArea rows={5} name='description' onChange={handleChange} />
                                    </Form.Item> */}
                                    <Form.Item label="List Description:">
                                        <ReactQuill theme="snow" value={value} onChange={setValue} className='text-clr' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit} >Add List</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    </div>
                }
            </div>
        </>
    )
}
