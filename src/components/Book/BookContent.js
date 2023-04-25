import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';

function BookContent() {

    const [allBooks, setAllBooks] = useState();
    const [selectedBook, setSelectedBook] = useState()
    const [openAddBook, setOpenAddBook] = useState(false);
    const [openDeleteBook, setOpenDeleteBook] = useState(false)
    const [openUpdateBook, setOpenUpdateBook] = useState(false)

    console.log(allBooks);

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getBooks").then((res) => {
            setAllBooks(res.data)
        })

    }, [openAddBook, openDeleteBook, openUpdateBook])

    const addBook = () => {
        setOpenAddBook(true)
    }

    const deleteBook = (book) => {
        setSelectedBook(book)
        setOpenDeleteBook(true)
    }

    const updateBook = (book) => {
        setSelectedBook(book)
        setOpenUpdateBook(true)
    }

    return (
        <>
            <Box>
                <Box>
                    <Typography variant='h4' align='center'>หนังสือ</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>หนังสือทั้งหมด {allBooks?.length ? allBooks.length + ' เล่ม' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addBook}
                        >
                            <AddIcon />
                            เพิ่มหนังสือ
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#FFDBA4' }}>
                                        <TableCell>ชื่อหนังสือ</TableCell>
                                        <TableCell align="center" width="100px">ปีที่พิมพ์</TableCell>
                                        <TableCell align="center" width="100px">ครั้งที่พิมพ์</TableCell>
                                        <TableCell align="center" width="150px">ประเภทหนังสือ</TableCell>
                                        <TableCell align='center' width="50px">สี</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allBooks?.map((row, key) => (

                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.book_name}
                                            </TableCell>
                                            <TableCell align="center">{row.year}</TableCell>
                                            <TableCell align="center">{row.edition}</TableCell>
                                            <TableCell align="center">{row.book_type_name}</TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ background: row.book_color_code, width: '40px', height: '40px' }} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateBook(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteBook(row)} />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </Stack>

            </Box >

            <AddBook openAddBook={openAddBook} setOpenAddBook={setOpenAddBook} />
            <DeleteBook openDeleteBook={openDeleteBook} setOpenDeleteBook={setOpenDeleteBook} selectedBook={selectedBook} />
            <UpdateBook openUpdateBook={openUpdateBook} setOpenUpdateBook={setOpenUpdateBook} selectedBook={selectedBook} />

        </>
    )
}

export default BookContent