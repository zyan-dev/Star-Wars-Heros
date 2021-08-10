import React, { useContext, useEffect, useState } from 'react';
import { Context as HomeContext } from '../../context/Home';
import { SET_PAGE } from '../../context/Home/types';
import { User } from '../../types/Home';
import { captializeFirstLetter } from '../../utils/helpers';
import './style.scss';

const HomePage: React.FC = () => {
  const [name, setName] = useState('');
  const {
    dispatchAction,
    searchPeople,
    state: {
      page,
      peoples,
      searching,
      maxPage,
    },
  } = useContext(HomeContext);

  useEffect(() => {
    if (name.length > 0) searchPeople(name, page);
  }, [page]);

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onPressSearch = () => {
    searchPeople(name, page);
  };

  const onPressPrevPage = () => {
    dispatchAction({ type: SET_PAGE, payload: page - 1 });
  };

  const onPressNextPage = () => {
    dispatchAction({ type: SET_PAGE, payload: page + 1 });
  };

  return (
    <div className="home-page">
      <div className="search-popup">
        <div className="header">
          <p>STAR WARS HEROES</p>
        </div>
        <div className="search-input-wrapper">
          <p>Character Name</p>
          <div className="search-input">
            <input data-testid="search-input" aria-label="search-input" type="input" value={name} onChange={handleNameChange} />
            <button data-testid="search-submit" type="button" onClick={onPressSearch}>SEARCH</button>
          </div>
        </div>
        <div className="result-view-wrapper">
          {searching && (
            <p className="status">Searching...</p>
          )}
          {!searching && (typeof peoples === 'string') && (
            <p className="status">{peoples}</p>
          )}
          {!searching && (typeof peoples !== 'string') && peoples.length > 0 && peoples.map((user: User, index: number) => (
            <div key={user.url}>
              <p className="name">{index + 1}. {user.name}</p>
              <div className="info-line">
                <span>Gender</span>
                <span data-testid="gender">{captializeFirstLetter(user.gender)}</span>
              </div>
              <div className="info-line">
                <span>Birth Year</span>
                <span data-testid="birth_year">{user.birth_year}</span>
              </div>
              <div className="info-line">
                <span>Height</span>
                <span data-testid="height">{user.height}</span>
              </div>
              <div className="info-line">
                <span>Mass</span>
                <span data-testid="mass">{user.mass}</span>
              </div>
              <div className="info-line">
                <span>Hair Color</span>
                <span data-testid="hair_color">{user.hair_color}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="page-controller">
          <button data-testid="prev-page" type="button" onClick={onPressPrevPage} disabled={page === 1}>{'<'}</button>
          <span data-testid="page">Page {page}</span>
          <button data-testid="next-page" type="button" onClick={onPressNextPage} disabled={page === maxPage}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
