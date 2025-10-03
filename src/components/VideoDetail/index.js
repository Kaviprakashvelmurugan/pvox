
import Styles from './index.module.css'

import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import Navbar from '../Navbar'
import PvoxLoader from '../PvoxLoader'
import Error404 from '../Error404'
import Footer from '../Footer'

const VideoDetail = () => {
    
    const apiStatusObj = {
      loading:'loading',
      success:'success',
      failed:'failed'
    }
    
    const [videoDetail,setVideoDetail] = useState({})
    const [isLiked,setIsLiked]  = useState(false)
    const [apiStatus,setApiStatus] = useState(apiStatusObj.loading)
    
    const {videoId} = useParams()
    const fetchVideoDetail= async() =>{
      const fetchUrl = `https://api.pexels.com/videos/videos/${videoId}`
      const options = {
        method:'GET',
        headers:{
            Authorization:process.env.REACT_APP_PEXELS_API_KEY
        }
      }

      try{
        const response = await fetch(fetchUrl,options)
        const jsonResponse = await response.json()
        if (response.ok){
            setVideoDetail(jsonResponse)
            setApiStatus(apiStatusObj.success)
        }
       
      }
      catch(error){
        setApiStatus(apiStatusObj.failed)
        console.log(error)
      }
    }
    useEffect(()=>{
        fetchVideoDetail()
    },[])


     useEffect(() => {
     if (Object.keys(videoDetail).length > 0) {
     const likedList = JSON.parse(localStorage.getItem('likedList')) || [];
     setIsLiked(likedList.some(p => p.id === videoDetail.id));
     }
    }, [videoDetail]);

    const {id,video_files,user,width,height} = videoDetail;
    console.log('width' , width)
    console.log('height',height)
    const handleLike = () => {
    if (!isLiked){
            setIsLiked(true)
            const storedList = JSON.parse(localStorage.getItem('likedList')) || []
            storedList.push({...videoDetail, liked: true,type:'video'}); 
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


    const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
    const renderSuccessView = () =>{ 
      if(Object.keys(videoDetail).length>0){
         return <div className={Styles.videoBox}>
               <video autoPlay playsInline muted loop style={{width:height>3000 ? '30%' :'70%',aspectRatio:`${width}/${height}`}}><source src={video_files[0].link}  ></source> Video</video>

                <div  className={Styles.likeAndDownload} style={{width:height>3000 ? '90%' :'90%', height:60}}>
                          <div className={Styles.authorAndLike}>
                             {isLiked?<MdFavorite className={Styles.liked} onClick={handleLike}/> : <MdFavoriteBorder className={Styles.like} onClick={handleLike}/>}
                             
                             <h1 className={Styles.author}>By {user.name}</h1>
                          </div>

                          <button className={Styles.downloadCta} onClick={()=>{
                            handleDownload(video_files[0].link,'Pvox-video.mp4')
                          }}>Download</button>
                    </div>
          </div>
      }
    }

    

    const renderSwitcher  = () => {
      switch(apiStatus){
        case apiStatusObj.loading:
          return <PvoxLoader/>
        case apiStatusObj.success:
          return renderSuccessView()
        default:
           return <Error404/>
      }
    }
    return (
      <>
        <Navbar/>
        {renderSwitcher()}
        <Footer/>
      </>
    )
}


export default VideoDetail