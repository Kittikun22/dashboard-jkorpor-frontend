import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const initialState = {
    preparebook_id: '',
    preparebook_name: '',
    preparebook_des: '',
    image_id: '',
    preparebook_fullprice: '',
    preparebook_amount: '',
    preparebook_url: ''
};

function UpdatePrepareBook({ openUpdatePrepareBook, setOpenUpdatePrepareBook, selectedPrepareBook }) {

    const [updatePrepareBook, setUpdatePrepareBook] = useState(initialState);
    const [allImages, setAllImages] = useState()
    const [updatePrepareBookStatus, setUpdatePrepareBookStatus] = useState(false)

    useEffect(() => {
        if (!allImages) {
            Axios.get('https://adminapi.jkorpor.com/getImages').then((res) => {
                setAllImages(res.data)
            })
        }

        if (selectedPrepareBook) {
            setUpdatePrepareBook({
                preparebook_id: selectedPrepareBook.preparebook_id,
                preparebook_name: selectedPrepareBook.preparebook_name,
                preparebook_des: selectedPrepareBook.preparebook_des,
                image_id: selectedPrepareBook.image_id,
                preparebook_fullprice: selectedPrepareBook.preparebook_fullprice,
                preparebook_amount: selectedPrepareBook.preparebook_amount,
                preparebook_url: selectedPrepareBook.preparebook_url
            })
        }
    }, [selectedPrepareBook])

    const handleClose = () => {
        setUpdatePrepareBook(initialState)
        setOpenUpdatePrepareBook(false);
        setUpdatePrepareBookStatus(false);
    };



    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updatePreparebook", {
            preparebook_id: updatePrepareBook.preparebook_id,
            preparebook_name: updatePrepareBook.preparebook_name,
            preparebook_des: updatePrepareBook.preparebook_des,
            image_id: updatePrepareBook.image_id,
            preparebook_fullprice: updatePrepareBook.preparebook_fullprice,
            preparebook_amount: updatePrepareBook.preparebook_amount,
            preparebook_url: updatePrepareBook.preparebook_url
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdatePrepareBookStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdatePrepareBook} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขหนังสือเตรียมสอบ
                    </Typography>

                    {updatePrepareBookStatus === true ? <Typography variant="body1" align="center">แก้ไขหนังสือเตรียมสอบสำเร็จ</Typography> :
                        <>
                            <TextField
                                size="small"
                                label="ชื่อหนังสือ"
                                variant="outlined"
                                value={updatePrepareBook?.preparebook_name}
                                onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, preparebook_name: e.target.value })}
                            />
                            <TextField
                                size="small"
                                label="รายละเอียด"
                                variant="outlined"
                                value={updatePrepareBook?.preparebook_des}
                                onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, preparebook_des: e.target.value })}
                            />
                            <TextField
                                size="small"
                                label="ราคาเต็ม"
                                variant="outlined"
                                value={updatePrepareBook?.preparebook_fullprice}
                                onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, preparebook_fullprice: e.target.value })}
                            />

                            <TextField
                                size="small"
                                label="ราคา"
                                variant="outlined"
                                value={updatePrepareBook?.preparebook_amount}
                                onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, preparebook_amount: e.target.value })}
                            />

                            <TextField
                                size="small"
                                label="URL"
                                variant="outlined"
                                value={updatePrepareBook?.preparebook_url}
                                onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, preparebook_url: e.target.value })}
                            />

                            <FormControl size="small">
                                <InputLabel>รูป</InputLabel>
                                <Select
                                    value={updatePrepareBook?.image_id}
                                    label="รูป"
                                    onChange={(e) => setUpdatePrepareBook({ ...updatePrepareBook, image_id: e.target.value })}
                                >
                                    {allImages?.map((val, key) => {
                                        return <MenuItem key={key} value={val.image_id}>
                                            {val.image_id}. 
                                            <Box
                                                component="img"
                                                src={val.image_src}
                                                width="75px"
                                                alt={val.image_alt}
                                            />
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </>
                    }


                </Stack>
            </DialogContent>
            {updatePrepareBookStatus === true ? null
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

export default UpdatePrepareBook