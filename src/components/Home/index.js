import {Component} from 'react'
import Navbar from '../Navbar'
import Filters from '../Filters'
import { FaSearch } from "react-icons/fa";
import Photo from '../Photo'
import Video from '../Video'
import Error404 from '../Error404'
import Pagination from '../Pagination'
import Footer from '../Footer'

import { IoMdArrowDropdown } from "react-icons/io";


import Styles from './index.module.css'


class Home extends Component{

    apiStatusObj= {
      initial:'initial',
      loading:'loading',
      success:'success',
      failure:'failed',
      favorites:'favorites',
      noResults:'no-results'

    }

    state  = {
                photos:[] ,
                videos:[] ,
                searchInput:'' ,
                filterBy:'v1' , 
                page:1,
                maxPage:0,
                apiStatus:this.apiStatusObj.loading ,
                
            }

    
    
    componentDidMount(){
      this.fetchFromPexels()
       if (!localStorage.getItem('likedList')) {
        localStorage.setItem('likedList', JSON.stringify([]))
      }
    }

   fetchFromPexels = async () => {
      const { searchInput, filterBy, page } = this.state;
      if (filterBy==='favorites'){
         this.setState({ apiStatus: this.apiStatusObj.favorites });
         return;
      }
     // Default query if search input is empty
      let fetchUrl = `https://api.pexels.com/${filterBy}/search?query=${searchInput || 'nature'}&page=${page}&per_page=21`;
    
      if (filterBy==='trending'){
  
        fetchUrl=`https://api.pexels.com/v1/curated?page=${page}`
      }


      const options = {
         method: 'GET',
         headers: {
             Authorization: process.env.REACT_APP_PEXELS_API_KEY
         }
       };

      try {
           this.setState({ apiStatus: this.apiStatusObj.loading });
           const responseFromPexels = await fetch(fetchUrl, options);
           
      if (!responseFromPexels.ok) {
          console.log('API failed with status:', responseFromPexels.status);
          this.setState({ photos: [], videos: [], apiStatus: this.apiStatusObj.failure });
          return;
      }

      const response = await responseFromPexels.json();
      const maxPages = Math.ceil(response.total_results / response.per_page)

       
    if (filterBy === 'v1') {
       if (!response.photos || response.photos.length === 0) {
          this.setState({ photos: [], videos: [], apiStatus: this.apiStatusObj.failure });
          return;
        }
        this.setState({ photos: response.photos, maxPage:maxPages, apiStatus: this.apiStatusObj.success });
     }

    else if (filterBy === 'trending') {
       if (!response.photos || response.photos.length === 0) {
          this.setState({ photos: [], videos: [], apiStatus: this.apiStatusObj.failure });
          return;
       }
       this.setState({ photos: response.photos, maxPage:maxPages,apiStatus: this.apiStatusObj.success });
    }

    else if (filterBy === 'videos') {
     
       if (!response.videos || response.videos.length === 0) {
         this.setState({ photos: [], videos: [], apiStatus: this.apiStatusObj.failure });
       return;
    }
     this.setState({ videos: response.videos,maxPage:maxPages, apiStatus: this.apiStatusObj.success });
   }

    } 
    catch (error) {
       console.log('Network or JSON error:', error);
       this.setState({ photos: [], videos: [], apiStatus: this.apiStatusObj.failure },()=>{
    });
  }
};



    handleSearch = event => {
        this.setState({searchInput:event.target.value,page:1}, ()=>{
          this.fetchFromPexels()
        })
    }

    filteringFunction = filter => {
        this.setState({filterBy:filter} , ()=>{
        this.fetchFromPexels()
       })
    }

   handleNextPage = nextPage => {
    this.setState({page:nextPage},this.fetchFromPexels)
   }

    showPvoxLoader = () => {
         return (
             <div className={Styles.pvoxLoader}>
                <video  className={Styles.loaderVideo} autoPlay playsInline muted loop ><source src='https://res.cloudinary.com/dysrfxfyv/video/upload/v1757648438/pvox_loader_znjooh.mp4' /> Loading. </video>
             </div>
          )
         }


