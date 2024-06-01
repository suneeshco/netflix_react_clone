import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import Youtube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    let random = Math.floor(Math.random() * 20);
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovie(response.data.results[random]);
      });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleVideo = () => {
    if (movie && movie.id) {
      axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((response) => {
          setVideoUrl(response.data);
        });
    }
  };

  return (
    <div className='banner' style={{backgroundImage:`url(${movie ? imageUrl + movie.backdrop_path : ''})`}}>
      {movie && movie.title && (
        <div className='content'>
          <h1 className='title'>{movie.title}</h1>
          <div className='banner_buttons'>
            <button className='button' onClick={handleVideo}>Play</button>
            <button className='button'>My list</button>
          </div>
          <h1 className='description'>{movie.overview}</h1>
        </div>
      )}
      <div className="fade_bottom"></div>
      {videoUrl && videoUrl.results && videoUrl.results[0] && (
        <div className='video-container'>
          <button className='closeYoutube' onClick={() => setVideoUrl('')}>X Close Video</button>
          <Youtube opts={opts} videoId={videoUrl.results[0].key} />
        </div>
      )}
    </div>
  );
}

export default Banner;
