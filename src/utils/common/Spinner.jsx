import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const Spinner = ({ text }) => {
  return (
    <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column', position: 'fixed', backgroundColor:'#fff', zIndex: '1', borderRadius: '6px', border: '1px solid #ccc', width: '240px', height: '120px', boxSizing: 'border-box', top: '50px', left: 'calc(50% - 120px)', gap: '8px' }}>
      <CircularProgress disableShrink size={'4em'} sx={{ color: '#5d02ff'}} thickness={8} />
      <Typography>{text || 'Loading'}</Typography>
    </Box>
  )
}

export default Spinner