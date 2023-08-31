import { Button, DatePicker, Divider, Form, Typography, Input, message } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../config/firebase'
import { useAuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
const { Title } = Typography

const initialstate = { email: '', password: '' }
export default function Login() {
  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState(initialstate)
  const [isProcessing, setIsProcessing] = useState(false)
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleRegister = () => {
    let { email, password } = state
    if (!email) { return message.error("Please enter your Email") }
    if (!password) { return message.error("Please enter your Pmail") }


    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
        message.success("Login successfully")
      })
      .catch((error) => {
        message.error("Something went wrong while user sign Up")
        console.error(error)
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }
  return (
    <>
      <main className='d-flex justify-content-center align-items-center auth-page'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-4 offset-lg-4 offset-md-2">
              <div className="card border-0 rounded-3 p-3 p-md-4" style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Title level={1} className='m-0 my-4 text-center'>Login</Title>

                <Divider />

                <Form layout="vertical">
                  <Form.Item label="Email">
                    <Input placeholder='Input your email' name='email' onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                  </Form.Item>
                  <Button type='primary' htmlType='submit' className='w-100 my-4' loading={isProcessing} onClick={handleRegister}>Login</Button>
                </Form>
                <div className='my-3 text-center'>
                  <span >Don't have an account? <Link to='/auth/register' className='text-decoration-none text-dark'><b>Register here</b></Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
