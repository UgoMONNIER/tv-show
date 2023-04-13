import React, { useEffect } from 'react';
import TVShowItem from './TVShowItem';
import styled from 'styled-components';

const TVShowListWrapper = styled.div`
  display: flex;
  flex-direction : column;

  /* Responsive styles */
  @media (min-width: 1024px) { /* ordi */
    width: 80vw;
    justify-content: center;
  }


  @media (max-width: 840px) { /* telephone */
    width: 100%;
    justify-content: center;
  }
`;

// ...
const TVShowList = ({ tvShows, searchTerm }) => {


  return (
    <>
      <TVShowListWrapper>
        {Array.isArray(tvShows) && tvShows.length > 0 && searchTerm === '' && tvShows.map(tvShow => (
          <TVShowItem key={tvShow.id} tvShow={tvShow} />
        ))}
        {Array.isArray(tvShows) && tvShows.length > 0 && searchTerm !== '' && tvShows.map(arraySearchShow => (
          <TVShowItem key={arraySearchShow.show?.id} tvShow={arraySearchShow.show} />
        ))}
      </TVShowListWrapper>
    </>
  );
};

export default TVShowList;
