import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteAnswer({ openDeleteAnswer, setOpenDeleteAnswer, selectedAnswer }) {

    const [deleteAnswerStatus, setDeleteAnswerStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteAnswer(false);
        setDeleteAnswerStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteAnswer', {
            answer_id: selectedAnswer?.answer_id,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteAnswerStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    return (
        <Dialog open={openDeleteAnswer} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบเฉลย
                    </Typography>
                    {deleteAnswerStatus === true ? <Typography variant="body1" align="center" sx={{ color: 'green' }}>ลบเฉลยสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    answer_id: {selectedAnswer?.answer_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    หนังสือ: {selectedAnswer?.book_name} ({selectedAnswer?.year}/{selectedAnswer?.edition})
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    วิชา: {selectedAnswer?.subject_id} {selectedAnswer?.subject_name}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    หัวข้อ: {selectedAnswer?.topic_id} {selectedAnswer?.topic_name}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ข้อ: {selectedAnswer?.answer_no}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    URL: {selectedAnswer?.answer_url}
                                </Typography>
                            </Box>

                            <Stack spacing={2}>
                                <Button variant="contained" color="error" onClick={handleDelete}>ยืนยันการลบ</Button>
                                <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
                            </Stack>
                        </>

                    }

                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAnswer