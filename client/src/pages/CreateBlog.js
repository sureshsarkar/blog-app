import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateBlog = () => {
    const [inputs, setInputs] = useState({ title: "", description: "", image: "" })
    const navigate = useNavigate();
    // handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: userId
            })
            if (data?.success) {
                alert("Blog Added");
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handelChange 
    const handelChange = (e) => {
        setInputs((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    width={'60%'}
                    border={3}
                    borderRadius={10}
                    padding={2}
                    margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'}
                    display={'flex'}
                    flexDirection={'column'}
                    marginTop={'30px'}>
                    <Typography
                        variant='h2'
                        textAlign={'center'}
                        fontWeight={'bold'}
                        padding={3}
                        color={'gray'}
                    >Create Your Blog</Typography>
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}>Title</InputLabel>
                    <TextField onChange={handelChange} required name="title" value={inputs.title} margin='normal' variant='outlined' width={'300px'} />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}>Descreption</InputLabel>
                    <TextField onChange={handelChange} required name="description" value={inputs.description} margin='normal' variant='outlined' width={'300px'} />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}>Image</InputLabel>
                    <TextField onChange={handelChange} required name="image" value={inputs.image} margin='normal' variant='outlined' width={'300px'} />
                    <Button type="submit" color='primary' variant='container'>Submit</Button>
                </Box>

            </form>
        </>
    )
}

export default CreateBlog
