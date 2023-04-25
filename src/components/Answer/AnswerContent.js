import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack, Divider } from '@mui/material'
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import AddAnswer from './AddAnswer';
import DeleteAnswer from './DeleteAnswer';
import UpdateAnswer from './UpdateAnswer';

const initialState = {
    book_id: '',
    subject_id: '',
    topic_id: '',
};

function AnswerContent() {

    const [allAnswers, setAllAnswers] = useState();

    const [openAddAnswer, setOpenAddAnswer] = useState(false)
    const [openDeleteAnswer, setOpenDeleteAnswer] = useState(false)
    const [openUpdateAnswer, setOpenUpdateAnswer] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState()

    const [filter, setFilter] = useState(initialState)

    const [bookId, setBookId] = useState(null);
    const [subjectId, setSubjectId] = useState(null);
    const [topicId, setTopicId] = useState(null);

    const clearFilter = () => {
        setFilter(initialState)
        setBookId(null)
        setSubjectId(null)
        setTopicId(null)
    }

    const deleteAnswer = (answer) => {
        setSelectedAnswer(answer)
        setOpenDeleteAnswer(true)
    }

    const updateAnswer = (answer) => {
        setSelectedAnswer(answer)
        setOpenUpdateAnswer(true)
    }


    const bookOptions = [...new Set(allAnswers?.map(item => item.book_id))]
        .map(bookId => {
            const book = allAnswers?.find(item => item.book_id === bookId);
            return {
                book_id: bookId,
                book_name: book.book_name,
                year: book.year,
                edition: book.edition
            };
        });

    const subjectOptions = bookId ? [...new Set(allAnswers?.filter(item => item.book_id === bookId)
        .map(item => item.subject_id))]
        .map(subjectId => {
            const subject = allAnswers?.find(item => item.subject_id === subjectId);
            return {
                subject_id: subjectId,
                subject_name: subject.subject_name
            }
        }) : [];

    const topicOptions = (bookId && subjectId) ? [...new Set(allAnswers?.filter(item => item.book_id === bookId && item.subject_id === subjectId)
        .map(item => item.topic_id))]
        .map(topicId => {
            const topic = allAnswers?.find(item => item.topic_id === topicId);
            return {
                topic_id: topic.topic_id,
                topic_name: topic.topic_name,
                topic_no: topic.topic_no
            };
        }) : [];

    const answerFiltered = (bookId && subjectId && topicId) ? [...new Set(allAnswers?.filter(item => item.book_id === filter.book_id && item.subject_id === filter.subject_id && item.topic_id === filter.topic_id)
        .map(item => { return item }))] : []


    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getAnswers").then((res) => {
            setAllAnswers(res.data)
        })

    }, [openAddAnswer, openDeleteAnswer, openUpdateAnswer])


    return (
        <>
            <AddAnswer openAddAnswer={openAddAnswer} setOpenAddAnswer={setOpenAddAnswer} />
            <DeleteAnswer openDeleteAnswer={openDeleteAnswer} setOpenDeleteAnswer={setOpenDeleteAnswer} selectedAnswer={selectedAnswer} />
            <UpdateAnswer openUpdateAnswer={openUpdateAnswer} setOpenUpdateAnswer={setOpenUpdateAnswer} selectedAnswer={selectedAnswer} />

            <Box>
                <Box>
                    <Typography variant='h4' align='center'>เฉลย</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>เฉลยทั้งหมด {allAnswers?.length ? allAnswers.length + ' ข้อ' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={() => setOpenAddAnswer(true)}>
                            <AddIcon />
                            เพิ่มเฉลย
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>ชื่อหนังสือ</InputLabel>
                            <Select
                                value={bookId}
                                label="ชื่อหนังสือ"
                                onChange={(e) => { setFilter({ ...filter, book_id: e.target.value }); setBookId(e.target.value); setSubjectId(null); setTopicId(null); }}>
                                {bookOptions?.map((option) => (
                                    <MenuItem key={option.book_id} value={option.book_id}>
                                        {option.book_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel>วิชา</InputLabel>
                            <Select
                                value={filter?.subject_id}
                                label="วิชา"
                                onChange={(e) => { setFilter({ ...filter, subject_id: e.target.value }); setSubjectId(e.target.value); setTopicId(null); }}
                            >
                                {subjectOptions?.map((val, key) => {
                                    return <MenuItem key={key} value={val.subject_id}>
                                        {val.subject_id} {val.subject_name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel>หัวข้อ</InputLabel>
                            <Select
                                value={filter?.topic_id}
                                label="หัวข้อ"
                                onChange={(e) => { setFilter({ ...filter, topic_id: e.target.value }); setTopicId(e.target.value) }}
                            >
                                {topicOptions?.map((option) => (
                                    <MenuItem key={option.topic_id} value={option.topic_id}>
                                        {option.topic_no}. {option.topic_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Tooltip title="เคลียร์ตัวกรอง">
                            <IconButton onClick={clearFilter}>
                                <ClearIcon
                                    color={answerFiltered?.length !== 0 ? 'error' : ''}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Divider />

                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#CAF7E3' }}>
                                        <TableCell >ชื่อหนังสือ</TableCell>
                                        <TableCell >ชื่อวิชา</TableCell>
                                        <TableCell >หัวข้อ</TableCell>
                                        <TableCell width="80px">ข้อที่</TableCell>
                                        <TableCell >URL</TableCell>
                                        <TableCell width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {answerFiltered?.length === 0 ?
                                        <>
                                            {allAnswers?.map((row, key) => (
                                                <TableRow
                                                    key={key}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.book_name} ({row.year}/{row.edition})
                                                    </TableCell>
                                                    <TableCell>{row.subject_name}</TableCell>
                                                    <TableCell >{row.topic_name}</TableCell>
                                                    <TableCell align="center">{row.answer_no}</TableCell>
                                                    <TableCell >
                                                        <a href={row.answer_url} target="_blank" rel="noreferrer">
                                                            ไปที่ลิงค์
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction='row'>
                                                            <IconButton>
                                                                <EditIcon onClick={() => updateAnswer(row)} />
                                                            </IconButton>
                                                            <IconButton>
                                                                <DeleteIcon color='error' onClick={() => deleteAnswer(row)} />
                                                            </IconButton>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {answerFiltered?.map((row, key) => (
                                                <TableRow
                                                    key={key}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.book_name} ({row.year}/{row.edition})
                                                    </TableCell>
                                                    <TableCell>{row.subject_name}</TableCell>
                                                    <TableCell >{row.topic_name}</TableCell>
                                                    <TableCell align="center">{row.answer_no}</TableCell>
                                                    <TableCell >
                                                        <a href={row.answer_url} target="_blank" rel="noreferrer">
                                                            ไปที่ลิงค์
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ display: 'flex' }}>
                                                        <IconButton>
                                                            <DeleteIcon color='error' onClick={() => deleteAnswer(row)} />
                                                        </IconButton>
                                                        <IconButton>
                                                            <EditIcon onClick={() => updateAnswer(row)} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    }


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Stack>
            </Box >

        </>
    )
}

export default AnswerContent