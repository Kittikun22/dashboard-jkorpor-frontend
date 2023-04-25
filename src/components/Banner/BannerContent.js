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
import AddBanner from './AddBanner';
import DeleteBanner from './DeleteBanner';
import UpdateBanner from './UpdateBanner';

function BannerContent() {

    const [allBanner, setAllBanner] = useState();
    const [selectedBanner, setSelectBanner] = useState()
    const [openAddBanner, setOpenAddBanner] = useState(false)
    const [openDeleteBanner, setOpenDeleteBanner] = useState(false)
    const [openUpdateBanner, setOpenUpdateBanner] = useState(false)

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getBanner").then((res) => {
            setAllBanner(res.data)
        })

    }, [openAddBanner, openDeleteBanner, openUpdateBanner])


    const addBanner = () => {
        setOpenAddBanner(true)
    }

    const deleteBanner = (banner) => {
        setSelectBanner(banner)
        setOpenDeleteBanner(true)
    }

    const updateBanner = (banner) => {
        setSelectBanner(banner)
        setOpenUpdateBanner(true)
    }

    return (
        <>
            <AddBanner openAddBanner={openAddBanner} setOpenAddBanner={setOpenAddBanner} />
            <UpdateBanner openUpdateBanner={openUpdateBanner} setOpenUpdateBanner={setOpenUpdateBanner} selectedBanner={selectedBanner} />
            <DeleteBanner openDeleteBanner={openDeleteBanner} setOpenDeleteBanner={setOpenDeleteBanner} selectedBanner={selectedBanner} />
            <Box>
                <Box>
                    <Typography variant='h4' align='center'>แบนเนอร์</Typography>
                </Box>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>แบนเนอร์ทั้งหมด {allBanner?.length ? allBanner.length + ' รูป' : null}</Typography>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{ borderRadius: 3 }}
                            onClick={addBanner}>
                            <AddIcon />
                            เพิ่มแบนเนอร์
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 390 }}>
                                <TableHead>
                                    <TableRow sx={{ background: '#CEEDC7' }}>
                                        <TableCell>รูป</TableCell>
                                        <TableCell >ประเภทแบนเนอร์</TableCell>
                                        <TableCell >คำอธิบาย</TableCell>
                                        <TableCell align="right" width="100px"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allBanner?.map((row, key) => (
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
                                            <TableCell >{row.banner_type}</TableCell>
                                            <TableCell >{row.image_alt}</TableCell>
                                            <TableCell align="right">
                                                <Stack direction='row'>
                                                    <IconButton>
                                                        <EditIcon onClick={() => updateBanner(row)} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => deleteBanner(row)} />
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

export default BannerContent