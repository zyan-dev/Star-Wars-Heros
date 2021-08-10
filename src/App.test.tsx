import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {HomeState, Provider as HomeProvider} from './context/Home';
import HomePage from './pages/Home';
import { User } from './types/Home';
import { HomeAction, SEARCHING_RESULT, SET_MAX_PAGE, SET_PAGE, SET_RESULT } from './context/Home/types';
import createDataContext from './context/createDataContext';

export const delayFunc = (callback: any) => {
  setTimeout(() => {
    callback && callback();
  }, 1000);
}

describe('Testing home page', () => {
  let element;
  let wrapper;

  test('renders search input and buttons correctly', () => {
    wrapper = render(<App />);
    element = screen.getByText(/STAR WARS HEROES/i);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/Character Name/i);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/SEARCH/i);
    expect(element).toBeInTheDocument();
  });

  cleanup();

  test('render filtered people correctly', () => {
    const customRender = (ui: React.ReactNode, providerProps: any) => {
      return render(
        <HomeProvider value={providerProps}>{ui}</HomeProvider>
      )
    }
    const peoples: User[] = [
      {
        "birth_year": "19 BBY",
        "eye_color": "Blue",
        "films": [
            "https://swapi.dev/api/films/1/",
        ],
        "gender": "Male",
        "hair_color": "Blond",
        "height": "172",
        "homeworld": "https://swapi.dev/api/planets/1/",
        "mass": "77",
        "name": "Luke Skywalker",
        "skin_color": "Fair",
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-10T13:52:43.172000Z",
        "species": [
            "https://swapi.dev/api/species/1/"
        ],
        "starships": [
            "https://swapi.dev/api/starships/12/",
        ],
        "url": "https://swapi.dev/api/people/1/",
        "vehicles": [
            "https://swapi.dev/api/vehicles/14/"
        ]
      },
      {
        "birth_year": "600BBY",
        "created": "2014-12-10T17:11:31.638000Z",
        "edited": "2014-12-20T21:17:50.338000Z",
        "eye_color": "orange",
        "films": ["https://swapi.dev/api/films/1/"],
        "gender": "hermaphrodite",
        "hair_color": "n/a",
        "height": "175",
        "homeworld": "https://swapi.dev/api/planets/24/",
        "mass": "1,358",
        "name": "Jabba Desilijic Tiure",
        "skin_color": "green-tan, brown",
        "species": ["https://swapi.dev/api/species/5/"],
        "starships": [],
        "url": "https://swapi.dev/api/people/16/",
        "vehicles": []
      }
    ];
    const providerProps: HomeState = {
      page: 1,
      searching: false,
      peoples,
      maxPage: 1
    }
    wrapper = customRender(
      <HomePage />,
      providerProps
    );
    element = screen.getByText('2. Jabba Desilijic Tiure');
    expect(element).toBeInTheDocument();
    element = screen.getByText('1. Luke Skywalker');
    expect(element).toBeInTheDocument();
    expect(screen.getAllByTestId('gender').length).toBe(2);
    expect(screen.getAllByTestId('birth_year').length).toBe(2);
    expect(screen.getAllByTestId('height').length).toBe(2);
    expect(screen.getAllByTestId('mass').length).toBe(2);
    expect(screen.getAllByTestId('hair_color').length).toBe(2);
  });

  test('HomePage events works correctly', async () => {
    const customRender = (ui: React.ReactNode, providerProps: any) => {
      return render(
        <HomeProvider value={providerProps}>{ui}</HomeProvider>
      )
    }
    const providerProps: HomeState = {
      page: 2,
      searching: false,
      peoples: [],
      maxPage: 3
    }
    wrapper = customRender(
      <HomePage />,
      providerProps
    );
    element = screen.getByTestId('search-input');
    fireEvent.change(element, { target: { value: 'ab' } });
    element = screen.getByLabelText('search-input') as HTMLInputElement;
    expect(element.value).toBe('ab');
    element = screen.getByTestId('search-submit');
    fireEvent.click(element);
    element = screen.getByTestId('prev-page');
    fireEvent.click(element);
    element = screen.getByTestId('next-page');
    fireEvent.click(element);
    expect(screen.getByTestId('page').textContent).toBe('Page 2');
  })
})



