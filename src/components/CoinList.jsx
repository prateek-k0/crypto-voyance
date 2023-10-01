import React from 'react'
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CoinCard from '../utils/common/CoinCard';

const CoinList = ({ coinListData, onCoinCardClick }) => {
  return (
    <Box sx={{ padding: '24px' }}>
      <Grid container spacing={4}>
        {coinListData.map((coin) => (
          <Grid xs={12} sm={6} md={4} lg={3}  key={coin.uuid}>
            <CoinCard coinData={coin} onCardClick={onCoinCardClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CoinList