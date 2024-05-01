import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios'
const Signup = () => {
    const navigate = useNavigate();
    // state
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
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
            const { data } = await axios.post("/api/v1/user/register",
                {
                    username: inputs.name,
                    email: inputs.email,
                    password: inputs.password
                }
            )
            if (data.success) {
                alert("User registered Successfully");
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <> <form onSubmit={handelSubmit}>

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
                >Signup</Typography>
                <TextField onChange={handelChange} placeholder='Name' name="name" margin='normal' type='text' value={inputs.name} required />
                <TextField onChange={handelChange} placeholder='Email' name="email" margin='normal' type='email' value={inputs.email} required />
                <TextField onChange={handelChange} placeholder='Password' name="password" margin='normal' type='password' value={inputs.password} required />
                <Button
                    type='submit'
                    sx={{ borderRadius: 2, marginTop: 3 }}
                    variant='containted'
                    color="primary"
                >Submit</Button>
                <Button onClick={() => navigate('/login')}
                    type='submit'
                    sx={{ borderRadius: 2, marginTop: 3 }}
                    variant='containted'
                    color="primary"
                >Already Signup ? Please Login</Button>
            </Box>
        </form>
        </>
    )
}

export default Signup
