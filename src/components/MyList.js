import React, { useState, useEffect } from 'react';
import TVShowItem from './TVShowItem';
import styled from 'styled-components';
import axios from 'axios';

const TVShowListWrapper = styled.div`
  margin-top : 70px;
  display: flex;
  flex-direction: column;

  /* Responsive styles */
  @media (min-width: 1024px) { /* Computer */
    width: 80vw;
    justify-content: center;
  }

  @media (max-width: 840px) { /* Phone */
  width: 80vw;
  justify-content: center;
  }
`;

const ListVide = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const MyList = ({ tvShows, searchTerm }) => {
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('userList')) || []);
  const [loading, setLoading] = useState(true);
  const [myTvShows, setMyTVShows] = useState([]);


  useEffect(() => {
    setLoading(true);
    const fetchTVShows = () => {
      // Fetch TV show details for each ID in userList
      const showPromises = userList.map(id => {
        return axios.get(`https://api.tvmaze.com/shows/${id}`)
        .then(response => response.data);
      });

      // Wait for all promises to resolve and update state with the data
      Promise.all(showPromises)
        .then(showData => {
          setMyTVShows(showData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching TV shows:', error);
          setLoading(false);
        });
    };
    fetchTVShows();
  }, [userList]);

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
    setUserList(userList)
  }, [userList]);

  return (
    <>
      <TVShowListWrapper>
        {/* Render TVShowItem for each TV show in myTvShows */}
        {!!myTvShows ? myTvShows.map(tvShow => (
          <TVShowItem key={tvShow.id} tvShow={tvShow} />
        ))
        :
        <ListVide>Votre liste de films est vide</ListVide>
        }
      </TVShowListWrapper>
    </>
  );
};

export default MyList;
