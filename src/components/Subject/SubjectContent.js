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
import AddSubject from './AddSubject';
import DeleteSubject from './DeleteSubject';
import UpdateSubject from './UpdateSubject';

function SubjectContent() {

    const [allSubjects, setAllSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState()
    const [openAddSubject, setOpenAddSubject] = useState(false)
    const [openDeleteSubject, setOpenDeleteSubject] = useState(false)
    const [openUpdateSubject, setOpenUpdateSubject] = useState(false)

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getSubjects").then((res) => {
            setAllSubjects(res.data)
        })
    }, [openAddSubject, openDeleteSubject, openUpdateSubject])


    const addSubject = () => {
        setOpenAddSubject(true)
    }

    const deleteSubject = (subject) => {
        setSelectedSubject(subject)
        setOpenDeleteSubject(true)
    }

    const updateSubject = (subject) => {
        setSelectedSubject(subject)
        setOpenUpdateSubject(true)
    }

    return (
        <>
            <AddSubject openAddSubject={openAddSubject} setOpenAddSubject={setOpenAddSubject} />
            <DeleteSubject openDeleteSubject={openDeleteSubject} setOpenDeleteSubject={setOpenDeleteSubject} selectedSubject={selectedSubject} />
            <UpdateSubject openUpdateSubject={openUpdateSubject} setOpenUpdateSubject={setOpenUpdateSubject} selectedSubject={selectedSubject} />

            <Box>
                <Box>
                    <Typography variant='h4' align='center'>วิชา</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>วิชาทั้งหมด {allSubjects?.length ? allSubjects.length + ' วิชา' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addSubject}
                        >
                            <AddIcon />
                            เพิ่มวิชา
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#FFAACF' }}>
                                        <TableCell>รหัสวิชา</TableCell>
                                        <TableCell >ชื่อวิชา</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allSubjects?.map((row, key) => (
                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.subject_id}
                                            </TableCell>
                                            <TableCell >{row.subject_name}</TableCell>
                                            <TableCell align="right">
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateSubject(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteSubject(row)} />
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
            </Box>

        </>
    )
}

export default SubjectContent