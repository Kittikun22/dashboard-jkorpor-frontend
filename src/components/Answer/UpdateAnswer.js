import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";


const initialState = {
    answer_no: '',
    answer_url: ''
};

function UpdateAnswer({ openUpdateAnswer, setOpenUpdateAnswer, selectedAnswer }) {

    const [updateAnswer, setUpdateAnswer] = useState(initialState);

    const [updateAnswerStatus, setUpdateAnswerStatus] = useState(false)

    useEffect(() => {
        setUpdateAnswer({
            answer_no: selectedAnswer?.answer_no,
            answer_url: selectedAnswer?.answer_url
        })
    }, [selectedAnswer])

    const handleClose = () => {
        setUpdateAnswer(initialState)
        setOpenUpdateAnswer(false);
        setUpdateAnswerStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateAnswer", {
            answer_id: selectedAnswer?.answer_id,
            answer_no: updateAnswer?.answer_no,
            answer_url: updateAnswer?.answer_url
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateAnswerStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateAnswer} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขเฉลย
                    </Typography>

                    {updateAnswerStatus === true ? <Typography variant="body1" align="center" sx={{ color: 'green' }}>แก้ไขเฉลยสำเร็จ</Typography> :
                        <>
                            <Typography>
                                หนังสือ : {selectedAnswer?.book_name} ({selectedAnswer?.year}/{selectedAnswer?.edition})
                            </Typography>
                            <Typography>
                                วิชา : {selectedAnswer?.subject_id} {selectedAnswer?.subject_name}
                            </Typography>
                            <Typography>
                                หัวข้อ : {selectedAnswer?.topic_name}
                            </Typography>

                            <TextField
                                size="small"
                                label="ข้อที่"
                                variant="outlined"
                                value={updateAnswer?.answer_no}
                                onChange={(e) => setUpdateAnswer({ ...updateAnswer, answer_no: e.target.value })}
                            />

                            <TextField
                                size="small"
                                label="URL"
                                variant="outlined"
                                value={updateAnswer?.answer_url}
                                onChange={(e) => setUpdateAnswer({ ...updateAnswer, answer_url: e.target.value })}
                            />
                        </>
                    }


                </Stack>
            </DialogContent>
            {updateAnswerStatus === true ? null
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

export default UpdateAnswer