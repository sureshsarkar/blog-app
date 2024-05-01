import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    // useDispatch
    const dispatch = useDispatch();
    //useNavigate
    const navigate = useNavigate();

    // global state
    let inLogin = useSelector(state => state.inLogin)

    inLogin = inLogin || localStorage.getItem('userId')
    // state
    const [value, setValue] = useState();
    const username = localStorage.getItem('username');
    // handleLogout function 

    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('userId')
        localStorage.removeItem('username')

        navigate('/login')
    }
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>Blog App</Typography>
                    {inLogin && (
                        <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                            </Tabs>
                        </Box>
                    )}

                    <Box display={'flex'} marginLeft={'auto'}>

                        {!inLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/signup">SignUp</Button>
                            </>
                        )}
                        {inLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} onClick={handleLogout}>Logout</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/">{username}</Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default Header
