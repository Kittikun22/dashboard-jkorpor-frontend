import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteBook({ openDeleteBook, setOpenDeleteBook, selectedBook }) {

    const [deleteBookStatus, setDeleteBookStatus] = useState(false)

    const handleClose = () => {
        setOpenDeleteBook(false);
        setDeleteBookStatus(false)
    };

    const handleDelete = () => {
        Axios.post('https://adminapi.jkorpor.com/deleteBook', {
            book_id: selectedBook.book_id,
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setDeleteBookStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 1000);
            }
        })
    }

    return (
        <Dialog open={openDeleteBook} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        ลบหนังสือ
                    </Typography>
                    {deleteBookStatus === true ? <Typography variant="body1" align="center">ลบหนังสือสำเร็จ</Typography> :
                        <>
                            <Box align="center">
                                <Typography variant="h5" color='error'>
                                    book_id: {selectedBook?.book_id}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ชื่อหนังสือ: {selectedBook?.book_name}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ปีที่พิมพ์: {selectedBook?.year}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ครั้งที่พิมพ์: {selectedBook?.edition}
                                </Typography>
                                <Typography variant="h5" color='error'>
                                    ประเภทหนังสือ: {selectedBook?.book_type_id}
                                </Typography>
                            </Box>

                        </>
                    }
                    {deleteBookStatus === true ? null
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

export default DeleteBook