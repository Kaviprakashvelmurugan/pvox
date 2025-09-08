import {Link} from 'react-router-dom'
import {useState} from 'react'
import Styles from './index.module.css'

const Photo = ({photo}) => {
    const {src,alt,avg_color,width,height} = photo
    console.log(avg_color)
    const [imgLoaded,setImageLoaded] = useState(false)
    return (
        <Link className={Styles.photoItem} to=''>
           <li style = {{background:imgLoaded?'transparent':avg_color,aspectRatio: `${width} / ${height}`}}>
               <img onLoad = {()=>{
                  setImageLoaded(true)
                }} 
               src={src.original} alt={alt}/>
           </li>
        </Link>
        
       
    )
}

export default Photo