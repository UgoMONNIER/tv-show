import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TVShowList from './TVShowList';
import SearchBar from './SearchBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // 
import styled from 'styled-components'; //


const StyledPagination = styled(Pagination)`
  color: white; 
  .MuiPaginationItem-root {
    color: white; 
    margin: 20px 5px; 
    &.Mui-selected {
      background-color: white; 
      color: black; 
      &:hover{
        background-color: #DCDCDC; 
      }
    }
  }
`;

const TVShowListPage = () => {
  const [tvShows, setTVShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true); 
    const fetchTVShows = async () => {
      try {
        if (searchTerm === '') {
          const response = await axios.get(`https://api.tvmaze.com/shows`);
          setTVShows(response.data);
        } else {
          const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
          setTVShows(response.data);
        }
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        setLoading(false); 
      }
    };
    fetchTVShows();
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tvShowsSlice = tvShows.slice(startIndex, endIndex);

  return (
    <div style={{  marginTop : '60px'}}>
      <h1>TV Shows</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <TVShowList tvShows={tvShowsSlice} searchTerm={searchTerm} />
      )}
      <Stack spacing={3} direction="row" justifyContent="center">
        <StyledPagination
          count={Math.ceil(tvShows.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
          disabled={loading}
        />
      </Stack>
    </div>
  );
};

export default TVShowListPage;
