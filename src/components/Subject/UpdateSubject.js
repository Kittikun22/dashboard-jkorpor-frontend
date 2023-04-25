import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";

const initialState = {
    subject_id: '',
    subject_name: '',
};

function UpdateSubject({ openUpdateSubject, setOpenUpdateSubject, selectedSubject }) {

    const [updateSubject, setUpdateSubject] = useState(initialState);

    const [updateSubjectStatus, setUpdateSubjectStatus] = useState(false)

    useEffect(() => {
        setUpdateSubject({
            subject_id: selectedSubject?.subject_id,
            subject_name: selectedSubject?.subject_name,
        })
    }, [selectedSubject])

    const handleClose = () => {
        setUpdateSubject(initialState)
        setOpenUpdateSubject(false);
        setUpdateSubjectStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateSubject", {
            subject_id: selectedSubject?.subject_id,
            subject_name: updateSubject?.subject_name,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateSubjectStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateSubject} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขวิชา
                    </Typography>

                    {updateSubjectStatus === true ? <Typography variant="body1" align="center">แก้ไขวิชาสำเร็จ</Typography> :
                        <>
                            <Typography>
                                รหัสวิชา : {selectedSubject?.subject_id}
                            </Typography>

                            <TextField
                                size="small"
                                label="ชื่อวิชา"
                                variant="outlined"
                                value={updateSubject?.subject_name}
                                onChange={(e) => setUpdateSubject({ ...updateSubject, subject_name: e.target.value })}
                            />
                        </>
                    }


                </Stack>
            </DialogContent>
            {updateSubjectStatus === true ? null
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

export default UpdateSubject