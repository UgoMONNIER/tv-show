import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';


const TVShowItemWrapper = styled.div`
  width: 80vw;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items : center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  /* Responsive styles */

  @media (max-width: 840px) { /* telephone */
    width: 100%;
    flex-direction: column;
  }
`;

const InfoWrapper = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: white;
  @media (max-width: 840px) { /* telephone */
  min-width: 180px;
  }
`;

const TVShowImage = styled.img`
  margin: 10px;
  padding: 10px;
  width: 10%;
  min-width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  @media (max-width: 840px) { /* telephone */
  width: 200px;
  }
`;

const TVShowTitle = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const TVShowDate = styled.h4`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const TVShowSummary = styled.p`
  display:none;
  margin: 8px 10px;
  font-size: 14px;
  text-align: justify;
  white-space: ${props => (props.wrap ? 'wrap' : 'nowrap')}; 
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer; 
`;

const StyledButton = styled.button`
  background-color: #DCDCDC;
  height: 50px;
  width : 250px;
  color:  	#000;
  padding: 10px 15px;
  margin: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const TVShowItem = ({ tvShow }) => {
  const [wrapText, setWrapText] = useState(false);
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('userList')) || []);

  const isAlreadyInMyList = userList.findIndex(item => item === tvShow?.id) !== -1;

  const handleTextToggle = () => {
    setWrapText(prev => !prev);
  };

  const handleAddToList = () => {
    setUserList(prevList => {
      let updatedList = [...JSON.parse(localStorage.getItem('userList')), tvShow?.id];
      updatedList = updatedList.filter((x, i) => updatedList.indexOf(x) === i)
      localStorage.setItem('userList', JSON.stringify(updatedList));
      return updatedList;
    });
  };
  
  const handleRemoveFromList = () => {
    setUserList(prevList => {
      const updatedList = JSON.parse(localStorage.getItem('userList')).filter(item => item !== tvShow?.id);
      localStorage.setItem('userList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  return (
    <TVShowItemWrapper>
      <TVShowImage src={tvShow?.image?.medium} alt={tvShow?.name} />
      <InfoWrapper>
        <TVShowTitle>{tvShow?.name}</TVShowTitle>
        <TVShowTitle>{'Note : ' + tvShow?.rating?.average}</TVShowTitle>
        <TVShowTitle>{tvShow?.averageRuntime + ' min'}</TVShowTitle>
        <TVShowDate>{tvShow?.premiered?.split('-', 1)}</TVShowDate>
      </InfoWrapper>
      <TVShowSummary wrap={wrapText} onClick={handleTextToggle}>
        <div dangerouslySetInnerHTML={{ __html: tvShow?.summary }} />
      </TVShowSummary>
      {isAlreadyInMyList ? <StyledButton onClick={handleRemoveFromList}>Retirer de ma Liste</StyledButton> : <StyledButton onClick={handleAddToList}>Ajouter à ma liste</StyledButton> }
    </TVShowItemWrapper>
  );
};

export default TVShowItem;
