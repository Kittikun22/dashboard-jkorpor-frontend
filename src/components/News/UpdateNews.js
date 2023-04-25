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
import { Modules } from "../../utils/ReactQuillModule";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialState = {
    news_id: '',
    news_topic: '',
    news_des: '',
    news_content: '',
    image_id: ''
};

function UpdateNews({ openUpdateNews, setOpenUpdateNews, selectedNews }) {

    const [updateNews, setUpdateNews] = useState(initialState);
    const [allImages, setAllImages] = useState()
    const [updateHtmlValue, setUpdateHtmlValue] = useState()

    console.log(updateHtmlValue);
    console.log(selectedNews);

    const [updateNewsStatus, setUpdateNewsStatus] = useState(false)

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getImages").then((res) => {
            setAllImages(res.data)
        })

        if (selectedNews) {
            setUpdateNews({
                news_id: selectedNews.news_id,
                news_topic: selectedNews.news_topic,
                news_des: selectedNews.news_des,
                news_content: selectedNews.news_content,
                image_id: selectedNews.image_id
            })
            setUpdateHtmlValue(selectedNews.news_content)
        }
    }, [selectedNews])


    const handleClose = () => {
        setUpdateNews(initialState)
        setUpdateHtmlValue("")
        setOpenUpdateNews(false);
        setUpdateNewsStatus(false);
    };

    const handleUpdate = () => {
        Axios.put("https://adminapi.jkorpor.com/updateNews", {
            news_id: selectedNews.news_id,
            news_topic: updateNews.news_topic,
            news_des: updateNews.news_des,
            image_id: updateNews.image_id,
            news_content: updateHtmlValue
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateNewsStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    return (
        <Dialog open={openUpdateNews} fullWidth="true" maxWidth="md">
            <DialogContent>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        แก้ไขข่าวสาร
                    </Typography>

                    {updateNewsStatus === true ? <Typography variant="body1" align="center">แก้ไขข่าวสารสำเร็จ</Typography> :
                        <>
                            <FormControl size="small">
                                <InputLabel>รูป</InputLabel>
                                <Select
                                    value={updateNews?.image_id}
                                    label="รูป"
                                    onChange={(e) => setUpdateNews({ ...updateNews, image_id: e.target.value })}
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
                                value={updateNews?.news_topic}
                                onChange={(e) => setUpdateNews({ ...updateNews, news_topic: e.target.value })}
                            />

                            <TextField size="small" label="รายละเอียด" variant="outlined"
                                value={updateNews?.news_des}
                                onChange={(e) => setUpdateNews({ ...updateNews, news_des: e.target.value })}
                            />

                            <ReactQuill
                                theme="snow"
                                value={updateHtmlValue}
                                onChange={setUpdateHtmlValue}
                                modules={Modules}
                                placeholder="เนื้อหาของข่าว..."
                            />

                        </>
                    }


                </Stack>
            </DialogContent>
            {updateNewsStatus === true ? null
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

export default UpdateNews