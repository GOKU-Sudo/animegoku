import React from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ContentLoader from 'react-content-loader';
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SpotlightAnime() {

      const { trending,loading } = useGlobalContext();
      console.log(trending);
      const [showFullDescription, setShowFullDescription] = useState(false);

      if(loading){
            return (
                  <div style={{display: 'flex',justifyContent:'center',padding:'20px'}}>
                        <div style={{backgroundColor:"white",padding:"5px"}}>
                      <Skeleton width={800} height={600} />

                        </div>
                    
                    
                   </div>
                );
          }

      return (

            <StyledBackground>
                  <StyledCarousel
                        showArrows={true} // Enables navigation arrows
                        autoPlay={true} // Sets automatic play
                        infiniteLoop={true} // Loops the slideshow
                        interval={3000} // Sets the time between slides in milliseconds (3 seconds here)
                        showThumbs={false} // Disables thumbnail navigation
                        showStatus={false} // Disables status indicator
                  >
                        {trending.map((anime, index) => (

                              <div key={anime.id}>
                                    <div>
                                          <img
                                                style={{
                                                      width: '510px',
                                                      height: '600px',
                                                      borderRadius: '10px 0 0 10px',
                                                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                                      border: "1px solid #f1f1f1"

                                                }}
                                                src={anime.coverImage.extraLarge}
                                                alt={`Anime: ${anime.title.english}`} // Improved alt text

                                          />

                                    </div>
                                    {/* <h3>{anime.title.english}</h3> */}
                                    <div>
                                          <h2 style={{ color: "rgb(53, 119, 255)" }}>{`#${index + 1}`}</h2>
                                          <h3 style={{ fontSize: "20px" , color:"rgb(43, 45, 66)"}}>{anime.title.english}</h3>
                                          <p style={{ color:"#748899" }}>
                                                {showFullDescription ? anime.description.length > 700 ? `${anime.description.substring(0, 700)}...`
                                                      : anime.description
                                                      : `${anime.description.substring(0, 300)}...`}
                                                <button onClick={() => setShowFullDescription(!showFullDescription)}>
                                                      {showFullDescription ? 'Show Less' : 'Show More'}
                                                </button>
                                          </p>

                                    </div>
                              </div>
                        ))}
                  </StyledCarousel>
            </StyledBackground>
      );
}

export default SpotlightAnime;

const StyledBackground = styled.div`
      // border: 2px solid red;
      background: #f1f1f1;
      padding: 20px;
      // border-radius: 10px;
      margin-right: 20px;
      // Removed width and height styles to allow responsive behavior
      `
const StyledCarousel = styled(Carousel)`
      div{
            // border: 2px solid blue;
           
            display: flex;
            justify-content: center;
            align-items: center;

        

            div:nth-child(2){
                  background: white;
                  display: flex;
                  flex-direction: column;
                  // border: 2px solid red;
                  width: 460px;
                  height: 600px;
                  row-gap: 10px;
                  padding: 20px;
                border-radius: 0 10px 10px 0;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }


      }
      `
      ;

