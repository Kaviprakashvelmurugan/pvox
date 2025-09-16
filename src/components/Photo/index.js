import {Link} from 'react-router-dom'
import {useState,useRef} from 'react'
import Styles from './index.module.css'

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";


const Photo = ({photo}) => {
    const {id,src,alt,avg_color,width,height,photographer,liked} = photo
    
    const [imgLoaded,setImageLoaded] = useState(false)
    const [isLiked, setLike] = useState(liked);

    
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

   const handlePhotoLiking = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const storedList = JSON.parse(localStorage.getItem("likedList")) || [];

      if (!isLiked) {
        setLike(true);
        storedList.push({ ...photo, liked: true });
       localStorage.setItem("likedList", JSON.stringify(storedList));
      } else {
         setLike(false);
         const newList = storedList.filter(each => each.id !== id);
         localStorage.setItem("likedList", JSON.stringify(newList));
      }
    };

    return (
        <Link className={Styles.photoItem} to =  {`/photos/${id}`} >
           <li className={Styles.photoElement} style = {{background:imgLoaded?'transparent':avg_color,aspectRatio: `${width} / ${height}`}}>
               <img  ref = {photoRef}  onLoad = {()=>{
                  setImageLoaded(true)
                }} 
               src={src.original} alt={alt}/>

                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={Styles.photoOverlay}>

                   <button onClick = {handlePhotoLiking} ref= {likeRef} className={Styles.photoLikeBox}> {isLiked? <MdFavorite className={Styles.liked}/> :<MdFavoriteBorder/>} </button>
                    <div  ref ={authorRef} className={Styles.photoAuthorBox}>
                      <p> By {photographer}</p>
                   </div>
            </div>
           </li>
        </Link>
        
       
    )
}

export default Photo