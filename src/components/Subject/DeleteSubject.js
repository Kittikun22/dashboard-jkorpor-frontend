import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteSubject({ openDeleteSubject, setOpenDeleteSubject, selectedSubject }) {

    const [deleteSubjectStatus, setDeleteSubjectStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteSubject(false);
        setDeleteSubjectStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteSubject', {
            subject_id: selectedSubject?.subject_id,
            subject_name: selectedSubject?.subject_name
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteSubjectStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    return (
        <Dialog open={openDeleteSubject} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบหนังสือ
                    </Typography>
                    {deleteSubjectStatus === true ? <Typography variant="body1" align="center">ลบหนังสือสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    รหัสวิชา : {selectedSubject?.subject_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ชื่อวิชา : {selectedSubject?.subject_name}
                                </Typography>
                            </Box>
                        </>

                    }
                    {deleteSubjectStatus === true ? null
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

export default DeleteSubject