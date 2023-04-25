import React, { useEffect, useState } from 'react'
import { Box, Typography, Stack, Divider, TextField, Button } from '@mui/material'
import Axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const initialState = {
    timer_date: '',
    timer_label: '',
    timer_label_end: '',
    timer_display: 'block',
};

function TimerContent() {

    const [timer, setTimer] = useState();
    const [newTimer, setNewTimer] = useState(initialState);
    const [updateTimerStatus, setUpdateTimerStatus] = useState(false)

    useEffect(() => {

        Axios.get("https://adminapi.jkorpor.com/getTimer").then((res) => {
            setTimer(res.data[0])
        })

    }, [updateTimerStatus])

    const handleClose = () => {
        setNewTimer(initialState)
        setUpdateTimerStatus(false);
    };

    const handleUpdateTimer = () => {
        Axios.put("https://adminapi.jkorpor.com/updateTimer", {
            timer_date: newTimer?.timer_date,
            timer_label: newTimer?.timer_label,
            timer_label_end: newTimer?.timer_label_end,
            timer_display:newTimer?.timer_display
        }).then((res) => {
            if (res.data.message === 'successfully') {
                setUpdateTimerStatus(true)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            }
        })
    }

    console.log(newTimer);

    return (
        <>
            <Box>
                <Box>
                    <Typography mb={4} variant='h4' align='center'>เวลานับถอยหลัง</Typography>
                </Box>
                <Box>
                    <Stack spacing={1} my={2}>
                        <Typography fontSize='1.3rem' align='center'>เวลาที่ตั้งปัจจุบัน : {timer?.timer_date}</Typography>
                        <Typography fontSize='1.3rem' align='center'>ข้อความ : {timer?.timer_label}</Typography>
                        <Typography fontSize='1.3rem' align='center'>ข้อความหลังหมดเวลา : {timer?.timer_label_end}</Typography>
                    </Stack>

                    <Divider />


                    {updateTimerStatus === true ?
                        <Typography my={4} fontSize='1.3rem' align='center'>ตั้งเวลาใหม่สำเร็จ</Typography>
                        :
                        <Stack spacing={2} my={4}>
                            <Typography fontSize='1.3rem' align='center'>ตั้งเวลาใหม่</Typography>
                            <TextField size="small" label="เวลา ex. 22 sep 2023 23:59:59" variant="outlined" onChange={(e) => setNewTimer({ ...newTimer, timer_date: e.target.value })} />
                            <TextField size="small" label="ข้อความ" variant="outlined" onChange={(e) => setNewTimer({ ...newTimer, timer_label: e.target.value })} />
                            <TextField size="small" label="ข้อความหลังหมดเวลา" variant="outlined" onChange={(e) => setNewTimer({ ...newTimer, timer_label_end: e.target.value })} />

                            <FormControl size="small">
                                <InputLabel>แสดง</InputLabel>
                                <Select
                                    value={newTimer?.timer_display}
                                    label="แสดง"
                                    onChange={(e) => setNewTimer({ ...newTimer, timer_display: e.target.value })}
                                >
                                    <MenuItem value="block">
                                        <Typography>แสดง</Typography>
                                    </MenuItem>
                                    <MenuItem value="none">
                                        <Typography>ไม่แสดง</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant='contained' onClick={handleUpdateTimer}>ตั้งเวลา</Button>
                        </Stack>
                    }
                    <Box>
                        <Typography>*เดือน</Typography>
                        <Typography>มกราคม : jan</Typography>
                        <Typography>กุมภาพันธ์ : feb</Typography>
                        <Typography>มีนาคม : mar</Typography>
                        <Typography>เมษายน : apr</Typography>
                        <Typography>พฤษภาคม : may</Typography>
                        <Typography>มิถุนายน : jun</Typography>
                        <Typography>กรกฎาคม : jul</Typography>
                        <Typography>สิงหาคม : aug</Typography>
                        <Typography>กันยายน : sep</Typography>
                        <Typography>ตุลาคม : oct</Typography>
                        <Typography>พฤศจิกายน : nov</Typography>
                        <Typography>ธันวาคม : dec</Typography>
                    </Box>
                </Box>

            </Box>

        </>
    )
}

export default TimerContent