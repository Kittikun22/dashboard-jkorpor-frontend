import React, { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import DashboardBook from './DashboardBook'
import DashboardSubject from './DashboardSubject'

function DashboardContent() {
    return (
        <>
            <Stack spacing={2}>
                <DashboardBook />
                <DashboardSubject />
            </Stack>

        </>
    )
}

export default DashboardContent