    show404 = ()=>{
      return <Error404/>
  
    }


    showImagesOrVideos = () => {
      const {photos,videos,filterBy,page,maxPage} = this.state
          return (
            <>
                  {filterBy==='trending' ? <p className={Styles.trendingPara}>Handpicked trending collections !</p>:null}
                   <ul className={`${ filterBy==='v1' || filterBy==='trending' ? Styles.photoApiBox : Styles.videoApiBox}`}>
                         
                        {(filterBy==='v1' || filterBy==='trending') && photos.length>0 && photos.map(each=>{
                           if (!each || !each.id) return null;   // skip bad/null entries

                             const likedList = JSON.parse(localStorage.getItem('likedList')) || [];
                             const liked = likedList.some(p => p && p.id === each.id);
                             const photo = {...each, liked, type: "photo"};
                             return <Photo key={each.id} photo={photo} />
                             })
                        }
                        {
                        
                        videos.length>0 && videos.map(each=>{
                        if (!each || !each.id) return null;

                       const likedList = JSON.parse(localStorage.getItem('likedList')) || [];
                       const liked = likedList.some(p => p && p.id === each.id);
                       const video = {...each, liked, type: "video"};
                       return <Video key={each.id} video={video}/>
                       })
                        }

                       
                  </ul>

                  <Pagination currentPage={page} maxPages = {maxPage} handleNextPage = {this.handleNextPage}/>
            </>
             
      )
    }


    showFavorites = () => {
       const likedData = JSON.parse(localStorage.getItem('likedList'))
       console.log(likedData)
       if (likedData.length===0){
          return <div className={Styles.nothingLikedBg}>
                     <video autoPlay playsInline loop muted><source src='https://res.cloudinary.com/dysrfxfyv/video/upload/v1757753739/Screen_Recording_2025-09-13_142024_pax4l9.mp4' type="video/mp4"/> No liked Data Available.</video>
                     <p>You haven’t liked any Media yet. </p>
                </div>
       }
       
       
       return <>
                 <div className={Styles.favoritesHeader}>
                    <p>Your Hearted Media Hub.</p>
                  </div>

                  <ul className={Styles.likedDataBg}>
                     {likedData.map(each=>{
                      if (!each) return null;
                     if (each.type === 'video'){
                       return <Video key={each.id} video={each}/>
                     }
                
                    return each ? <Photo key={each.id} photo={each} /> : null;
                    })}
                  </ul>

              </>
    }
    renderSwitcher = () =>{
      const {apiStatus} = this.state
      switch (apiStatus){
        case this.apiStatusObj.success:
          return this.showImagesOrVideos()
        case this.apiStatusObj.favorites:
          return this.showFavorites()
        case this.apiStatusObj.loading:
          return this.showPvoxLoader();
        case this.apiStatusObj.failure:
          return this.show404()
        default:
          return null;
      }
    }

    render(){
        const {searchInput} = this.state

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
                       <form className={Styles.SearchAndFilterBox} onSubmit={event => {
                                        event.preventDefault();
                                        this.fetchFromPexels();
                        }}> 
                          <div className={Styles.filtersWrapper}>
                             <select onChange = {event=>{
                                this.filteringFunction(event.target.value)
                             }} className={Styles.filtersCta}>
                                <option value='v1'> images</option>
                                <option value='videos'>videos</option>
                                <option value='favorites' >favorites</option>
                                <option value='trending'>trending</option>
                             </select>
                             <IoMdArrowDropdown className={Styles.filtersIcon}/>
                            </div>
                            <div className={Styles.searchBox}>
                               <input value ={searchInput} onChange = {this.handleSearch} placeholder='Search for free HD photos and videos...' type='text' />
                              <FaSearch />
                            </div>
                     </form>  
                      {this.renderSwitcher()}

                  </div>
              </div>

              <Footer/>
            </div>
        )
    }
}

export default Home