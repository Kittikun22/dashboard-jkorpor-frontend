import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import Axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

const initialState = {
    book_id: '',
    subject_id: '',
    topic_id: '',
    answer_no: '',
    answer_url: ''
};

function AddAnswer({ openAddAnswer, setOpenAddAnswer }) {

    const [allBooks, setAllBooks] = useState()
    const [allSubjects, setAllSubjects] = useState()
    const [allTopics, setAllTopics] = useState()


    const [newAnswer, setNewAnswer] = useState(initialState);
    const [inputValue, setInputValue] = useState({
        inputBook: '',
        inputSubject: '',
        inputTopic: ''
    })

    const [addAnswerStatus, setAddAnswerStatus] = useState(false)
    const [statusText, setStatusText] = useState('')

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getBooks")
            .then((res) => {
                setAllBooks(res.data)
            })

        Axios.get('https://adminapi.jkorpor.com/getSubjects')
            .then((res) => {
                setAllSubjects(res.data)
            })

        Axios.get('https://adminapi.jkorpor.com/getTopics')
            .then((res) => {
                setAllTopics(res.data)
            })

    }, [])


    const handleClose = () => {
        setAddAnswerStatus(false);
    };

    const handleSubmit = () => {
        if (newAnswer?.answer_no !== '' & newAnswer !== '') {
            Axios.post('https://adminapi.jkorpor.com/createAnswer', {
                book_id: newAnswer.book_id,
                subject_id: newAnswer.subject_id,
                topic_id: newAnswer.topic_id,
                answer_no: newAnswer.answer_no,
                answer_url: newAnswer.answer_url
            }).then((res) => {
                setNewAnswer({ ...newAnswer, answer_no: '', answer_url: '' })
                if (res.data.message === 'successfully') {
                    setStatusText('เพิ่มเฉลยสำเร็จ')
                    setAddAnswerStatus(true)
                    setTimeout(() => {
                        handleClose()
                    }, 2000);
                }
            })
        } else {
            setStatusText('เพิ่มเฉลยไม่สำเร็จ')
            setAddAnswerStatus(true)
            setTimeout(() => {
                handleClose()
            }, 2000);
        }

    }

    // setOpenAddAnswer(false);

    return (
        <Dialog open={openAddAnswer} fullWidth="true" maxWidth="md">
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <IconButton
                    aria-label="close"
                    onClick={() => { setOpenAddAnswer(false); }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        เพิ่มเฉลย
                    </Typography>

                    {addAnswerStatus === true ?
                        <Typography m={2} variant="body1" align="center" sx={{ color: statusText === 'เพิ่มเฉลยสำเร็จ' ? 'green' : 'red' }}>
                            {statusText}
                        </Typography>
                        : null
                    }
                    <Autocomplete
                        size="small"
                        value={inputValue?.inputBook}
                        onChange={(event, newValue) => {
                            setNewAnswer({ ...newAnswer, book_id: newValue.book_id });
                        }}
                        inputValue={inputValue?.inputBook}
                        onInputChange={(event, newInputValue) => {
                            setInputValue({ ...inputValue, inputBook: newInputValue });
                        }}
                        options={allBooks?.map(val => ({ book_id: val.book_id, label: `${val.book_name} (${val.year}/${val.edition})` }))}
                        renderInput={(params) => <TextField {...params} label="หนังสือ" />}
                    />

                    <Autocomplete
                        size="small"
                        value={inputValue?.inputSubject}
                        onChange={(event, newValue) => {
                            setNewAnswer({ ...newAnswer, subject_id: newValue.subject_id });
                        }}
                        inputValue={inputValue?.inputSubject}
                        onInputChange={(event, newInputValue) => {
                            setInputValue({ ...inputValue, inputSubject: newInputValue });
                        }}
                        options={allSubjects?.map(val => ({ subject_id: val.subject_id, label: `${val.subject_id} ${val.subject_name}` }))}
                        renderInput={(params) => <TextField {...params} label="วิชา" />}
                    />

                    <Autocomplete
                        size="small"
                        value={inputValue?.inputTopic}
                        onChange={(event, newValue) => {
                            setNewAnswer({ ...newAnswer, topic_id: newValue.topic_id });
                        }}
                        inputValue={inputValue?.inputTopic}
                        onInputChange={(event, newInputValue) => {
                            setInputValue({ ...inputValue, inputTopic: newInputValue });
                        }}
                        options={allTopics?.map(val => ({ topic_id: val.topic_id, label: `${val.topic_no}. ${val.topic_name}` }))}
                        renderInput={(params) => <TextField {...params} label="หัวข้อ" />}
                    />

                    <TextField
                        size="small"
                        label="ข้อที่"
                        variant="outlined"
                        value={newAnswer?.answer_no}
                        onChange={(e) => setNewAnswer({ ...newAnswer, answer_no: e.target.value })}
                    />
                    <TextField
                        size="small"
                        label="ลิงค์เฉลย"
                        variant="outlined"
                        value={newAnswer?.answer_url}
                        onChange={(e) => setNewAnswer({ ...newAnswer, answer_url: e.target.value })}
                    />

                </Stack>
            </DialogContent>
            {addAnswerStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={() => { setOpenAddAnswer(false) }}>ยกเลิก</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>เพิ่ม</Button>
                </DialogActions>
            }

        </Dialog>
    )
}

export default AddAnswer