import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";

const initialState = {
    topic_no: '',
    topic_name: ''
};

function AddTopic({ openAddTopic, setOpenAddTopic }) {

    const [newTopic, setNewTopic] = useState(initialState);
    const [addTopicStatus, setAddTopicStatus] = useState(false)


    const handleClose = () => {
        setOpenAddTopic(false);
        setAddTopicStatus(false);
    };

    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createTopic', {
            topic_no: newTopic?.topic_no,
            topic_name: newTopic?.topic_name
        }).then((res) => {
            setNewTopic(initialState)
            if (res.data.message === 'successfully') {
                setAddTopicStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }


    return (
        <Dialog open={openAddTopic} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มหัวข้อ
                    </Typography>

                    {addTopicStatus === true ? <Typography variant="body1" align="center">เพิ่มหัวข้อสำเร็จ</Typography> :
                        <>
                            <TextField size="small" label="ลำดับหัวข้อ" variant="outlined" onChange={(e) => setNewTopic({ ...newTopic, topic_no: e.target.value })} />
                            <TextField size="small" label="ชื่อหัวข้อ" variant="outlined" onChange={(e) => setNewTopic({ ...newTopic, topic_name: e.target.value })} />
                        </>
                    }
                    
                </Stack>
            </DialogContent>
            {addTopicStatus === true ? null
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

export default AddTopic