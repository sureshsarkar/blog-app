import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function BlogCard({ title, description, image, username, time, id, isUser }) {
    const navigate = useNavigate();
    const handelClick = () => {
        navigate(`/blog-details/${id}`);
    }
    return (
        <Card sx={{
            width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '10px 10px 20px #ccc', ":hover": {
                boxShadow: '10px 10px 20px #ccc'
            }
        }}>
            {isUser && (
                <Box display={'flex'} >
                    <IconButton onClick={handelClick} sx={{ marginLeft: 'auto' }}>
                        <EditIcon />
                    </IconButton>
                    {/* <IconButton>
                        <DeleteIcon />
                    </IconButton> */}

                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>
                }

                title={title}
                subheader={time}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

        </Card>
    );
}