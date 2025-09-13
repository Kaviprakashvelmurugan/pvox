import Styles from './index.module.css'
import {useState} from 'react'

import { GiCardboardBox } from "react-icons/gi";
import { MdImageSearch } from "react-icons/md";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFire } from "react-icons/fa6";


const Filters = ({filteringFunction}) => {
   
   const [filterState,setFilterState] = useState({photos:true,videos:false,trending:false,favorites:false})

   const handleFilterClick = event => {
       
         setFilterState(prev=>{
            if (event.target.id==='videos'){
                filteringFunction(event.target.id)
                return {photos:false,videos:true,trending:false,favorites:false}
            }
            else if (event.target.id==='photos'){
                filteringFunction('v1')
                return {photos:true,videos:false,trending:false,favorites:false}
            }
            else if (event.target.id==='favorites'){
                filteringFunction('favorites')
                return {photos:false,videos:false,trending:false,favorites:true}
            }
            else{
                filteringFunction('trending')
                return {photos:false,videos:false,trending:true,favorites:false}
            }
         }) 
   } 


   

   return (
        <>
         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <GiCardboardBox/> 
             </div>
             <button 
                className={Styles.filterButton}
                >All
            </button>
         </div>

         <div className={Styles.filterItem}>
             <div className={`${ filterState.photos ? Styles.turnPink : null} ${Styles.filterIcon}`}>
                 <MdImageSearch/> 
             </div>
             <button 
                onClick = {handleFilterClick}
                id='photos'
                className={`${ filterState.photos ? Styles.turnPink : null} ${Styles.filterButton}`}>
                Images
            </button>
         </div>

         <div className={Styles.filterItem}>
             <div className={`${Styles.filterIcon} ${filterState.videos?Styles.turnPink:null}`}>
                 <MdOutlineVideoCameraBack/> 
             </div>
             <button
                className={`${ filterState.videos ? Styles.turnPink : null} ${Styles.filterButton}`}
                id='videos'
                onClick = {handleFilterClick}>
                videos
            </button>
         </div>


         <div className={Styles.filterItem}>
             <div className={`${Styles.filterIcon} ${filterState.favorites?Styles.turnPink:null}`}>
                 <MdFavoriteBorder/> 
             </div>
             <button 
               onClick = {handleFilterClick}
               id='favorites'
               className={`${ filterState.favorites ? Styles.turnPink : null} ${Styles.filterButton}`}>
               Favorites
             </button>
         </div>

         <div className={Styles.filterItem}>
             <div className={`${Styles.filterIcon} ${filterState.trending?Styles.turnPink:null}`}>
                 <FaFire/> 
             </div>
             <button 
                onClick = {handleFilterClick}
                id='trending'
                className={`${ filterState.trending ? Styles.turnPink : null} ${Styles.filterButton}`}>
                Trending
            </button>
         </div>
        </>
   )
}

export default Filters