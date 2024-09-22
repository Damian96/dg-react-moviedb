import React, { FC } from 'react';
import { HomeWrapper } from './home.styled';

interface homeProps { }

const home: FC<homeProps> = () => {
  return (
    <>
      <HomeWrapper>
        <h1>Welcome to MyMovieDB React App.</h1>
        <p>Use the lens button below to search for movies</p>
      </HomeWrapper>
    </>
  )
};

export default home;
