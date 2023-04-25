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
import AddColor from './AddColor';
import UpdateColor from './UpdateColor';
import DeleteColor from './DeleteColor';

function ColorContent() {

    const [allBookColor, setAllBookColor] = useState();
    const [selectedColor, setSelectedColor] = useState()
    const [openAddColor, setOpenAddColor] = useState(false);
    const [openDeleteColor, setOpenDeleteColor] = useState(false)
    const [openUpdateColor, setOpenUpdateColor] = useState(false)

    console.log(allBookColor);

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getBookColors").then((res) => {
            setAllBookColor(res.data)
        })

    }, [openAddColor, openDeleteColor, openUpdateColor])

    const addBookColor = () => {
        setOpenAddColor(true)
    }

    const deleteBookColor = (bookColor) => {
        setSelectedColor(bookColor)
        setOpenDeleteColor(true)
    }

    const updateBookColor = (bookColor) => {
        setSelectedColor(bookColor)
        setOpenUpdateColor(true)
    }

    return (
        <>
            <AddColor openAddColor={openAddColor} setOpenAddColor={setOpenAddColor} />
            <UpdateColor openUpdateColor={openUpdateColor} setOpenUpdateColor={setOpenUpdateColor} selectedColor={selectedColor} />
            <DeleteColor openDeleteColor={openDeleteColor} setOpenDeleteColor={setOpenDeleteColor} selectedColor={selectedColor} />

            <Box>
                <Box>
                    <Typography variant='h4' align='center'>สี</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>มีสีทั้งหมด {allBookColor?.length ? allBookColor.length + ' สี' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addBookColor}
                        >
                            <AddIcon />
                            เพิ่มสี
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#FFDBA4' }}>
                                        <TableCell align="center">ไอดีสี</TableCell>
                                        <TableCell align="center">ชื่อสี</TableCell>
                                        <TableCell align="center" width='115px'>สี</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allBookColor?.map((row, key) => (

                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.book_color_id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.book_color_name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ background: row.book_color_code, width: '100px', height: '100px' }} />
                                            </TableCell>

                                            <TableCell align="center" >
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateBookColor(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteBookColor(row)} />
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

        </>
    )
}

export default ColorContent