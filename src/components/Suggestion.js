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

const Suggestion = () => {
  const [myTvShow, setMyTVShow] = useState([]);
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('userList')) || []);

  useEffect(() => {
    const fetchTVShow = async () => {
      if (userList.length > 0) {
        const randomIndex = Math.floor(Math.random() * userList.length);
        const randomId = userList[randomIndex];

        try {
          const response = await axios.get(`https://api.tvmaze.com/shows/${randomId}`);
          setMyTVShow(response.data);
        } catch (error) {
          console.error('Error fetching TV show:', error);
        }
      }
    };
    fetchTVShow();
  }, [userList]);

  return (
    <>
      <TVShowListWrapper>
        {
          myTvShow.length !== 0
            ?
            <TVShowItem key={myTvShow.id} tvShow={myTvShow} isSuggestion={true} />
            :
            <ListVide>Votre liste de films est vide donc nous n'avons pas de suggestion</ListVide>
        }
      </TVShowListWrapper>
    </>
  );
};

export default Suggestion;
