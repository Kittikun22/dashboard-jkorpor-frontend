import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Zoom from '@mui/material/Zoom'
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAuthState, useAuthDispatch, Login } from "../context/AuthContext";
import Slide from '@mui/material/Slide';

const icon = (
    <Box component="svg" sx={{ display: 'flex', justifyContent: 'center' }}>
        <CheckCircleIcon color="success" />
    </Box>
);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog({ openLogin, setOpenLogin }) {

    const { user: loggedUser, status, error } = useAuthState();
    const dispatch = useAuthDispatch();

    const handleSuccessLogin = () => {
        setLoginStatus(true)
        setTimeout(function () {
            setOpenLogin(false)
            window.location.reload();
        }, 1500)
    };

    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(dispatch, userName, userPwd).then((res) => {
            if (res === 'success') {
                handleSuccessLogin()
            }
        })
    }

    return (
        <>
            <Dialog
                open={openLogin}
                TransitionComponent={Transition}
                keepMounted
                fullWidth='ture'
                maxWidth='sm'
            >

                <DialogContent>
                    <Stack sx={{ m: 2, }}>

                        {loginStatus ? <Box p={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Zoom in={loginStatus}>{icon}</Zoom>
                            <Typography>เข้าสู่ระบบสำเร็จ</Typography>
                        </Box>
                            :
                            <Stack>


                                <Box sx={{ textAlign: 'center' }} component='form'>
                                    <Typography variant='h4'>เข้าสู่ระบบ</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            size='small'
                                            label="Username..."
                                            variant="outlined"
                                            onChange={(e) => { setUserName(e.target.value) }}
                                        />
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            size='small'
                                            label="รหัสผ่าน"
                                            variant="outlined"
                                            onChange={(e) => { setUserPwd(e.target.value) }}
                                        />
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{
                                            fontSize: '.9rem',
                                            color: 'red',
                                        }}>
                                            {error}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2, display: 'flex' }} >
                                        <Button
                                            fullWidth
                                            type='submit'
                                            variant="contained"
                                            color='success'
                                            startIcon={<LoginIcon />}
                                            onClick={handleSubmit}
                                        >
                                            เข้าสู่ระบบ
                                        </Button><br />
                                    </Box>
                                </Box>
                            </Stack>
                        }
                    </Stack>
                </DialogContent>
            </Dialog>


        </>
    );
}