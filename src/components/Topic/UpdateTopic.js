import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";

const initialState = {
    topic_id: '',
    topic_no: '',
    topic_name: ''
};

function UpdateTopic({ openUpdateTopic, setOpenUpdateTopic, selectedTopic }) {

    const [updateTopic, setUpdateTopic] = useState(initialState);

    const [updateTopicStatus, setUpdateTopicStatus] = useState(false)

    useEffect(() => {
        setUpdateTopic({
            topic_id: selectedTopic?.topic_id,
            topic_no: selectedTopic?.topic_no,
            topic_name: selectedTopic?.topic_name
        })
    }, [selectedTopic])

    const handleClose = () => {
        setUpdateTopic(initialState)
        setOpenUpdateTopic(false);
        setUpdateTopicStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateTopic", {
            topic_id: selectedTopic?.topic_id,
            topic_no: updateTopic?.topic_no,
            topic_name: updateTopic?.topic_name,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateTopicStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateTopic} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขหัวข้อ
                    </Typography>

                    {updateTopicStatus === true ? <Typography variant="body1" align="center">แก้ไขหัวข้อสำเร็จ</Typography> :
                        <>
                            <TextField
                                size="small"
                                label="ลำดับหัวข้อ"
                                variant="outlined"
                                value={updateTopic?.topic_no}
                                onChange={(e) => setUpdateTopic({ ...updateTopic, topic_no: e.target.value })}
                            />

                            <TextField
                                size="small"
                                label="ชื่อหัวข้อ"
                                variant="outlined"
                                value={updateTopic?.topic_name}
                                onChange={(e) => setUpdateTopic({ ...updateTopic, topic_name: e.target.value })}
                            />

                        </>
                    }


                </Stack>
            </DialogContent>
            {updateTopicStatus === true ? null
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

export default UpdateTopic