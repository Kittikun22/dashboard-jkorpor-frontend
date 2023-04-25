import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteNews({ openDeleteNews, setOpenDeleteNews, selectedNews }) {

    const [deleteNewsStatus, setDeleteNewsStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteNews(false);
        setDeleteNewsStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteNews', {
            news_id: selectedNews.news_id,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteNewsStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', hour12: false, minute: '2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    return (
        <Dialog open={openDeleteNews} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบข่าว
                    </Typography>
                    {deleteNewsStatus === true ? <Typography variant="body1" align="center">ลบข่าวสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    ไอดีรูป: {selectedNews?.news_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    หัวข้อ: {selectedNews?.news_topic}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    รายละเอียด: {selectedNews?.news_des}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    เวลา: {formatDate(selectedNews?.news_timestamp)}
                                </Typography>
                                <Box
                                    component="img"
                                    src={selectedNews?.image_src}
                                    width="300px"
                                    alt={selectedNews?.image_alt}
                                />
                            </Box>

                        </>
                    }
                    {deleteNewsStatus === true ? null
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

export default DeleteNews