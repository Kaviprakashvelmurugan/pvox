import Styles from './index.module.css'

import { GiCardboardBox } from "react-icons/gi";
import { MdImageSearch } from "react-icons/md";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFire } from "react-icons/fa6";

const Filters = () => {
   return (
        <>
         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <GiCardboardBox/> 
             </div>
             <button className={Styles.filterButton}>All</button>
         </div>

         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <MdImageSearch/> 
             </div>
             <button className={Styles.filterButton}>Images</button>
         </div>

         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <MdOutlineVideoCameraBack/> 
             </div>
             <button className={Styles.filterButton}>Videos</button>
         </div>


         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <MdFavoriteBorder/> 
             </div>
             <button className={Styles.filterButton}>Favorites</button>
         </div>

         <div className={Styles.filterItem}>
             <div className={Styles.filterIcon}>
                 <FaFire/> 
             </div>
             <button className={Styles.filterButton}>Trending</button>
         </div>
        </>
   )
}

export default Filters