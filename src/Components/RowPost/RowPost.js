import React,{useState,useEffect} from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY,imageUrl } from '../../constants/constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [post,setPost]=useState([])
  const [videoUrl,setVideoUrl]=useState('')
  
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response);
      setPost(response.data.results)
    }).catch((error)=>{alert('Network Error')})
  },[])

  const opts={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:1
    }
  }

  const handleMovie=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        setVideoUrl(response.data)
      }else{
        console.log('Array Empty');
      }
    })
  }



  const closeVideo=()=>{
    setVideoUrl("")
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {post.map((post)=>
        <img onClick={()=>handleMovie(post.id)} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+post.backdrop_path}`} alt="card_image" />
        )}
      </div>
      {videoUrl && (
        <div>
          <button className='closeYoutube' onClick={closeVideo}> X Close Video</button>
          <Youtube opts={opts} videoId={videoUrl.results[0].key} />
        </div>
      )}
    </div>
  )
}

export default RowPost
