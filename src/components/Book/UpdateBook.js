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
    book_id: 0,
    book_name: '',
    year: '',
    edition: '',
    book_type_id: 1,
    book_color_id: ''
};

function UpdateBook({ openUpdateBook, setOpenUpdateBook, selectedBook }) {

    const [allBookTypes, setAllBookTypes] = useState()
    const [allBookColor, setAllBookColor] = useState()

    const [updateBook, setUpdateBook] = useState(initialState);

    const [updateBookStatus, setUpdateBookStatus] = useState(false)

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getBookTypes").then((res) => {
            setAllBookTypes(res.data)
        })

        Axios.get("https://adminapi.jkorpor.com/getBookColors").then((res) => {
            setAllBookColor(res.data)
        })

        if (selectedBook) {
            setUpdateBook({
                book_id: selectedBook.book_id,
                book_name: selectedBook.book_name,
                year: selectedBook.year,
                edition: selectedBook.edition,
                book_type_id: selectedBook.book_type_id,
                book_color_id: selectedBook.book_color_id
            })
        }
    }, [selectedBook])

    const handleClose = () => {
        setUpdateBook(initialState)
        setOpenUpdateBook(false);
        setUpdateBookStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateBook", {
            book_id: updateBook.book_id,
            book_name: updateBook.book_name,
            year: updateBook.year,
            edition: updateBook.edition,
            book_type_id: updateBook.book_type_id,
            book_color_id: updateBook.book_color_id
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateBookStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateBook} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขหนังสือ
                    </Typography>

                    {updateBookStatus === true ? <Typography variant="body1" align="center">แก้ไขหนังสือสำเร็จ</Typography> :
                        <>
                            <TextField
                                size="small"
                                label="ชื่อหนังสือ"
                                variant="outlined"
                                value={updateBook?.book_name}
                                onChange={(e) => setUpdateBook({ ...updateBook, book_name: e.target.value })}
                            />
                            <TextField
                                size="small"
                                label="ปีที่พิมพ์ ex. 2566"
                                variant="outlined"
                                value={updateBook?.year}
                                onChange={(e) => setUpdateBook({ ...updateBook, year: e.target.value })}
                            />
                            <TextField
                                size="small"
                                label="ครั้งพิมพ์ ex. P1, P2"
                                variant="outlined"
                                value={updateBook?.edition}
                                onChange={(e) => setUpdateBook({ ...updateBook, edition: e.target.value })}
                            />
                            <FormControl size="small">
                                <InputLabel>ประเภทหนังสือ</InputLabel>
                                <Select
                                    value={updateBook?.book_type_id}
                                    label="ประเภทหนังสือ"
                                    onChange={(e) => setUpdateBook({ ...updateBook, book_type_id: e.target.value })}
                                >
                                    {allBookTypes?.map((val, key) => {
                                        return <MenuItem key={key} value={val.book_type_id}>{val.book_type_name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl size="small">
                                <InputLabel>สี</InputLabel>
                                <Select
                                    value={updateBook?.book_color_id}
                                    label="สี"
                                    onChange={(e) => setUpdateBook({ ...updateBook, book_color_id: e.target.value })}
                                >
                                    {allBookColor?.map((val, key) => {
                                        return (
                                            <MenuItem key={key} value={val.book_color_id}>
                                                {val.book_color_name} <Box sx={{ background: val.book_color_code, width: '50px', height: '50px' }} />
                                            </MenuItem>
                                        )

                                    })}
                                </Select>
                            </FormControl>
                        </>
                    }


                </Stack>
            </DialogContent>
            {updateBookStatus === true ? null
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

export default UpdateBook