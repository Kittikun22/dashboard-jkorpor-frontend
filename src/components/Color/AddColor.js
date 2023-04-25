import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";

const initialState = {
    book_color_name: '',
    book_color_code: ''
};

function AddColor({ openAddColor, setOpenAddColor }) {

    const [newColor, setNewColor] = useState(initialState);
    const [addColorStatus, setAddColorStatus] = useState(false)


    const handleClose = () => {
        setOpenAddColor(false);
        setAddColorStatus(false);
    };

    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createBookColor', {
            book_color_name: newColor?.book_color_name,
            book_color_code: newColor?.book_color_code
        }).then((res) => {
            setNewColor(initialState)
            if (res.data.message === 'successfully') {
                setAddColorStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }


    return (
        <Dialog open={openAddColor} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มสี
                    </Typography>

                    {addColorStatus === true ? <Typography variant="body1" align="center">เพิ่มสีสำเร็จ</Typography> :
                        <>
                            <TextField size="small" label="ชื่อสี" variant="outlined" onChange={(e) => setNewColor({ ...newColor, book_color_name: e.target.value })} />
                            <TextField size="small" label="โค้ดสี" variant="outlined" onChange={(e) => setNewColor({ ...newColor, book_color_code: e.target.value })} />
                            <Box sx={{
                                alignSelf: 'center',
                                background: newColor?.book_color_code,
                                width: '150px',
                                height: '150px'
                            }} />
                            <Typography variant="body2" sx={{ color: 'grey' }} >*ทำ Gradient ได้ที่ <a href="https://cssgradient.io/" target='_blank' rel="noreferrer">https://cssgradient.io/</a></Typography>


                        </>
                    }

                </Stack>
            </DialogContent>
            {addColorStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>เพิ่ม</Button>
                </DialogActions>
            }
        </Dialog>
    )
}

export default AddColor