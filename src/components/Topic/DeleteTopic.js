import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteTopic({ openDeleteTopic, setOpenDeleteTopic, selectedTopic }) {

    const [deleteTopicStatus, setDeleteTopicStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteTopic(false);
        setDeleteTopicStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteTopic', {
            topic_id: selectedTopic?.topic_id,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteTopicStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    return (
        <Dialog open={openDeleteTopic} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบหัวข้อ
                    </Typography>
                    {deleteTopicStatus === true ? <Typography variant="body1" align="center">ลบหัวข้อสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    topic_id : {selectedTopic?.topic_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ลำดับหัวข้อ : {selectedTopic?.topic_no}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ชื่อหัวข้อ : {selectedTopic?.topic_name}
                                </Typography>
                            </Box>
                        </>

                    }
                    {deleteTopicStatus === true ? null
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

export default DeleteTopic