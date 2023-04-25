import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteColor({ openDeleteColor, setOpenDeleteColor, selectedColor }) {

    const [deleteColorStatus, setDeleteColorStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteColor(false);
        setDeleteColorStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteBookColor', {
            book_color_id: selectedColor?.book_color_id,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteColorStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    return (
        <Dialog open={openDeleteColor} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบสี
                    </Typography>
                    {deleteColorStatus === true ? <Typography variant="body1" align="center">ลบสีสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    ไอดีสี : {selectedColor?.book_color_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ชื่อสี : {selectedColor?.book_color_name}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    โค้ดสี : {selectedColor?.book_color_code}
                                </Typography>
                                <Box sx={{
                                    alignSelf: 'center',
                                    background: selectedColor?.book_color_code,
                                    width: '150px',
                                    height: '150px'
                                }} />
                            </Box>
                        </>

                    }
                    {deleteColorStatus === true ? null
                        :
                        <Stack spacing={2}>
                            <Button variant="contained" color="error" onClick={handleDelete}>ยืนยันการลบ</Button>
                            <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
                        </Stack>
                    }


                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteColor