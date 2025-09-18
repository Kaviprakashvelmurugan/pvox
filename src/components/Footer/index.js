import Styles from './index.module.css'

import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaReadme } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
    return (
       <div className={Styles.footerBg}>
           <div className={Styles.footChild1}>
              <img className={Styles.footerLogo} src='https://res.cloudinary.com/dysrfxfyv/image/upload/v1758162158/pvox_logo-removebg-preview_rgyety.png' alt='pvox-logo'/>
               
               <div className={Styles.madeByBox}>
                  <p>Made by :</p>
                  <img className={Styles.footerKavi} src='https://res.cloudinary.com/dysrfxfyv/image/upload/v1758163235/Screenshot_2025-09-18_080627-removebg-preview_ogl4bs.png' alt='kaviprakash' />
               </div>


           </div>

           <div className={Styles.footChild2}>
              <p className={Styles.connect}>Connect with me</p>
              <a href="https://github.com/Kaviprakashvelmurugan " target="_blank" rel="noopener noreferrer"> <FaGithub/> <p>Github</p></a>
              <a href='/'> <FaLinkedinIn/> <p>Linkedin</p></a>
              <a href="mailto:kaviprakashvelmurugan@gmail.com"> <BiLogoGmail/> <p>Email</p></a>
            </div>

            <div className={Styles.footChild3}>
                 <div>
                      <p className ={Styles.child3Mail}>Kaviprakashvelmurugan@gmail.com</p>
                      <p className={Styles.phone}>+91 6374802067</p>
                 </div>

                 <a     href="https://github.com/Kaviprakashvelmurugan/pvox#readme" target="_blank" rel="noopener noreferrer" className={Styles.PvoxreadMe}> <FaReadme/> <p> Pvox Docs</p></a>
            </div>

            <div className={Styles.copyRights}>
            <p>  <FaRegCopyright/> Pvox 2025 — All rights reserved.</p>
            </div>
       </div>
    )
}

export default Footer