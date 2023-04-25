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
  banner_id: '',
  banner_type: '',
  image_id: '',
  image_src: '',
  image_alt: ''
};

function UpdateBanner({ openUpdateBanner, setOpenUpdateBanner, selectedBanner }) {

  const [updateBanner, setUpdateBanner] = useState(initialState);
  const [allImages, setAllImages] = useState()

  const [updateBannerStatus, setUpdateBannerStatus] = useState(false)

  useEffect(() => {
    Axios.get("https://adminapi.jkorpor.com/getImages").then((res) => {
      setAllImages(res.data)
    })

    if (selectedBanner) {
      setUpdateBanner({
        banner_id: selectedBanner.banner_id,
        banner_type: selectedBanner.banner_type,
        image_id: selectedBanner.image_id
      })
    }
  }, [selectedBanner])

  const handleClose = () => {
    setUpdateBanner(initialState)
    setOpenUpdateBanner(false);
    setUpdateBannerStatus(false);
  };

  const handleUpdate = () => {
    Axios.put("https://adminapi.jkorpor.com/updateBanner", {
      banner_id: selectedBanner.banner_id,
      banner_type: updateBanner.banner_type,
      image_id: updateBanner.image_id
    }).then((res) => {
      if (res.data.message === 'successfully') {
        setUpdateBannerStatus(true)
        setTimeout(() => {
          handleClose()
        }, 2000);
      }
    })
  }

  return (
    <Dialog open={openUpdateBanner} fullWidth="true" maxWidth="md">
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            แก้ไขแบนเนอร์
          </Typography>

          {updateBannerStatus === true ? <Typography variant="body1" align="center">แก้ไขแบนเนอร์สำเร็จ</Typography> :
            <>
              <FormControl size="small">
                <InputLabel>ประเภทแบนเนอร์</InputLabel>
                <Select
                  value={updateBanner?.banner_type}
                  label="ประเภทแบนเนอร์"
                  onChange={(e) => setUpdateBanner({ ...updateBanner, banner_type: e.target.value })}
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
                  value={updateBanner?.image_id}
                  label="รูป"
                  onChange={(e) => setUpdateBanner({ ...updateBanner, image_id: e.target.value })}
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
      {updateBannerStatus === true ? null
        :
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between", m: 2 }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="contained" color="success" onClick={handleUpdate} >แก้ไข</Button>
        </DialogActions>
      }

    </Dialog>
  )
}

export default UpdateBanner