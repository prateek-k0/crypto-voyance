import React, { useState, useRef, useCallback } from 'react'
import { useGetCoinsQuery, usePrefetch } from '../services/coinList'
import { Box } from "@mui/material";
import styled from '@emotion/styled';
import CoinList from '../components/CoinList';
import Spinner from '../utils/common/Spinner';
import ErrorComponent from '../utils/common/ErrorComponent';
import HomeBanner from '../components/HomeBanner';
import CoinDetailsModal from '../components/CoinDetailsModal';

// time = moment(1695100920*1000).format("DD-MM-YYYY hh:mm:ss");

const ScrollBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  maxHeight: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px'
  },
  '&::-webkit-scrollbar-track': {
      opacity: 0
  },
  '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
  },
}));

const Homepage = () => {
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const {data: coinListData, isError, isFetching, isLoading, isSuccess} = useGetCoinsQuery(pagesLoaded);
  const [displayModal, setDisplayModal] = useState(false);
  const [currentSelectedCoin, setCurrentSelectedCoin] = useState(null);
  const fetchCoinDataTrigger = usePrefetch('getCoinData', { ifOlderThan: 60 }); // data is older than 60s, refetch

  const scrollableRef = useRef();

  const onScrollToBottom = useCallback(() => {
    const scrollableElement = scrollableRef.current;
    const reachedToBottom = scrollableElement.offsetHeight + scrollableElement.scrollTop >= scrollableElement.scrollHeight - 10;
    if(reachedToBottom && !isFetching) {
      setPagesLoaded(p => p+1);
    }
  }, [isFetching, scrollableRef]);

  const openModal = useCallback((coinId) => {
    setDisplayModal(true);
    setCurrentSelectedCoin(coinId);
    fetchCoinDataTrigger(coinId);
  }, [fetchCoinDataTrigger]);

  const closeModal = useCallback(() => {
    setDisplayModal(false);
    setCurrentSelectedCoin(null);
  }, []);

  if(isError) return (
    <ErrorComponent />
  );

  return (
    <ScrollBox ref={scrollableRef} onScroll={onScrollToBottom} sx={{ position: 'relative', overflowY: displayModal ? 'hidden !important' : 'auto' }}>
      <HomeBanner isLoadingData={isLoading} />
      {(isLoading || isFetching) && <Spinner text={isLoading ? 'Fetching coins...' : 'Fetching more coins...'} />}
      {isSuccess && <CoinList coinListData={coinListData || []} onCoinCardClick={openModal} />}
      {displayModal && <CoinDetailsModal onCloseModal={closeModal} selectedCoin={currentSelectedCoin} />}
    </ScrollBox>
    
  )
}

export default Homepage