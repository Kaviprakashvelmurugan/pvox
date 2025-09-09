import {Component} from 'react'
import Navbar from '../Navbar'
import Filters from '../Filters'
import { FaSearch } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Photo from '../Photo'
import Video from '../Video'

import Styles from './index.module.css'
class Home extends Component{

    state  = { photos:[] ,videos:[] ,searchInput:'' ,filterBy:'v1'}
    componentDidMount(){
      this.fetchFromPexels()
    }

    fetchFromPexels = async () => {
      const {searchInput,filterBy} = this.state
       
      let fetchUrl = `https://api.pexels.com/${filterBy}/search?query=${searchInput}&per_page=21`
  
      if (searchInput===''){
         fetchUrl = `https://api.pexels.com/${filterBy}/search?query=nature&per_page=21`
      }
      
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

        this.setState(prev=>{
          if (filterBy==='v1'){
                const photosFromPexels = response.photos
                this.setState({photos:photosFromPexels})
          }
          else{
                console.log('yesss')
                const videosFromPexels = response.videos
                this.setState({videos:videosFromPexels})
          }
        })
       }
      }

      catch(error){
        console.log(error)
      }
    }


    handleSearch = event => {
        this.setState({searchInput:event.target.value}, ()=>{
          this.fetchFromPexels()
        })
    }

    filteringFunction = filter => {
       this.setState({filterBy:filter} , ()=>{
        this.fetchFromPexels()
       })
    }


    render(){
        const {photos,videos,searchInput,filterBy} = this.state

        return (
            <div className={Styles.homeBg}>
              <Navbar/>
              <div className={Styles.homeContentBg}>
                  <div className={Styles.filterBox}>
                        {
                            <Filters filteringFunction= {this.filteringFunction}/>
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
                              <FaSearch />
                            </div>
                     </form>
                     
                     <ul className={`${ filterBy==='v1' ? Styles.photoApiBox : Styles.videoApiBox}`}>
                        
                        {filterBy==='v1' && photos.length>0 && photos.map(each=>{
                            return <Photo  photo={each}  />
                        })}

                        {
                        
                        videos.length>0 && videos.map(each=>{
                          
                          return <Video video={each}/>
                        })
                        }
                     </ul>
                  </div>
              </div>
            </div>
        )
    }
}

export default Home