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
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/Upload';


const initialState = {
    image_alt: '',
    image_type: '',
    image_src: '',
}

function AddImage({ openAddImage, setOpenAddImage }) {

    const [file, setFile] = useState({})
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [newImage, setNewImage] = useState(initialState);
    const [addImageStatus, setAddImageStatus] = useState(false)

    const handleClose = () => {
        setOpenAddImage(false);
        setImagePreviewUrl(null)
        setFile({})
        setNewImage(initialState)
        setAddImageStatus(false);
    };

    const handleFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file)
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const onClickUpload = async () => {
        const formData = new FormData()
        formData.append('file', file)
        await Axios.post('https://adminapi.jkorpor.com/uploadImage', formData).then((res) => {
            setNewImage({ ...newImage, image_src: res.data.image_src })
        })
    }

    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createImage', {
            image_src: newImage.image_src,
            image_alt: newImage.image_alt,
            image_type: newImage.image_type
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setAddImageStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openAddImage} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มรูป
                    </Typography>

                    {addImageStatus === true ? <Typography variant="body1" align="center">เพิ่มรูปสำเร็จ</Typography> :
                        <>

                            {imagePreviewUrl === null ? null :
                                <Box
                                    component="img"
                                    src={imagePreviewUrl}
                                    width="250px"
                                    sx={{ alignSelf: 'center' }}
                                />
                            }

                            <Button variant="contained" component="label" >
                                <ImageIcon /> เลือกรูปภาพ
                                <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                            </Button>
                            <Button variant="contained" disabled={file?.size ? false : true} component="label" onClick={onClickUpload}>
                                <UploadIcon /> อัพโหลด
                            </Button>

                            <TextField size="small" disabled variant="outlined" value={`พาร์ทรูป => ${newImage?.image_src}`} />

                            <FormControl size="small">
                                <InputLabel>ประเภทรูป</InputLabel>
                                <Select
                                    value={newImage.image_type}
                                    label="ประเภทรูป"
                                    onChange={(e) => setNewImage({ ...newImage, image_type: e.target.value })}
                                >
                                    <MenuItem value="banner">
                                        <Typography>banner</Typography>
                                    </MenuItem>
                                    <MenuItem value="news">
                                        <Typography>news</Typography>
                                    </MenuItem>
                                    <MenuItem value="preparebook">
                                        <Typography>preparebook</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <TextField size="small" label="คำอธิบายรูป" variant="outlined" onChange={(e) => setNewImage({ ...newImage, image_alt: e.target.value })} />



                        </>
                    }

                </Stack>
            </DialogContent>
            {addImageStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button
                        variant="contained"
                        disabled={newImage.image_alt !== '' && newImage.image_type !== '' && newImage.image_src !== '' ? false : true}
                        color="success"
                        onClick={handleSubmit}>เพิ่ม</Button>
                </DialogActions>
            }
        </Dialog >
    )
}

export default AddImage