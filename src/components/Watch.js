
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


function Watch() {
      const { id, name } = useParams();
      const [videoUrl, setVideoUrl] = useState("");
      const [animePahe, setAnimePahe] = useState({
            provider: '',
            watchId: '',
            episodeNo: '',
      });
      const [zoro, setZoro] = useState([]);
      const [gogoanime, setGogoanime] = useState({
            provider: '',
            episodes: [],

      });
      const date=new Date();

      console.log(id, name, date);

      const fetchEpisodes = async (id) => {
            try {

                  const responseEpisode = await axios.get(`https://api.anify.tv/episodes?id=${id}`);
                  console.log(responseEpisode.data,date);

                  const providers = responseEpisode.data;
                  for (let i = 0; i < providers.length; i++) {
                        if (providers[i].providerId === "gogoanime") {
                              setGogoanime({
                                    ...gogoanime,
                                    provider: providers[i].providerId,
                                    episodes: providers[i].episodes,
                              });

                        }
                  }
            }
            catch (error) {
                  console.log(error);
            }
      }
      console.log(gogoanime);

      const fetchStreamLinks = async (provider, watchId, episodeNo) => {

            const links = await axios.get(`https://api.anify.tv/sources?providerId=gogoanime&watchId=${encodeURIComponent(watchId)}&episodeNumber=${episodeNo}&id=${id}&subType=sub&server=gogocdn`);

            console.log(links.data);
            console.log(links.data.sources[3].url);
            setVideoUrl(links.data.sources[3].url);
      }

      useEffect(() => {
            fetchEpisodes(id);
      }, []);

      const episodes = gogoanime.episodes.map((episode) => {
            return (
                  <button key={episode.id} onClick={() => {fetchStreamLinks(gogoanime.provider, episode.id, episode.number)
                        setDisplayVideo(true)}}>{episode.title}</button>
            )
      });


      const [displayVideo, setDisplayVideo] = useState(false);

      return (

            <div>


                  {/* <h1 style={{color:"rgb(43, 45, 66)" }}>Episode List</h1> */}
                  <StyledContainer>

                        <StyledEpisodeList>

                              {episodes}

                        </StyledEpisodeList>

                        <div style={{ width:"68%", height:"100%"}}>
                        {displayVideo ? (videoUrl && <ReactPlayer url={videoUrl} controls width="" height="" />) : <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '590px',
                              width: '800px%',
                              backgroundColor: 'black',
                              color: 'white',
                              fontSize: '30px',
                        }}>Select an episode to watch </div>}
                        </div>

                  </StyledContainer>

            </div>

      )
}

const StyledMainContainer = styled.div`
display: flex;
justify-content: center;
`

const StyledContainer = styled.div`
padding-top: 30px;
display: flex;
flex-direction: row;
// border : 2px solid red;
justify-content:space-evenly;


`

const StyledEpisodeList = styled.div`
display: flex;
flex-direction: column;
width: 150px;

height: 593px;
overflow-y: scroll;
// border: 2px solid green;
border-radius:10px;
row-gap: 5px;


button {
      border: 1px solid #748899;
      // margin: 1px 0;
      padding: 10px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      background-color: white;
      color:rgb(43, 45, 66);

     
}
`






export default Watch;