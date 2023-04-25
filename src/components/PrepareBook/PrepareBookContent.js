import React, { useEffect, useState } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdatePrepareBook from './UpdatePrepareBook';

function PrepareBookContent() {

  const [prepareBooks, setPrepareBooks] = useState();
  const [selectedPrepareBook, setSelectedPrepareBook] = useState()
  const [openUpdatePrepareBook, setOpenUpdatePrepareBook] = useState(false)

  console.log(prepareBooks);

  useEffect(() => {

    Axios.get("https://adminapi.jkorpor.com/getPrepareBook").then((res) => {
      setPrepareBooks(res.data)
    })

  }, [openUpdatePrepareBook])

  const updatePrepareBook = (book) => {
    setSelectedPrepareBook(book)
    setOpenUpdatePrepareBook(true)
  }

  return (
    <>

      <UpdatePrepareBook openUpdatePrepareBook={openUpdatePrepareBook} setOpenUpdatePrepareBook={setOpenUpdatePrepareBook} selectedPrepareBook={selectedPrepareBook} />

      <Box mb={4}>
        <Typography variant='h4' align='center'>หนังสือเตรียมสอบ</Typography>
      </Box>
      <Stack spacing={2}>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow sx={{ background: '#FFDBA4' }}>
                  <TableCell >ตำแหน่ง</TableCell>
                  <TableCell >ชื่อหนังสือ</TableCell>
                  <TableCell >รายละเอียด</TableCell>
                  <TableCell >ราคาเต็ม</TableCell>
                  <TableCell >ราคา</TableCell>
                  <TableCell >URL</TableCell>
                  <TableCell align='center'>รูป</TableCell>
                  <TableCell align="right" width="100px"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prepareBooks?.map((row, key) => (

                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.preparebook_id === 1 ? 'ซ้าย' : 'ขวา'}
                    </TableCell>
                    <TableCell>
                      {row.preparebook_name}
                    </TableCell>
                    <TableCell >
                      {row.preparebook_des}
                    </TableCell>
                    <TableCell >
                      {row.preparebook_fullprice}
                    </TableCell>
                    <TableCell >
                      {row.preparebook_amount}
                    </TableCell>
                    <TableCell >
                      {row.preparebook_url}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        component="img"
                        src={row.image_src}
                        width="75px"
                        alt={row.image_alt}
                      />
                    </TableCell>

                    <TableCell align="center" >
                      <Stack direction='row'>
                        <IconButton>
                          <EditIcon onClick={() => updatePrepareBook(row)} />
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

    </>
  )
}

export default PrepareBookContent