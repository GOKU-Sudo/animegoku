import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useLocalStorage } from 'react-use';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AnimeItem() {
  const { id } = useParams(); // this is how we get the id from the url, it is :id parameter in the route


  const { baseUrl, baseUrl2, popular, } = useGlobalContext(); // we get the baseUrl from the context

  const [fetchedTitle , setFetchedTitle] = useState('');


  //state to store anime info
  // const [anime, setAnime] = useState({});
  const [anime, setAnime] = useLocalStorage('anime', {});
  // const [malAnime, setMalAnime] = useState({});//state to store characters info
  const [malAnime, setMalAnime] = useLocalStorage('malAnime', {});//state to store characters info
  // const [characters, setCharacters] = useState([]);
  const [characters, setCharacters] = useLocalStorage('characters', []);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isExpanded, setIsExpanded] = useLocalStorage('isExpanded', false);

  //destructuring the anime date we got from getAnime fucntion
  const { mal_id, title, synopsis, trailer, duration, aired, season, images, rank, score, scored_by, popularity, status, rating, source } = malAnime;
  // const { title, startDate, endDate, averageScore,  coverImage ,popularity, season, seasonYear, episodes, status, source, genres, duration, description} = anime;

  // this is to get the short synopsis of the anime, if the synopsis is more than 100 characters, we get the first 100 characters and add "..." at the end
  // const shortSynopsis = synopsis && synopsis.length > 300 ? synopsis.substring(0, 300) + "..." : synopsis;
  const shortSynopsis = synopsis && synopsis.length > 300 ? synopsis.substring(0, 300) + "..." : synopsis;

  // const getAnime = async (id) => {
  //   const query = `
  //   query ($id: Int) { 
  //     Media (id: $id, type: ANIME) { 
  //       id
  //       title {
  //         english
  //         romaji
  //       }

  //     }
  //   }
  // `;

  //   const variables = {
  //     id: id,
  //   };

  //   try {
  //     const response = await axios.post('https://graphql.anilist.co', {
  //       query,
  //       variables,
  //     });

  //     console.log(response.data.data.Media);
  //     const animeReceived = response?.data?.data?.Media;
  //     console.log(animeReceived);
  //     setAnime(animeReceived);
  //     return animeReceived;

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



