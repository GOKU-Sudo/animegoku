import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SpotlightAnime from './SpotlightAnime';
import SideBar from './SideBar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Airing() {

  const { airing, isSearch,loading} = useGlobalContext();

  // useEffect(() => {
  //   fetchAiringAnimes();
  // }, []);

  console.log(airing,loading);

   
  const conditionalRendering = () => {
    // if(loading){
    //   <div>
    //     <Skeleton data-testid="skeleton"height={250} width={250} />
    //     <Skeleton data-testid="skeleton"height={30} width={250} />
    //   </div>
    // }
    // if (isSearch) {
    //   return <h1>Searching</h1>
    // }
    // const anime = airing.map((anime) => {
    //   return <Link to={`/anime/${anime.id}/${anime.title.english}`} key={anime.id}>

    //     <img src={anime.coverImage.large} alt="imag" />
    //     <div>
    //       <h3>{anime.title.english?anime.title.english:anime.title.romaji}</h3>
    //     </div>

    //   </Link>
    // });
    
    // return anime;

    
    const anime = loading ? (
      Array(10).fill().map((_, index) => (
        <div key={index} style={{backgroundColor:"white",padding:"5px",height:"250px",width:"200px", marginBottom:"10px"}}>
          <Skeleton height={"100%"} width={"100%"} /> {/* Skeleton for the image */}
        </div>
      ))
    ) : (
      airing.map((anime) => {
        return (
          <Link to={`/anime/${anime.id}/${anime.title.english}`} key={anime.id}>
            <img src={anime.coverImage.large} alt="imag" />
            <div>
            <h3>{anime.title.english?anime.title.english:anime.title.romaji}</h3>
            </div>
          </Link>
        );
      })
    );
    
    return anime;

  }

  return (
    <MainConatiner>
      <div style={{display: 'flex',columnGap: '3rem',paddingTop: '20px',paddingLeft: '20px',}}>  
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
export default Airing;