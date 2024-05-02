
import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import SideBar from './SideBar';
import { useLocalStorage } from 'react-use';

import { useParams } from 'react-router-dom';

function Search() {
      // const {  loading} = useGlobalContext();
      const [loading, setLoading] = useState(false);
      
      // const [searchedAnime, setSearchedAnime] = useState([]);
      const [searchedAnime, setSearchedAnime] = useLocalStorage('searchedAnime', []);

      // Inside your Search component
      
      const { queri } = useParams();
      // Use query to perform your search

      const fetchAnime = async () => {
      const query = `
      query{ 
        Page(page: 1, perPage: 40) {
          media(type: ANIME, search:"${queri}",isAdult: false) {
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
      }`
            try {
                  setLoading(true);
                  const response = await axios.post('https://graphql.anilist.co', { query });
                  console.log(response.data.data.Page.media);
                  setSearchedAnime(response.data.data.Page.media);
                  setLoading(false);

            }
            catch (error) {
                  console.log(error);
            }
      }

      useEffect(() => {
            fetchAnime();
      }, [queri]);

      // console.log(searchResult);
      console.log(searchedAnime);


      const conditionalRendering = () => {

                const anime = loading ? (
                  Array(10).fill().map((_, index) => (
                    <div key={index} style={{backgroundColor:"white",padding:"5px",height:"250px",width:"200px", marginBottom:"10px"}}>
                      <Skeleton height={"100%"} width={"100%"} /> {/* Skeleton for the image */}
                    </div>
                  ))
                ) : (
                  searchedAnime.map((anime) => {
                    return (
                      <Link to={`/anime/${anime.id}/${anime.title.english}`} key={anime.id}>
                        <img src={anime.coverImage.large} alt="imag" />
                        <div>
                          <h3>{anime.title.english}</h3>
                        </div>
                      </Link>
                    );
                  })
                );

                return anime;

      }
      return (

            <MainConatiner>
                  <div style={{
                        display: 'flex',
                        columnGap: '3rem',
                        paddingTop: '20px',
                        paddingLeft: '20px',
                  }}>

                        <SideBar />
                        <PopularAnimeStyle>
                              <div className="popular_anime">
                                    {conditionalRendering()}
                              </div>
                        </PopularAnimeStyle>
                  </div>
            </MainConatiner>

      )
}

const MainConatiner = styled.div`
        display: flex;
        flex-direction: column;
        `

const PopularAnimeStyle = styled.div`
        display: inline-block;
        // border: 2px solid blue;
        // margin:0 auto;
        width: 100%;
        // border: 2px solid red;
        
        .popular_anime {
          // border: 2px solid red;
          display: grid;
          // justify-content: center;
          // margin-left:20px;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        
        
        
          img{
        
            height: 260px;
            width: 200px;
        
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            
          }
          div{
            // border: 2px solid red;
            width: 70%;
            h3{
              color: #748899;
              font-size: 0.9rem;
            }
          }
        }
        
        
        `;

export default Search;