const getAnime = async (id) => {
  // Check if the data is already in local storage
  console.log(anime);
  if (anime[id]) {
    console.log("anime already in local storage")
    console.log(anime[id]);
    return anime[id];
  }

  const query = `
    query ($id: Int) { 
      Media (id: $id, type: ANIME) { 
        id
        title {
          english
          romaji
        }
      }
    }
  `;

  const variables = {
    id: id,
  };

  try {
    const response = await axios.post('https://graphql.anilist.co', {
      query,
      variables,
    });

    const animeReceived = response?.data?.data?.Media;

    // Store the data in local storage
    setAnime({
      ...anime,
      [id]: animeReceived,
    });

    return animeReceived;

  } catch (error) {
    console.error(error);
  }
};



  const [loading, setLoading] = useState(true);

  const getMalAnime = async (animeSearch) => {
    try {
      console.log("getMalAnime running....");
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=$${encodeURIComponent(animeSearch)}`);

      setMalAnime(response.data.data[0]);
      setLoading(false);

    }
    catch (error) {
      console.log(error);
    }
  }

 
  // const getMalAnime = async (animeSearch) => {
  //   // Check if the data is already in local storage
  //   console.log(animeSearch);
  //   if (malAnime[animeSearch]) {
  //     setLoading(false);
  //     console.log("malAnime already in local storage")
  //     console.log(malAnime[animeSearch])
  //     setFetchedTitle(animeSearch);
  //     return malAnime[animeSearch];
  //   }
  
  //   try {
  //     console.log("getMalAnime running....");
  //     const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeSearch)}`);
  
  //     const animeReceived = response.data.data[0]; // Corrected this line
  //     console.log(animeReceived);
  
  //     // Store the data in local storage
  //     setMalAnime({
  //       ...malAnime,
  //       [animeSearch]: animeReceived,
  //     });

  //     console.log(malAnime[animeSearch]);
  //     setLoading(false);
  
  //     return animeReceived;
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  const getCharacters = async (mal_id) => { // this function is to get the anime info from the api
    // console.log(mal_id);
    // setLoading(true);
    const response = await axios.get(`${baseUrl}/anime/${mal_id}/characters`);
    const characters = response.data.data.slice(0, 20);

    setCharacters(characters);
    // setLoading(false);
  }


// const getCharacters = async (animeId) => {
//   // Check if the data is already in local storage
//   if (characters[animeId]) {
//     setLoading(false);
//     return characters[animeId];
//   }

//   try {
//     console.log("getCharacters running....");
//     const response = await axios.get(`https://api.jikan.moe/v3/anime/${animeId}/characters_staff`);

//     const charactersReceived = response.data.characters;

//     // Store the data in local storage
//     setCharacters({
//       ...characters,
//       [animeId]: charactersReceived,
//     });

//     setLoading(false);

//     return charactersReceived;

//   } catch (error) {
//     console.log(error);
//   }
// };


  // thi useEffect is to get the anime info and characters info when the component mounts

  useEffect(() => {
    const fetchAnime = async () => {
      const fetchedAnime = await getAnime(id);
      console.log(fetchedAnime);
      if (fetchedAnime) {
        console.log("running the condition of anime checking");
        const fetchedTitle = fetchedAnime.title.english ? fetchedAnime.title.english : fetchedAnime.title.romaji
        console.log(fetchedTitle);
        await getMalAnime(fetchedTitle);
      }
    };
    fetchAnime();
  }, []);


  useEffect(() => {
    mal_id && getCharacters(mal_id);
  },[mal_id]);

  // console.log(malAnime[fetchedTitle]);
  // console.log(mal_id);
  // console.log(malAnime.mal_id);
  // console.log(malAnime);




  return (
    <div>
      <h2>{title}</h2>
      <Style_anime_details>
        <Style_deatails>
          {
            loading ? (
              <div style={{ width: "100%" }}>

                <Skeleton height={'100%'} width={'100%'} />
              </div>
            ) : (
              <div className="anime-image">

                <img src={images?.jpg?.large_image_url} alt="img" />

              </div>
            )
          }

          {
            loading ? (

              <div style={{ width: "80%" }}><Skeleton style={{ marginBottom: "15px" }} count={11} width={'100%'} height={20} /></div>

            ) : (
              <div className="anime-info">

                <p> <span> Aired:</span> {aired?.string}</p>
                <p><span>Rating: </span>{rating}</p>
                <p><span>Rank:</span> {rank}</p>
                <p><span>Score:</span> {score}</p>
                <p><span>Scored By:</span> {scored_by}</p>
                <p><span>Popularity:</span> {popularity}</p>
                <p><span>Status:</span> {status}</p>
                <p><span>Source:</span> {source}</p>
                <p><span>Season:</span> {season}</p>
                <p><span>Duration:</span> {duration}</p>
                <StyledLink to={`/watch/${id}/${title}`}>Watch</StyledLink>
              </div>
            )
          }

        </Style_deatails>
        {
          loading ? (
            <Skeleton width={100} />
          ) : (
            <h3>Synopsis</h3>
          )
        }

        <div className="anime-synopsis">
          {
            loading ? (
              <Skeleton count={5} />
            ) :
              <div>
                <p>{isExpanded ? synopsis : shortSynopsis}</p>
                <button onClick={() => { setIsExpanded(!isExpanded) }}>{isExpanded ? "Show Less" : "Show More"}</button>
              </div>
          }

        </div>
      </Style_anime_details>
      {
          loading ? (
            null
          ) : (
          
            <h3>Trailer</h3>
          )
        }
      <StyleTrailer>
        {
          loading ? (
            <div style={{width:"560px", height:"315px", backgroundColor:"white",padding:"10px"}}>
               <Skeleton height={'100%'} width={'100%'} />
            </div>
            
          ) : (
            <div>
            {trailer?.embed_url &&
                <iframe width="560" height="315" src={trailer?.embed_url} title="YouTube video player" frameborder="0" allow="auto-play accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
            </div>
          )
        }

      </StyleTrailer>
      {
          loading ? (
            null
          ) : (
           
            <h3>Characters</h3>
          )
        }
      <StyleCharacter>
        {
          loading ? (
            Array(10).fill().map((_, index) => (
              <div key={index} style={{backgroundColor:"white",height:"170px", width:"150px",padding:"5px"}}>
              <Skeleton  height={"100%"} width={"100%"} /> {/* Skeleton for the image */}
              
            </div>
            ))

          ):(characters.map((character) => {
            const { role } = character;
            const { name, mal_id, images } = character.character;
            return (
              <Link to={`/character/${mal_id}`} key={mal_id}>
                <img src={images?.jpg.image_url} alt="img" />
                <p>{name}</p>
                <p>{role}</p>
              </Link>
            )
          }))
        }
       
      </StyleCharacter>
    </div>
  )

}
const StyledLink = styled(Link)`
display: flex;
justify-content: center;
width: 100px;
padding: 3px;
font-size: 1.5rem;
border-radius: 10px;
color: white;
background-color: #0a1625;
`

const Style_anime_details = styled.div`
 display: flex;
 flex-direction: column;
  width: 50%;
  margin: 0 auto;
  row-gap: 20px;

  // border: 2px solid red;

  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  }
`

const Style_deatails = styled.div`
// border: 2px solid red;
display: flex;
justify-content: space-evenly;
column-gap: 50px;


.anime-image{
  border: 2px solid green;
  width: 50wh;
  height: 65vh;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
}
  .anime-info{
    // border: 2px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    span{
      font-weight: bold;
    }

   
  }
 
`
const StyleTrailer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  iframe{
    width: 600px;
    height: 350px;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
  }

`

const StyleCharacter = styled.div`

width: 80%;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
gap: 2rem;


img{
  width: 90%;
  height: 70%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

p{
  // text-align: center;
  // font-size: 1.2rem;
  color: black;
  font-weight: bold;
}


`

export default AnimeItem;