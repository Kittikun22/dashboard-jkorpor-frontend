import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Modules } from "../../utils/ReactQuillModule";

const initialState = {
    news_topic: '',
    news_des: '',
    news_content: '',
    image_id: ''
}

function AddNews({ openAddNews, setOpenAddNews }) {

    const [htmlValue, setHtmlValue] = useState("");

    const [newNews, setNewNews] = useState(initialState);
    const [allImages, setAllImages] = useState()
    const [addNewsStatus, setAddNewsStatus] = useState(false)

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getImages").then((res) => {
            setAllImages(res.data)
        })

    }, [])


    const handleClose = () => {
        setOpenAddNews(false);
        setAddNewsStatus(false);
    };


    const handleSubmit = () => {
        Axios.post('https://adminapi.jkorpor.com/createNews', {
            news_topic: newNews.news_topic,
            news_des: newNews.news_des,
            news_content: htmlValue,
            image_id: newNews.image_id
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setAddNewsStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openAddNews} fullWidth="true" maxWidth="lg" minHeight="90%">
            <DialogContent sx={{ minHeight: '500px' }}>
                <Stack spacing={2}>
                    <Typography mb={2} variant="h5" align="center">
                        เพิ่มข่าว
                    </Typography>

                    {addNewsStatus === true ? <Typography variant="body1" align="center">เพิ่มข่าวสารสำเร็จ</Typography> :
                        <>
                            <FormControl size="small">
                                <InputLabel>รูป</InputLabel>
                                <Select
                                    value={newNews?.image_id}
                                    label="รูป"
                                    onChange={(e) => setNewNews({ ...newNews, image_id: e.target.value })}
                                >
                                    {allImages?.map((val, key) => {
                                        return <MenuItem key={key} value={val.image_id}>
                                            {val.image_id}.
                                            <Box
                                                component="img"
                                                src={val.image_src}
                                                width="75px"
                                                alt={val.image_alt}
                                            />
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <TextField
                                size="small"
                                variant="outlined"
                                label="หัวข้อข่าว"
                                onChange={(e) => setNewNews({ ...newNews, news_topic: e.target.value })}
                            />

                            <TextField size="small" label="รายละเอียด" variant="outlined"
                                onChange={(e) => setNewNews({ ...newNews, news_des: e.target.value })}
                            />

                            <ReactQuill
                                theme="snow"
                                value={htmlValue}
                                onChange={setHtmlValue}
                                modules={Modules}
                                placeholder="เนื้อหาของข่าว..."
                            />

                        </>
                    }

                </Stack>
            </DialogContent>
            {addNewsStatus === true ? null
                :
                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
                >
                    <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
                    <Button
                        variant="contained"
                        disabled={newNews.News_alt !== '' && newNews.News_type !== '' && newNews.News_src !== '' ? false : true}
                        color="success"
                        onClick={handleSubmit}>เพิ่ม</Button>
                </DialogActions>
            }
        </Dialog >
    )
}

export default AddNews