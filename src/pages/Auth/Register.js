import React, { useState } from 'react'
import { Button, DatePicker, Divider, Form, Input, Typography, message } from 'antd'
import { useAuthContext } from '../../contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
const { Title } = Typography

const initialstate = { fullName: '', email: '', password: '', dob: '' }
export default function Register() {
  const { dispatch } = useAuthContext()
  const [state, setState] = useState(initialstate)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleRegister = () => {
    let { fullName, email, password, dob } = state
    if (!fullName || !email || !password || !dob) { return message.error("Please enter all the details") }

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user)
      })
      .catch((error) => {
        message.error("user not created")
        console.error(error)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const createUserProfile = async (user) => {
    let { fullName, dob } = state
    const { email, uid } = user

    const userData = {
      fullName, email, uid, dob,
      dateCreated: serverTimestamp(),
      status: "personal",
    }

    try {
      await setDoc(doc(db, "users", uid), userData);
      message.success("A new user has been created successfully")
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } })
    } catch (err) {
      message.error("Something went wrong while creating user profile")
      console.error("Error adding document: ", err);
    }
  }


  return (
    <main className='d-flex justify-content-center align-items-center auth-page'>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2">
            <div className="card border-0 p-3 p-md-4" style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
              <Title level={2} className='m-0 text-center my-3'>Register</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Full Name">
                  <Input placeholder='Input your full name' name='fullName' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                  <Input placeholder='Input your email' name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Birth Date">
                  <DatePicker className='w-100' name='dob' onChange={(dateObject, dateString) => { setState(s => ({ ...s, dob: dateString })) }} />
                </Form.Item>
                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleRegister}>Register</Button>
              </Form>
              <div className='my-3 text-center'>
                <span >Already have an account? <Link to='/auth/login' className='text-decoration-none text-dark'><b>Login here</b></Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
