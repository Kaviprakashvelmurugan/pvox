import {Link} from  'react-router-dom'
import {useRef} from 'react'

import { MdFavoriteBorder } from "react-icons/md";

import Styles from './index.module.css'

const Video = ({video}) => {
    const {video_files,user} = video
    
    const {id,name,url} = user
    const videoUrl = video_files[0].link;


    ///References///
    const videoRef = useRef()
    const likeRef = useRef()
    const authorRef = useRef()

    const handleMouseEnter = () => {
        if (videoRef.current){
            videoRef.current.play()
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

    return (
     <Link>
         <li className={Styles.videoElement}>
            <video  ref={videoRef} playsInline muted> <source src={videoUrl}></source></video>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={Styles.videoOverlay}>
                 <button ref= {likeRef} className={Styles.videoLikeBox}> <MdFavoriteBorder/> </button>
                 <div  ref ={authorRef} className={Styles.videoAuthorBox}>
                     <p> By {name}</p>
                 </div>
            </div>
         </li>
     </Link>
    )
}

export default Video