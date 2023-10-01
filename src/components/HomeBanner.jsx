import React from 'react'
import homepageBannerImage from './../assets/homepage-banner.jpg';
import { Box, Typography } from '@mui/material';
import { animated, to, useSpring } from '@react-spring/web';

const AnimatedBox = animated(Box);

const HomeBanner = ({ isLoadingData }) => {
  const [filterStyles] = useSpring(() => ({
    from: {
      x: 0
    },
    to: {
      x: 360
    },
    loop: true,
    config: {
      duration: 16000
    }
  }));
  const [headerStyles] = useSpring(() => ({
    from: {
      y: '-100vh'
    },
    to: {
      y: '0'
    },
    delay: 500,
    // loop: true,
    config: {
      // duration: 1000,
      mass: 2,
      damping: 0.8,
      tension: 200,
      friction: 25,
    }
  }));
  return (
    <Box sx={{ maxWidth: '100%', boxSizing: 'border-box', height: '100vh', backgroundColor: '#000', position: 'relative' }}>
      <animated.img style={{ width: '100vw', height: '100vh',  objectFit: 'cover', boxSizing: 'border-box', filter: to(filterStyles.x, val => `hue-rotate(${val}deg) ${isLoadingData ? 'none' : 'blur(10px)'}`)}} src={homepageBannerImage} alt="homepage-banner" />
      {!isLoadingData && 
        <AnimatedBox style={{ position: 'absolute', height: '100%', width: '100%', top: '0', left: '0', paddingTop: '20%', boxSizing: 'border-box', ...headerStyles }}>
          <Typography sx={{ color: '#fff', fontSize: '96px', fontWeight: '700', textAlign: 'center', fontFamily: 'monospace'}}>Crypto-Voyance</Typography>
          <Typography sx={{ color: '#fff', fontSize: '32px', fontWeight: '400', textAlign: 'center', margin: '20px 100px', fontFamily: 'monospace'}}>A cryptocurrency price tracker made with React & Redux Toolkit</Typography>
        </AnimatedBox>
      }
    </Box>
  )
}

export default HomeBanner