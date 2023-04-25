import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";

const initialState = {
    subject_id: '',
    subject_name: ''
};

function AddSubject({ openAddSubject, setOpenAddSubject }) {

    const [newSubject, setNewSubject] = useState(initialState);
    const [addSubjectStatus, setAddSubjectStatus] = useState(false)


    const handleClose = () => {
        setOpenAddSubject(false);
        setAddSubjectStatus(false);
    };

    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createSubject', {
            subject_id: newSubject.subject_id,
            subject_name: newSubject.subject_name
        }).then((res) => {
            setNewSubject(initialState)
            if (res.data.message === 'successfully') {
                setAddSubjectStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }


    return (
        <Dialog open={openAddSubject} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มวิชา
                    </Typography>

                    {addSubjectStatus === true ? <Typography variant="body1" align="center">เพิ่มวิชาสำเร็จ</Typography> :
                        <>
                            <TextField size="small" label="รหัสวิชา ex. 01_MATH" variant="outlined" onChange={(e) => setNewSubject({ ...newSubject, subject_id: e.target.value })} />
                            <TextField size="small" label="ชื่อวิชา" variant="outlined" onChange={(e) => setNewSubject({ ...newSubject, subject_name: e.target.value })} />
                        </>
                    }


                </Stack>
            </DialogContent>
            {addSubjectStatus === true ? null
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

export default AddSubject