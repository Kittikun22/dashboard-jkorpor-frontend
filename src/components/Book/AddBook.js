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
    book_name: '',
    year: '',
    edition: '',
    book_type_id: 1,
    book_color_id: 1,
};

function AddBook({ openAddBook, setOpenAddBook }) {

    const [allBookTypes, setAllBookTypes] = useState()
    const [allBookColor, setAllBookColor] = useState()

    const [newBook, setNewBook] = useState(initialState);

    const [addBookStatus, setAddbookStatus] = useState(false)

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getBookTypes").then((res) => {
            setAllBookTypes(res.data)
        })

        Axios.get("https://adminapi.jkorpor.com/getBookColors").then((res) => {
            setAllBookColor(res.data)
        })
    }, [])


    const handleClose = () => {
        setOpenAddBook(false);
        setAddbookStatus(false);
    };

    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createBook', {
            book_name: newBook.book_name,
            year: newBook.year,
            edition: newBook.edition,
            book_type_id: newBook.book_type_id,
            book_color_id: newBook.book_color_id
        }).then((res) => {
            setNewBook(initialState)
            if (res.data.message === 'successfully') {
                setAddbookStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }


    return (
        <Dialog open={openAddBook} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มหนังสือ
                    </Typography>

                    {addBookStatus === true ? <Typography variant="body1" align="center">เพิ่มหนังสือสำเร็จ</Typography> :
                        <>
                            <TextField size="small" label="ชื่อหนังสือ" variant="outlined" onChange={(e) => setNewBook({ ...newBook, book_name: e.target.value })} />
                            <TextField size="small" label="ปีที่พิมพ์ ex. 2566" variant="outlined" onChange={(e) => setNewBook({ ...newBook, year: e.target.value })} />
                            <TextField size="small" label="ครั้งพิมพ์ ex. P1, P2" variant="outlined" onChange={(e) => setNewBook({ ...newBook, edition: e.target.value })} />

                            <FormControl size="small">
                                <InputLabel>ประเภทหนังสือ</InputLabel>
                                <Select
                                    value={newBook.book_type_id}
                                    label="ประเภทหนังสือ"
                                    onChange={(e) => setNewBook({ ...newBook, book_type_id: e.target.value })}
                                >
                                    {allBookTypes?.map((val, key) => {
                                        return <MenuItem key={key} value={val.book_type_id}>{val.book_type_name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl size="small">
                                <InputLabel>สี</InputLabel>
                                <Select
                                    value={newBook.book_color_id}
                                    label="สี"
                                    onChange={(e) => setNewBook({ ...newBook, book_color_id: e.target.value })}
                                >
                                    {allBookColor?.map((val, key) => {
                                        return (
                                            <MenuItem key={key} value={val.book_color_id} sx={{ display: 'flex' }} >
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
            {addBookStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>เพิ่ม</Button>
                </DialogActions>
            }
        </Dialog >
    )
}

export default AddBook