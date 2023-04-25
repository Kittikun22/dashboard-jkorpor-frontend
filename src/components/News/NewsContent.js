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
import AddNews from './AddNews';
import UpdateNews from './UpdateNews';
import DeleteNews from './DeleteNews';

function NewsContent() {

    const [allNews, setAllNews] = useState();
    const [selectedNews, setSelectNews] = useState()
    const [openAddNews, setOpenAddNews] = useState(false)
    const [openDeleteNews, setOpenDeleteNews] = useState(false)
    const [openUpdateNews, setOpenUpdateNews] = useState(false)

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getNews").then((res) => {
            setAllNews(res.data)
        })

    }, [openAddNews, openDeleteNews, openUpdateNews])


    const addNews = () => {
        setOpenAddNews(true)
    }

    const deleteNews = (News) => {
        setSelectNews(News)
        setOpenDeleteNews(true)
    }

    const updateNews = (News) => {
        setSelectNews(News)
        setOpenUpdateNews(true)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', hour12: false, minute: '2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <>

            <AddNews openAddNews={openAddNews} setOpenAddNews={setOpenAddNews} />
            <UpdateNews openUpdateNews={openUpdateNews} setOpenUpdateNews={setOpenUpdateNews} selectedNews={selectedNews} />
            <DeleteNews openDeleteNews={openDeleteNews} setOpenDeleteNews={setOpenDeleteNews} selectedNews={selectedNews} />

            <Box>
                <Box>
                    <Typography variant='h4' align='center'>ข่าวสาร</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>ข่าวสารทั้งหมด {allNews?.length ? allNews.length + ' ข่าว' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addNews}>
                            <AddIcon />
                            เพิ่มข่าวสาร
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#CEEDC7' }}>
                                        <TableCell>รูป</TableCell>
                                        <TableCell>ไอดีข่าว</TableCell>
                                        <TableCell >หัวข้อ</TableCell>
                                        <TableCell >รายละเอียด</TableCell>
                                        <TableCell >เนื้อหา</TableCell>
                                        <TableCell >เวลา</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allNews?.map((row, key) => (

                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    src={row.image_src}
                                                    width="125px"
                                                    alt={row.image_alt}
                                                />
                                            </TableCell>
                                            <TableCell >{row.news_id}</TableCell>
                                            <TableCell >{row.news_topic}</TableCell>
                                            <TableCell >{row.news_des}</TableCell>
                                            <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                {row.news_content}
                                            </TableCell>
                                            <TableCell >{formatDate(row.news_timestamp)}</TableCell>
                                            <TableCell align="right">
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateNews(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteNews(row)} />
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

export default NewsContent