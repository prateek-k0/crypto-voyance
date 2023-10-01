import React, { useMemo } from "react";
import { Box, Card, CardHeader, CardActionArea } from "@mui/material";
import millify from "millify";
import styled from "@emotion/styled";
import SparklineGraph from "./SparklineGraph";
import { useSpring, animated } from "@react-spring/web";

const CoinCardHeader = styled(CardHeader)(({ theme }) => ({
  '& .MuiCardHeader-content': {
    overflow: 'hidden',
  },
  '& .MuiCardHeader-subheader': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '12px'
  },
  '& .MuiCardHeader-title': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '16px'
  }
}));

const AnimatedCard = animated(Card);

const CoinCard = ({ coinData, onCardClick }) => {
  const strokeColor = useMemo(() => coinData.change > 0 ? '#1f9358' : '#e04d5c', [coinData]);
  const [fade, api] = useSpring(() => ({
    scale: [1, 1],
    config: {
      mass: 1.8,
      damping: 1,
      tension: 300,
      friction: 25,
    }
  }));

  const handleHoverOn = () => {
    api.start({
      from: {
        scale: [1, 1],
      },
      to: {
        scale: [1.1, 1.1],
      },
    })
  }

  const handleHoverOff = () => {
    api.start({
      from: {
        scale: [1.1, 1.1],
      },
      to: {
        scale: [1, 1],
      },
    })
  }


  return (
      <AnimatedCard style={{ borderRadius: '0', ...fade }} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        <CardActionArea onClick={() => onCardClick(coinData.uuid)}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CoinCardHeader
              sx={{ color: `${coinData.color}`, maxWidth: '60%'}}
              avatar={
                <Box sx={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={coinData.iconUrl} width={40} height={40} alt={coinData.symbol} />
                </Box>
              }
              title={coinData.symbol}
              subheader={coinData.name}
            />
            <Box sx={{ fontSize: '18px', lineHeight: '20px', color: '#675858', fontWeight: '600', padding: '0 16px 0 0' }}>
              ${millify(coinData.price)}
              <Box sx={{ fontSize: '14px', color: strokeColor, fontWeight: '400', marginTop: '2px' }}>{`${coinData.change > 0 ? '+' : ''}${coinData.change}%`}</Box>
            </Box>
          </Box>
          <Box sx={{ padding: '0', margin: '0' }}>
            <SparklineGraph sparklineData={coinData.sparkline} entityId={coinData.uuid} strokeColor={strokeColor} />
          </Box>
        </CardActionArea>
      </AnimatedCard>
    );
}

export default CoinCard;