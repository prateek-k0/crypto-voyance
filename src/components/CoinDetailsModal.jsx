import { useGetCoinDataQuery } from '../services/coinList';
import { Box, Typography, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import millify from "millify";
import SparklineGraph from '../utils/common/SparklineGraph';

const ScrollableBox = styled(Box)(({ theme }) => ({ 
  boxSizing: 'border-box',
  overflowY: "auto",
  overflowX: 'hidden',
  maxHeight: '100%',
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px'
  },
  '&::-webkit-scrollbar-track': {
      opacity: 0
  },
  '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      borderRadius: '2px'
  },
}));

const ModalWrapper = ({ children, onClose }) => (
  <Box sx={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#66666666', backdropFilter: 'blur(8px)', padding: '80px 0', boxSizing: 'border-box' }}>
    <Box sx={{ backgroundColor: '#fff', width: '90%', height: '-webkit-fill-available', margin: '0 auto', padding: '32px 48px', boxSizing: 'border-box', position: 'relative', borderRadius: '8px' }}>
      <CloseIcon fontSize='large' sx={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', fill: "#999" }} onClick={onClose} />
      <ScrollableBox>
        {children}
      </ScrollableBox>
    </Box>
  </Box>
);

const CoinDetailsModal = ({ selectedCoin, onCloseModal }) => {
  const { data: coinData, isFetching } = useGetCoinDataQuery(selectedCoin, { pollingInterval: 300000 }); // refetch every 300s
  const strokeColor = useMemo(() => (coinData?.change || 0) > 0 ? '#1f9358' : '#e04d5c', [coinData]);
  console.log(coinData);
  if(isFetching) {
    return (
      <ModalWrapper>
        <CircularProgress disableShrink size={'4em'} sx={{ color: '#5d02ff', display: 'block', margin: '0 auto'}} thickness={8} />
      </ModalWrapper>
    )
  }

  return (
    <ModalWrapper onClose={onCloseModal}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', gap: '10px 20px', justifyContent: 'flex-start', alignItems: 'center', height: '80px' }}>
          <img src={coinData.iconUrl} width={80} height={80} alt={coinData.symbol} />
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80px'}} >
            <Typography sx={{ color: coinData.color, fontSize: '28px', lineHeight: '36px'}}>{coinData.symbol}</Typography>
            <Typography sx={{ color: '#999', fontSize: '16px', fontWeight: '700' }}>{coinData.name}</Typography>
          </Box>
        </Box>
        {/* Description */}
        <Typography sx={{ margin: '0', color: '#666', fontSize: '18px', lineHeight: '28px', letterSpacing: '0.8px' }}>
          {coinData.description}
        </Typography>
        <Divider />
        {/* Specs */}
        <Grid container rowSpacing={8}>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                Price
              </Typography>
              <Typography sx={{ color: '#444', fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px' }}>
                ${millify(coinData.price)}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                Change
              </Typography>
              <Typography sx={{ fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px', color: coinData.change > 0 ? '#1f9358' : '#e04d5c' }}>
                {coinData.change}%
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                24H Volume
              </Typography>
              <Typography sx={{ color: '#444', fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px' }}>
                {millify(coinData['24hVolume'])}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                Market Cap
              </Typography>
              <Typography sx={{ color: '#444', fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px' }}>
                ${millify(coinData.marketCap)}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                Number of Exchanges
              </Typography>
              <Typography sx={{ color: '#444', fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px' }}>
                {coinData.numberOfExchanges}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '16px', lineHeight: '18px', letterSpacing: '0.6px' }}>
                Number Of Markets
              </Typography>
              <Typography sx={{ color: '#444', fontWeight: '700', fontSize: '24px', lineHeight: '28px', letterSpacing: '1px' }}>
                {coinData.numberOfMarkets}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        {/* Graph */}
        <Typography sx={{ color: '#666', fontWeight: '400', fontSize: '20px', lineHeight: '22px', letterSpacing: '1px' }}>24H Performance</Typography>
        <Box sx={{ padding: '0', margin: '0' }}>
          <SparklineGraph sparklineData={coinData.sparkline} entityId={coinData.uuid} strokeColor={strokeColor} contHeight={400}/>
        </Box>
      </Box>
    </ModalWrapper>
  )
}

export default CoinDetailsModal