import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WelcomeModal({getEasyQuestion}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  function closeAndGetQuestion () {
    handleClose()
    getEasyQuestion()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Ready to play?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Solve as many Leetcode questions as you can within 25 minutes.
            </Typography>
            <center>
              <Button onClick={closeAndGetQuestion}>Start</Button>
            </center>
        </Box>
      </Modal>
    </div>
  );
}