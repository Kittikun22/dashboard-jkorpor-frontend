import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Box } from "@mui/material";
import Axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const initialState = {
  banner_type: '',
  image_id: ''
};

function AddBanner({ openAddBanner, setOpenAddBanner }) {

  const [allImages, setAllImages] = useState()

  const [newBanner, setNewBanner] = useState(initialState);

  const [addBannerStatus, setAddBannerStatus] = useState(false)

  useEffect(() => {
    Axios.get("https://adminapi.jkorpor.com/getImages").then((res) => {
      setAllImages(res.data)
    })
  }, [])


  const handleClose = () => {
    setOpenAddBanner(false);
    setAddBannerStatus(false);
  };

  const handleSubmit = () => {
    Axios.post('https://adminapi.jkorpor.com/createBanner', {
      banner_type: newBanner?.banner_type,
      image_id: newBanner?.image_id
    }).then((res) => {
      setNewBanner(initialState)
      if (res.data.message === 'successfully') {
        setAddBannerStatus(true)
        setTimeout(() => {
          handleClose()
        }, 2000);
      }
    })
  }


  return (
    <Dialog open={openAddBanner} fullWidth="true" maxWidth="md">
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            เพิ่มแบนเนอร์
          </Typography>

          {addBannerStatus === true ? <Typography variant="body1" align="center">เพิ่มแบนเนอร์สำเร็จ</Typography> :
            <>
              <FormControl size="small">
                <InputLabel>ประเภทแบนเนอร์</InputLabel>
                <Select
                  value={newBanner?.banner_type}
                  label="ประเภทแบนเนอร์"
                  onChange={(e) => setNewBanner({ ...newBanner, banner_type: e.target.value })}
                >
                  <MenuItem value="xs">
                    <Typography>xs (0 - 900 px)</Typography>
                  </MenuItem>
                  <MenuItem value="md">
                    <Typography>md (900+ px)</Typography>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small">
                <InputLabel>รูป</InputLabel>
                <Select
                  value={newBanner?.image_id}
                  label="รูป"
                  onChange={(e) => setNewBanner({ ...newBanner, image_id: e.target.value })}
                >
                  {allImages?.map((val, key) => {
                    return <MenuItem key={key} value={val.image_id}>
                      {val.image_id}.
                      <Box
                        component="img"
                        src={val.image_src}
                        width="75px"
                        alt={val.image_alt}
                      />
                    </MenuItem>
                  })}
                </Select>
              </FormControl>
            </>
          }

        </Stack>
      </DialogContent>
      {addBannerStatus === true ? null
        :
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>เพิ่ม</Button>
        </DialogActions>
      }
    </Dialog >
  )
}

export default AddBanner