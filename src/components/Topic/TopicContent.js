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
import AddTopic from './AddTopic';
import DeleteTopic from './DeleteTopic'
import UpdateTopic from './UpdateTopic';

function TopicContent() {

  const [allTopics, setAllTopics] = useState();
  const [selectedTopic, setSelectTopic] = useState()
  const [openAddTopic, setOpenAddTopic] = useState(false)
  const [openDeleteTopic, setOpenDeleteTopic] = useState()
  const [openUpdateTopic, setOpenUpdateTopic] = useState()

  useEffect(() => {

    Axios.get("https://adminapi.jkorpor.com/getTopics").then((res) => {
      setAllTopics(res.data)
    })

  }, [openAddTopic, openUpdateTopic, openDeleteTopic])

  const addTopic = () => {
    setOpenAddTopic(true)
  }

  const deleteTopic = (topic) => {
    setSelectTopic(topic)
    setOpenDeleteTopic(true)
  }

  const updateTopic = (topic) => {
    setSelectTopic(topic)
    setOpenUpdateTopic(true)
  }

  return (
    <>
      <AddTopic openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic} />
      <UpdateTopic openUpdateTopic={openUpdateTopic} setOpenUpdateTopic={setOpenUpdateTopic} selectedTopic={selectedTopic} />
      <DeleteTopic openDeleteTopic={openDeleteTopic} setOpenDeleteTopic={setOpenDeleteTopic} selectedTopic={selectedTopic} />
      <Box>
        <Box>
          <Typography variant='h4' align='center'>หัวข้อ</Typography>
        </Box>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>หัวข้อทั้งหมด {allTopics?.length ? allTopics.length + ' หัวข้อ' : null}</Typography>
            <Button
              variant='contained'
              color='success'
              sx={{ borderRadius: 3 }}
              onClick={addTopic}>
              <AddIcon />
              เพิ่มหัวข้อ
            </Button>
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 390 }}>
                <TableHead>
                  <TableRow sx={{ background: '#CEEDC7' }}>
                    <TableCell>ไอดีหัวข้อ</TableCell>
                    <TableCell >ลำดับหัวข้อ</TableCell>
                    <TableCell >ชื่อหัวข้อ</TableCell>
                    <TableCell align="right" width="100px"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allTopics?.map((row, key) => (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.topic_id}
                      </TableCell>
                      <TableCell >{row.topic_no}</TableCell>
                      <TableCell >{row.topic_name}</TableCell>
                      <TableCell align="right">
                        <Stack direction='row'>
                          <IconButton>
                            <EditIcon onClick={() => updateTopic(row)} />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon color='error' onClick={() => deleteTopic(row)} />
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

export default TopicContent