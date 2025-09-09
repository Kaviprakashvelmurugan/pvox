import {Link} from 'react-router-dom'
import {useState,useRef} from 'react'
import Styles from './index.module.css'

import { MdFavoriteBorder } from "react-icons/md";

const Photo = ({photo}) => {
    const {src,alt,avg_color,width,height,photographer} = photo

    const [imgLoaded,setImageLoaded] = useState(false)


    ///Reference /// 

    const photoRef = useRef()
    const likeRef = useRef()
    const authorRef = useRef()
    


    const handleMouseEnter = () => {
        if (likeRef.current && authorRef.current){
            likeRef.current.classList.add(Styles.showLikeButton)
            authorRef.current.classList.add(Styles.showAutorBox)
        }
    }

    const handleMouseLeave  = () => {
        if (likeRef.current && authorRef.current){
            likeRef.current.classList.remove(Styles.showLikeButton)
            authorRef.current.classList.remove(Styles.showAutorBox)
        }
    }

    return (
        <Link className={Styles.photoItem} to=''>
           <li className={Styles.photoElement} style = {{background:imgLoaded?'transparent':avg_color,aspectRatio: `${width} / ${height}`}}>
               <img  ref = {photoRef}  onLoad = {()=>{
                  setImageLoaded(true)
                }} 
               src={src.original} alt={alt}/>

                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={Styles.photoOverlay}>
                   <button ref= {likeRef} className={Styles.photoLikeBox}> <MdFavoriteBorder/> </button>
                    <div  ref ={authorRef} className={Styles.photoAuthorBox}>
                      <p> By {photographer}</p>
                   </div>
            </div>
           </li>
        </Link>
        
       
    )
}

export default Photo