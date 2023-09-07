import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Context from "../context/Context";


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


export default function CompletedModal() {
  const { currentScore, completedModal, setCompletedModal } = useContext(Context);
  const handleClose = () => setCompletedModal(false);
  return (
    <div>
      <Modal
        open={completedModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Times Up!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Your Score is: {currentScore?.current}
            </Typography>
        </Box>
      </Modal>
    </div>
  );
}