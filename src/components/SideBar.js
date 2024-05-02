import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/GlobalContext'
import { Link } from 'react-router-dom'

function SideBar() {

  // const { favorite, isSearch, getTopFavoriteAnime } = useGlobalContext();
  const { favorite,isSearch } = useGlobalContext();

  // useEffect(() => {
  //   getTopFavoriteAnime();
  // }, []);

  const conditionalRendering = () => {
    if (isSearch) {
      return <h1>Searching</h1>
    }
    const anime = favorite.map((anime) => {
      return <Link to={`/anime/${anime.id}/${anime.title.english}}`} key={anime.id}>
        <div>
          <img src={anime.coverImage.large} alt="imag" />

          <div>
            <h3>{anime.title.english}</h3>
          </div>
        </div>
      </Link>
    });
    return anime;

  }

  return (
    <PopularAnimeStyle>
      <div className="popular_anime">
        <h2>Top Favorite</h2>
        {conditionalRendering()}
      </div>
    </PopularAnimeStyle>
  )
}

const PopularAnimeStyle = styled.div`
background-color: white;
border-radius: 10px;
display: inline-block;
padding: 5px;
height: 100%;
position: sticky; 
top: 25px;
// background-color: white;

.popular_anime{
  // border: 2px solid yellow;
  display:flex;
  flex-direction: column;
  margin-left: 10px;
  

  h2{
    color: rgb(53, 119, 255);
    font-weight: 600;
    margin-bottom: 10px;
  }

  div{
    padding: 3px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    // border: 2px solid red;
    width: 190px;

    div{
      width: 60%;
      font-size: 0.8rem;
      color: #748899;
    }
  }
  img{
    // border: 2px solid yellow;
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

}
;
`

export default SideBar