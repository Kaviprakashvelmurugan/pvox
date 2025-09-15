import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'

import Styles from './index.module.css'

import NavBar  from '../Navbar'
const PhotoDetail = () =>{

    const [photoDetail,setPhotoDetail] = useState({})
    const [imgLoaded,setImgLoaded] = useState(false)
    const {photoId} = useParams()
     
    const fetchPhotoDetails = async () =>{
        const fetchUrl = `https://api.pexels.com/v1/photos/${photoId}`
        const apiKey = process.env.REACT_APP_PEXELS_API_KEY
        const options = {
            method:'GET',
            headers:{
                Authorization:apiKey
            }
        }

        try{
          const response  = await fetch(fetchUrl,options)
          const jsonResponse = await response.json()
          console.log(jsonResponse)
          if (response.ok){
            setPhotoDetail(jsonResponse)
          }
        }

        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
      fetchPhotoDetails()
    },[])

     const {alt,src,avg_color,width} = photoDetail
     
    return (
         <>
             <NavBar/>
             {  
               Object.keys(photoDetail).length > 0 &&
                
                (
                  <div className={Styles.photoDetailBg}>
                     <div className={Styles.photoHeader}>
                        <h1>{alt}</h1>
                    </div>
                    <img onLoad={()=>{
                        setImgLoaded(true)
                    }} className={Styles.photo} src={src.original} alt={alt}  style={{background:imgLoaded? 'transparent' : avg_color,width:width>4000 ? '65%' :'30%'}}/>
                    
                 </div>)
             }
            
         </>
    )
}

export  default PhotoDetail