import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'

import Styles from './index.module.css'

import NavBar  from '../Navbar'
import Photo from '../Photo'

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

const PhotoDetail = () =>{
    

   
     const [photoDetail,setPhotoDetail] = useState({})
     const {id,alt,src,avg_color,width,photographer} = photoDetail
    
     const [imgLoaded,setImgLoaded] = useState(false)
     const [isLiked,setIsLiked]  = useState(false)
     const [mainWords,setMainWords] = useState('')
     const [similarPhotos,setSimilarPhotos] = useState(null)

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
          if (response.ok){
            setPhotoDetail(jsonResponse)
            const stopWords = ['a','an','the','in','on','at','by','for','of','to','with','and','or','but','photo','image','picture','stock'];
            const {alt} = jsonResponse;
            const altlist = alt.toLowerCase().split(' ')
            
            const impWords =altlist.filter(each=>{
              if (!stopWords.includes(each)){
                 return each
              }
            })
            setMainWords(impWords.join(' '))
          }
        }

        catch(error){
            console.log(error)
        }
    }

    
    useEffect(()=>{
      fetchPhotoDetails()
    },[])

    useEffect(() => {
     if (Object.keys(photoDetail).length > 0) {
     const likedList = JSON.parse(localStorage.getItem('likedList')) || [];
     setIsLiked(likedList.some(p => p.id === photoDetail.id));
     }
    }, [photoDetail]);
    


    const fetchSimilarPhotos = async ()=>{
       const fetchUrl = `https://api.pexels.com/v1/search?query=${mainWords || 'nature'}&page=1&per_page=20`
       const options = {
        method :"GET",
        headers:{
          Authorization: process.env.REACT_APP_PEXELS_API_KEY
        }
       }

       try {
         const response = await fetch(fetchUrl,options)
         const jsonResponse = await response.json()
         console.log(jsonResponse)
         setSimilarPhotos(jsonResponse.photos)
       }
       catch(error){
          console.log(error)
       }
    }

    useEffect (()=>{
      fetchSimilarPhotos()
    },[mainWords])
    
    
    const handleLike = () => {
    if (!isLiked){
            setIsLiked(true)
            const photoDetails = {...photoDetail,liked:true}
            const storedList = JSON.parse(localStorage.getItem('likedList'))
       
            localStorage.setItem('likedList',JSON.stringify(storedList))
        } 
        else{
            setIsLiked(false)
            const storedList = JSON.parse(localStorage.getItem('likedList'))
            const newLikedList = storedList.filter(each=>{
                return each.id!==id
            })
            localStorage.setItem('likedList',JSON.stringify(newLikedList))
            
        }
    }

    const renderSimilarPhotos  = () => {
      
      return (
            <div className={Styles.similarPhotosBg}>
                {
                  similarPhotos.map(each=>{
                  
                    const {id} = each 
                    const likedList = JSON.parse(localStorage.getItem('likedList'))
                    const liked = likedList.some(p=>p.id===each.id)
                    const photo = {...each,liked}
                    return <Photo key= {id} photo={photo}/>
                  })
                }      
           </div>
      )
    }
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
                    }} className={Styles.photo} src={src.original} alt={alt}  style={{background:imgLoaded? 'transparent' : avg_color,width:width>4000 ? '65%' :'35%'}}/>
                    
                    <div  className={Styles.likeAndDownload} style={{width:width>4000 ? '65%' :'35%', height:60}}>
                          <div className={Styles.authorAndLike}>
                             {isLiked?<MdFavorite className={Styles.liked} onClick={handleLike}/> : <MdFavoriteBorder className={Styles.like} onClick={handleLike}/>}
                             
                             <h1 className={Styles.author}>By {photographer}</h1>
                          </div>

                          <button className={Styles.downloadCta}>Download</button>
                    </div>
                     
                    <p className={Styles.similarPara} style ={{fontWeight:900,fontSize:'1.3em' ,marginTop:'100px',marginBottom:0}}>Similar Collections !</p>
                    
                    {similarPhotos? renderSimilarPhotos():null}
                 </div>)
             }
            
         </>
    )
}

export  default PhotoDetail 