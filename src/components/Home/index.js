import {Component} from 'react'
import Navbar from '../Navbar'
import Filters from '../Filters'
import { FaSearch } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Photo from '../Photo'

import Styles from './index.module.css'
class Home extends Component{

    state  = { photos:[] ,searchInput:''}
    componentDidMount(){
         this.fetchFromPexels()
    }


    fetchFromPexels= async (event)=>{
    event.preventDefault()
      const {searchInput} = this.state
      const fetchUrl = `https://api.pexels.com/v1/search?query=${searchInput}&per_page=20`
      const options = {
        method:'GET',
        headers:{
            Authorization: process.env.REACT_APP_PEXELS_API_KEY
        }
      }

      try{
       const responseFromPexels = await fetch(fetchUrl,options)
       const response = await responseFromPexels.json()
       console.log(response)
       if (responseFromPexels.ok===true){
         const photosFromPexels = response.photos
         this.setState({photos:photosFromPexels})
       }
      }

      catch(error){
        console.log(error)
      }
    }


    handleSearch = event => {
        this.setState({searchInput:event.target.value})
    }
    render(){
        const {photos,searchInput } = this.state

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
                       <form className={Styles.SearchAndFilterBox} onSubmit={this.fetchFromPexels}> 
                           <button className={Styles.filtersCta}>
                                <MdOutlineSort/>
                                Filter
                           </button>
                            <div className={Styles.searchBox}>
                               <input value ={searchInput} onChange = {this.handleSearch} placeholder='Search for free HD photos and videos...' type='text' />
                              <FaSearch/>
                            </div>
                     </form>
                     
                     <ul className={Styles.apiBox}>
                        {photos.length>0 && photos.map(each=>{
                            return <Photo  photo={each}/>
                        })}
                     </ul>
                  </div>
              </div>
            </div>
        )
    }
}

export default Home