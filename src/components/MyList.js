import React, { useState, useEffect } from 'react';
import TVShowItem from './TVShowItem';
import styled from 'styled-components';
import axios from 'axios';

const TVShowListWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;

  /* Responsive styles */
  @media (min-width: 1024px) {
    /* Computer */
    width: 80vw;
    justify-content: center;
  }

  @media (max-width: 840px) {
    /* Phone */
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
      const showPromises = userList.map(id => {
        return axios.get(`https://api.tvmaze.com/shows/${id}`).then(response => response.data);
      });

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
  }, [userList]);

  const removeFromUserList = id => {
    const updatedUserList = userList.filter(userId => userId !== id);
    setUserList(updatedUserList);
  };

    useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  return (
    <>
      <TVShowListWrapper>
        {!!myTvShows && myTvShows.length > 0 ? (
          myTvShows.map(tvShow => (
            <TVShowItem
              key={tvShow.id}
              tvShow={tvShow}
              removeFromUserList={removeFromUserList}
            />
          ))
        ) : (
          <ListVide>Votre liste de films est vide</ListVide>
        )}
      </TVShowListWrapper>
    </>
  );
};

export default MyList;
