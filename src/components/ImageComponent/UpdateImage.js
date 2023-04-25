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
    image_id: '',
    image_src: '',
    image_type: '',
    image_alt: ''
};

function UpdateImage({ openUpdateImage, setOpenUpdateImage, selectedImage }) {

    const [file, setFile] = useState({})
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [updateImage, setUpdateImage] = useState(initialState);

    console.log(updateImage);

    const [updateImageStatus, setUpdateImageStatus] = useState(false)

    useEffect(() => {
        if (selectedImage) {
            setUpdateImage({
                image_id: selectedImage.image_id,
                image_src: selectedImage.image_src,
                image_type: selectedImage.image_type,
                image_alt: selectedImage.image_alt
            })
        }
    }, [selectedImage])

    const handleClose = () => {
        setUpdateImage(initialState)
        setOpenUpdateImage(false);
        setUpdateImageStatus(false);
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
            setUpdateImage({ ...updateImage, image_src: res.data.image_src })
        })
    }

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateImage", {
            image_id: selectedImage.image_id,
            image_src: updateImage.image_src,
            image_type: updateImage.image_type,
            image_alt: updateImage.image_alt
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateImageStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateImage} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขรูป
                    </Typography>

                    {updateImageStatus === true ? <Typography variant="body1" align="center">แก้ไขรูปสำเร็จ</Typography> :
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

                            <TextField size="small" disabled variant="outlined" value={`พาร์ทรูป => ${updateImage?.image_src}`} />

                            <FormControl size="small">
                                <InputLabel>ประเภทรูป</InputLabel>
                                <Select
                                    value={updateImage.image_type}
                                    label="ประเภทรูป"
                                    onChange={(e) => setUpdateImage({ ...updateImage, image_type: e.target.value })}
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

                            <TextField size="small" label="คำอธิบายรูป" variant="outlined" value={updateImage.image_alt} onChange={(e) => setUpdateImage({ ...updateImage, image_alt: e.target.value })} />

                        </>
                    }


                </Stack>
            </DialogContent>
            {updateImageStatus === true ? null
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

export default UpdateImage