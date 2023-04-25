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
import AddImage from './AddImage';
import UpdateImage from './UpdateImage';
import DeleteImage from './DeleteImage';

function ImageContent() {

    const [allImages, setAllImages] = useState();
    const [selectedImage, setSelectedImage] = useState()
    const [openAddImage, setOpenAddImage] = useState(false);
    const [openDeleteImage, setOpenDeleteImage] = useState(false)
    const [openUpdateImage, setOpenUpdateImage] = useState(false)

    console.log(allImages);

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getImages").then((res) => {
            setAllImages(res.data)
        })

    }, [openAddImage, openDeleteImage, openUpdateImage])

    const addImage = () => {
        setOpenAddImage(true)
    }

    const deleteImage = (img) => {
        setSelectedImage(img)
        setOpenDeleteImage(true)
    }

    const updateImage = (img) => {
        setSelectedImage(img)
        setOpenUpdateImage(true)
    }

    return (
        <>

            <AddImage openAddImage={openAddImage} setOpenAddImage={setOpenAddImage} />
            <UpdateImage openUpdateImage={openUpdateImage} setOpenUpdateImage={setOpenUpdateImage} selectedImage={selectedImage} />
            <DeleteImage openDeleteImage={openDeleteImage} setOpenDeleteImage={setOpenDeleteImage} selectedImage={selectedImage} />

            <Box>
                <Box>
                    <Typography variant='h4' align='center'>รูป</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>มีรูปทั้งหมด {allImages?.length ? allImages.length + ' รูป' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addImage}
                        >
                            <AddIcon />
                            เพิ่มรูป
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#FFDBA4' }}>
                                        <TableCell align="center">ไอดีรูป</TableCell>
                                        <TableCell align="center">พาร์ทรูป</TableCell>
                                        <TableCell align="center">คำอธิบายรูป</TableCell>
                                        <TableCell align="center" >ประเภท</TableCell>
                                        <TableCell align="center" >รูป</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allImages?.map((row, key) => (

                                        <TableRow
                                            key={key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.image_id}
                                            </TableCell>
                                            <TableCell align="center">
                                                <a href={row.image_src} target="_blank" rel='noreferrer'>
                                                    {row.image_src}
                                                </a>
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.image_alt}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.image_type}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    component="img"
                                                    src={row.image_src}
                                                    width="150px"
                                                    alt={row.image_alt}
                                                />

                                            </TableCell>

                                            <TableCell align="center" >
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateImage(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteImage(row)} />
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

export default ImageContent