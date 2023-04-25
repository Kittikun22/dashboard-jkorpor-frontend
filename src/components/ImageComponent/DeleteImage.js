import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteImage({ openDeleteImage, setOpenDeleteImage, selectedImage }) {

    const [deleteImageStatus, setDeleteImageStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteImage(false);
        setDeleteImageStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteImage', {
            image_id: selectedImage.image_id,
            image_src: selectedImage.image_src
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteImageStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    console.log(selectedImage);

    return (
        <Dialog open={openDeleteImage} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบแบนเนอร์
                    </Typography>
                    {deleteImageStatus === true ? <Typography variant="body1" align="center">ลบแบนเนอร์สำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    ไอดีรูป: {selectedImage?.image_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    คำอธิบายรูป: {selectedImage?.image_alt}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ประเภทรูป: {selectedImage?.image_type}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    พาร์ทรูป: {selectedImage?.image_src}
                                </Typography>
                                <Box
                                    component="img"
                                    src={selectedImage?.image_src}
                                    width="300px"
                                    alt={selectedImage?.image_alt}
                                />
                            </Box>

                        </>
                    }
                    {deleteImageStatus === true ? null
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

export default DeleteImage