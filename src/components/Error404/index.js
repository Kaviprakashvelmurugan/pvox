import Styles from './index.module.css'

const Error404 = () =>{
    return (
        <div className={Styles.pvoxErrorBg}>
             <h1 className={Styles.errorText} >Error</h1>
             <video  className={Styles.errorVideo} autoPlay playsInline loop muted> <source src='https://res.cloudinary.com/dysrfxfyv/video/upload/v1757686221/404-pvox_qfgiqq.mp4'  /> 404 </video>
        </div>
      )
}

export default Error404