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
function DashboardBook() {
    const [allBooks, setAllBooks] = useState();
    const [lastestBooks, setLastestBooks] = useState();

    useEffect(() => {
        Axios.get("https://adminapi.jkorpor.com/getBooks").then((res) => {
            setAllBooks(res.data)
        })
        Axios.get("https://adminapi.jkorpor.com/getLatestBooks").then((res) => {
            setLastestBooks(res.data)
        })
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', }}>

            <Box
                flexGrow={1}
                m={2}
                p={2}
                sx={{

                    borderRadius: 3,
                    background: '#CEEDC7'
                }}>
                <Typography variant='h6'>หนังสือทั้งหมด {allBooks?.length} เล่ม</Typography>
                <Divider />

                <ul>
                    {allBooks?.slice(0, 10).map((val, key) => {
                        return (
                            <li>
                                <Typography>{val.book_name} ({val.year}/{val.edition})</Typography>
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
                    background: '#FCF9BE'
                }}>
                <Typography variant='h6'>หนังสือที่เพิ่มล่าสุด</Typography>
                <Divider />
                <ul>
                    {lastestBooks?.map((val) => {
                        return (
                            <li>
                                <Typography>{val.book_name} ({val.year}/{val.edition})</Typography>
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

export default DashboardBook