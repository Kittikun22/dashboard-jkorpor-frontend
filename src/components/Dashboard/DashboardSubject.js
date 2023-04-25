import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import Axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    datasets: [
        {
            label: '# of Votes',
            data: [1, 1],
            backgroundColor: [
                '#00425A',
                '#ffba00'
            ],
            borderColor: [
                '#00425A',
                '#ffba00',
            ],
            borderWidth: 1,
        },
    ],
};
function DashboardSubject() {
    const [allSubjects, setAllSubjects] = useState();
    const [lastestSubjects, setLastestSubjects] = useState();

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getSubjects").then((res) => {
            setAllSubjects(res.data)
        })
        Axios.get("https://adminapi.jkorpor.com/getLastestSubjects").then((res) => {
            setLastestSubjects(res.data)
        })
    }, [])

    return (
        <Box sx={{ display: 'flex', }}>

            <Box
                flexGrow={1}
                m={2}
                p={2}
                sx={{
                    borderRadius: 3,
                    background: '#FCC2FC'
                }}>
                <Typography variant='h6'>วิชาทั้งหมด {allSubjects?.length} วิชา</Typography>
                <Divider />

                <ul>
                    {allSubjects?.slice(0, 10).map((val, key) => {
                        return (
                            <li>
                                <Typography>{val.subject_name} </Typography>
                            </li>
                        )
                    })}
                </ul>

            </Box>

            <Box
                flexGrow={1}
                m={2}
                p={2}
                sx={{
                    borderRadius: 3,
                    background: '#B9F3FC'
                }}>
                <Typography variant='h6'>วิชาที่เพิ่มล่าสุด</Typography>
                <Divider />
                <ul>
                    {lastestSubjects?.map((val) => {
                        return (
                            <li>
                                <Typography>{val.subject_name}</Typography>
                            </li>
                        )
                    })}
                </ul>
            </Box>

            <Box
                p={2}
            >
                <Doughnut data={data} />
            </Box>
        </Box>
    )
}

export default DashboardSubject