import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
`;

const SearchBarForm = styled.form`
`;

const SearchBarInput = styled.input`
  background-color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
`;

const SearchBarButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const onSearchHandler = (e) => {
    e.preventDefault();
  };

  return (
    <SearchBarContainer className="searchbar">
      <SearchBarForm className="searchbar__form">
        <SearchBarInput
          type="text"
          placeholder="Search For Tv Show"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchBarButton className="btn btn-block" onClick={onSearchHandler}>
          SEARCH
        </SearchBarButton>
      </SearchBarForm>
    </SearchBarContainer>
  );
};

export default SearchBar;