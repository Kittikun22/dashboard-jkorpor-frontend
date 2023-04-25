import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";

const initialState = {
    book_color_id: '',
    book_color_name: '',
    book_color_code: ''
};

function UpdateColor({ openUpdateColor, setOpenUpdateColor, selectedColor }) {

    const [updateColor, setUpdateColor] = useState(initialState);

    const [updateColorStatus, setUpdateColorStatus] = useState(false)

    useEffect(() => {
        setUpdateColor({
            book_color_id: selectedColor?.book_color_id,
            book_color_name: selectedColor?.book_color_name,
            book_color_code: selectedColor?.book_color_code
        })
    }, [selectedColor])

    const handleClose = () => {
        setUpdateColor(initialState)
        setOpenUpdateColor(false);
        setUpdateColorStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateBookColor", {
            book_color_id: selectedColor?.book_color_id,
            book_color_name: updateColor?.book_color_name,
            book_color_code: updateColor?.book_color_code
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateColorStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateColor} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขสี
                    </Typography>

                    {updateColorStatus === true ? <Typography variant="body1" align="center">แก้ไขสีสำเร็จ</Typography> :
                        <>
                            <TextField
                                size="small"
                                label="ชื่อสี"
                                variant="outlined"
                                value={updateColor?.book_color_name}
                                onChange={(e) => setUpdateColor({ ...updateColor, book_color_name: e.target.value })}>
                            </TextField>

                            <TextField
                                size="small"
                                label="โค้ดสี"
                                variant="outlined"
                                value={updateColor?.book_color_code}
                                onChange={(e) => setUpdateColor({ ...updateColor, book_color_code: e.target.value })}
                            />

                            <Box sx={{
                                alignSelf: 'center',
                                background: updateColor?.book_color_code,
                                width: '150px',
                                height: '150px'
                            }} />

                            <Typography variant="body2" sx={{ color: 'grey' }} >*ทำ Gradient ได้ที่ <a href="https://cssgradient.io/" target='_blank' rel="noreferrer">https://cssgradient.io/</a></Typography>

                        </>
                    }


                </Stack>
            </DialogContent>
            {updateColorStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button variant="contained" color="success" onClick={handleUpdate} >แก้ไข</Button>
                </DialogActions>
            }
        </Dialog>
    )
}

export default UpdateColor