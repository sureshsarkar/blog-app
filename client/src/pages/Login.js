import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // state
    const [inputs, setInputs] = useState({ email: "", password: "" });
    // handelChange
    const handelChange = (e) => {
        setInputs((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }));
    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/v1/user/login",
                {
                    email: inputs.email,
                    password: inputs.password
                }
            )

            if (data.success) {
                localStorage.setItem('userId', data?.user._id, 'username')
                localStorage.setItem('username', data?.user.username)
                dispatch(authActions.login());
                navigate('/')
            }
        } catch (error) {
            if (error.response.status === 400) {
                alert("Invalid Crediantions")
            }
        }
    }
    return (
        <>
            <form onSubmit={handelSubmit}>
                <Box maxWidth={450}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    margin={'auto'}
                    marginTop={5}
                    boxShadow={'10px 10px 20px #ccc'}
                    padding={3}
                    borderRadius={5}
                >
                    <Typography
                        variant='h4'
                        sx={{ textTransform: 'uppercase' }}
                        padding={3}
                        textAlign={'center'}
                    >Login</Typography>
                    <TextField onChange={handelChange} placeholder='Email' name="email" margin='normal' type='email' value={inputs.email} required />
                    <TextField onChange={handelChange} placeholder='Password' name="password" margin='normal' type='password' value={inputs.password} required />
                    <Button
                        type='submit'
                        sx={{ borderRadius: 2, marginTop: 3 }}
                        variant='containted'
                        color="primary"
                    >Submit</Button>
                    <Button onClick={() => navigate('/signup')}
                        type='submit'
                        sx={{ borderRadius: 2, marginTop: 3 }}
                        variant='containted'
                        color="primary"
                    >No Account ? Please Signup</Button>
                </Box>
            </form>
        </>
    )
}

export default Login
