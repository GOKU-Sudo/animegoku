import { createContext, useContext } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const globalContext = createContext();



export const GlobalContextProvider = ({ children }) => {
  const baseUrl = "https://api.jikan.moe/v4";
  const baseUrl2='https://graphql.anilist.co';






  // these are the actions that will be used in the reducer function by the dispatch function
  const LOADING = 'LOADING'; // loading action
  const SEARCH = 'SEARCH'; // search action
  const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME'; // get popular anime action
  const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME'; // get upcoming anime action
  const GET_AIRING_ANIME = 'GET_AIRING_ANIME'; // get airing anime action
  const GET_FAVORITE_ANIME = 'GET_FAVORITE_ANIME'; // get favorite anime action
  const GET_TRENDING_ANIME = 'GET_TRENDING_ANIME'; // get trending anime action


  const reducer = (state, action) => { // reducer function
    switch (action.type) { // switch statement to check the type of action
      case LOADING: // loading action
        return { ...state, loading: true };
      case GET_POPULAR_ANIME: // get popular anime action
        return { ...state, popular: action.payload, loading: false };
      case GET_UPCOMING_ANIME: // get upcoming anime action
        return { ...state, upcoming: action.payload, loading: false }; 
      case GET_AIRING_ANIME: // get airing anime action
        return{...state,airing:action.payload,loading:false};
        case GET_FAVORITE_ANIME: // get favorite anime action
         return{...state,favorite:action.payload,loading:false}; 
          case GET_TRENDING_ANIME: // get trending anime action
        return { ...state, trending: action.payload, loading: false }; 
        case SEARCH: // search action
        return { ...state, searchResult: action.payload, isSearch: true, loading: false };
      default:
        return state;
    }
  }


  const initialState = { // initial state for the reducer
    popular: [],
    trending:[],
    upcoming: [],
    airing: [],
    favorite: [],
    pictures: [],
    isSearch: false,
    searchResult: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  
  const fetchAnime = async () => {
  dispatch({ type: LOADING });
  const query=`
  query{

    Popular:Page(page: 1, perPage: 40) {
      media(type: ANIME, sort: POPULARITY_DESC,isAdult: false) {
        id
        title {
          english
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        averageScore
        popularity
        season
        seasonYear
        episodes
        status
        source
        genres
        favourites
        duration
        coverImage {
          large
        }
        description
      }
    }

    Trending:Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC,isAdult: false) {
        id
        title {
          english
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
        }
        description
        trailer{
          id
          site
        }
      
      }
    }

    Favorite:Page(page: 1, perPage: 9) {
      media(type: ANIME, sort: FAVOURITES_DESC,isAdult: false) {
        id
        title {
          english
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          large
        }
        description
        trailer{
          id
          site
          thumbnail
        }
      }
    }

    Airing:Page(page: 1, perPage: 40) {
      media(type: ANIME, sort: POPULARITY_DESC, status: RELEASING,isAdult: false) {
        id
        title {
          english
          romaji
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        averageScore
        popularity
        season
        seasonYear
        episodes
        status
        source
        genres
        favourites
        duration
        coverImage {
          large
        }
        description
      }
    }

    Upcoming:Page(page: 1, perPage: 40) {
      media(type: ANIME, sort: POPULARITY_DESC, status: NOT_YET_RELEASED,isAdult: false) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        description
      }
    }

  }
  `
  try {
    const response = await axios.post('https://graphql.anilist.co', { query });
    console.log(response.data.data);
    dispatch({ type: GET_POPULAR_ANIME, payload: response.data.data.Popular.media });
    dispatch({ type: GET_TRENDING_ANIME, payload: response.data.data.Trending.media });
    dispatch({ type: GET_FAVORITE_ANIME, payload: response.data.data.Favorite.media });
    dispatch({ type: GET_AIRING_ANIME, payload: response.data.data.Airing.media });
    dispatch({ type: GET_UPCOMING_ANIME, payload: response.data.data.Upcoming.media });
  }
  catch(error){
    console.log(error);
  }


};


  useEffect(() => {

    fetchAnime();

    // fetchUpcomingAnimes();
    // fetchAiringAnimes();
  }, []);



  return (
    <globalContext.Provider value={{
      ...state,baseUrl,baseUrl2

    }}>
      {children}
    </globalContext.Provider>
  )
}



export const useGlobalContext = () => {
  return useContext(globalContext);

}
