import {Link} from  'react-router-dom'
import {useEffect, useRef,useState} from 'react'

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import Styles from './index.module.css'

const Video = ({video}) => {
    
    const {id,video_files,user,width,height,liked} = video
    console.log(user)
    const {name} = user
    const videoUrl = video_files[0].link;
    
    
    
    const [ready, setReady] = useState(false);
    const [isLiked,setLike] = useState(liked)

    ///References///
    const videoRef = useRef()
    const likeRef = useRef()
    const authorRef = useRef()
    

    useEffect(()=>{
        const vid = videoRef.current 
        
        if(!vid){
            return ;
        }
        const onReady = () => setReady(true);
        vid.addEventListener('canplay',onReady)

        return ()=>{
           vid.removeEventListener('canplay',onReady)
        }
    },[])

    const handleMouseEnter = () => {
        if (ready && videoRef.current) {
          videoRef.current.play();
       }
        if (likeRef.current && authorRef.current){
            likeRef.current.classList.add(Styles.showLikeButton)
            authorRef.current.classList.add(Styles.showAutorBox)
        }
    }

    const handleMouseLeave  = () => {
        if (videoRef.current){
            videoRef.current.pause()
        }
        if (likeRef.current && authorRef.current){
            likeRef.current.classList.remove(Styles.showLikeButton)
            authorRef.current.classList.remove(Styles.showAutorBox)
        }
    }


const handleVideoLiking = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const storedList = JSON.parse(localStorage.getItem("likedList")) || [];

      if (!isLiked) {
        setLike(true);
        storedList.push({ ...video, liked: true });
       localStorage.setItem("likedList", JSON.stringify(storedList));
      } else {
         setLike(false);
         const newList = storedList.filter(each => each.id !== id);
         localStorage.setItem("likedList", JSON.stringify(newList));
      }
    };

    return (
     <Link to={`videos/${id}`} >
         <li  className={Styles.videoElement}>
            <video   style = {{aspectRatio:`${width}/${height}`}}  ref={videoRef} playsInline muted> <source src={videoUrl}></source></video>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={Styles.videoOverlay}>
                 <button onClick = {handleVideoLiking} ref= {likeRef} className={Styles.videoLikeBox}>  {isLiked? <MdFavorite className={Styles.liked}/> :<MdFavoriteBorder/>} </button>
                 <div  ref ={authorRef} className={Styles.videoAuthorBox}>
                     <p> By {name}</p>
                 </div>
            </div>
         </li>
     </Link>
    )
}

export default Video