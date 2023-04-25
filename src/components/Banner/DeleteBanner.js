import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";



function DeleteBanner({ openDeleteBanner, setOpenDeleteBanner, selectedBanner }) {

  const [deleteBannerStatus, setDeleteBannerStatus] = useState(false)

  const handleClose = () => {
    setOpenDeleteBanner(false);
    setDeleteBannerStatus(false)
  };

  const handleDelete = () => {
    Axios.post('https://adminapi.jkorpor.com/deleteBanner', {
      banner_id: selectedBanner.banner_id,
    }).then((res) => {
      if (res.data.message === 'successfully') {
        setDeleteBannerStatus(true)
        setTimeout(() => {
          handleClose()
        }, 1000);
      }
    })
  }

  console.log(selectedBanner);

  return (
    <Dialog open={openDeleteBanner} fullWidth="true" maxWidth="md">
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            ลบแบนเนอร์
          </Typography>
          {deleteBannerStatus === true ? <Typography variant="body1" align="center">ลบแบนเนอร์สำเร็จ</Typography> :
            <>
              <Box align="center">
                <Typography variant="h5" color='error'>
                  แบนเนอร์ไอดี: {selectedBanner?.banner_id}
                </Typography>
                <Typography variant="h5" color='error'>
                  ประเภทแบนเนอร์: {selectedBanner?.banner_type}
                </Typography>
                <Box
                  component="img"
                  src={selectedBanner?.image_src}
                  width="300px"
                  alt={selectedBanner?.image_alt}
                />
              </Box>

            </>
          }
          {deleteBannerStatus === true ? null
            :
            <Stack spacing={2}>
              <Button variant="contained" color="error" onClick={handleDelete}>ยืนยันการลบ</Button>
              <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
            </Stack>
          }

        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBanner