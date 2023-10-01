import React from 'react'
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorComponent = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', height: '100vh'}}>
      <ErrorOutlineIcon fontSize='large' sx={{ width: '4em', height: '4em', color: '#ff025f'}} />
      <Typography sx={{ fontSize: '28px', color: '#666' }}>Error while fetching coins, please try again later. </Typography>
    </Box>
  )
}

export default ErrorComponent