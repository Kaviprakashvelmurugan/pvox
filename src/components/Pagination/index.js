import Styles from './index.module.css'

import { MdOutlineMoreHoriz } from "react-icons/md";

const Pagination = ({currentPage,maxPages,handleNextPage}) => {

    let pageList =[]
    if (maxPages<=5){
        for(let i=1; i<=maxPages;i++) {
          pageList.push(i)
        }
    }
    else{
        pageList=[]
        if (maxPages>=5 && currentPage <3){
          pageList=[1,2,3,<MdOutlineMoreHoriz/>,maxPages]
        }
        else if (currentPage>=3 && currentPage < (maxPages-2)){
            pageList  = [1,<MdOutlineMoreHoriz/>]
            for(let i = currentPage; i<= currentPage+2 ; i++){
                pageList.push(i)
            }
            pageList = [...pageList,<MdOutlineMoreHoriz/>,maxPages]
        }

        else {
            pageList = [1,<MdOutlineMoreHoriz/>]
            for (let i =maxPages -2; i<=maxPages ;i++){
                pageList.push(i)
            }
        }
    }
 


    const handlePageButtonClick = event => {
        handleNextPage(Number(event.target.id))
    }

    return (
        <ul className={Styles.paginationBg}>
            {
                pageList.map(each=>{
                  
                    if (typeof each==='number'){
                      return <button id ={each} onClick={handlePageButtonClick} key={each} className={`${currentPage===each? Styles.clickedButton:Styles.unClickedButton}`} >{each}</button>
                    }
                    else{
                        return <span>{each}</span>
                    }
                })
            }
        </ul>
    )
}

export default Pagination