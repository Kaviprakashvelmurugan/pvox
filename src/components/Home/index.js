import {Component} from 'react'
import Navbar from '../Navbar'
import Filters from '../Filters'
import { FaSearch } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";

import Styles from './index.module.css'
class Home extends Component{
    render(){

        return (
            <div className={Styles.homeBg}>
              <Navbar/>
              <div className={Styles.homeContentBg}>
                  <div className={Styles.filterBox}>
                        {
                            <Filters/>
                        }
                  </div>

                  <div className={Styles.mainBox}>
                       <div className={Styles.SearchAndFilterBox}> 
                           <button className={Styles.filtersCta}>
                                <MdOutlineSort/>
                                Filter
                           </button>
                            <div className={Styles.searchBox}>
                               <input placeholder='Search for free HD photos and videos...' type='text' />
                              <FaSearch/>
                            </div>
                     </div>
                    
                     <div className={Styles.demo}>
                        
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default Home