import Styles from './index.module.css'

const PvoxLoader = () => {
    return (
        <div className={Styles.pvoxLoader}>
                <video  className={Styles.loaderVideo} autoPlay playsInline muted loop ><source src='https://res.cloudinary.com/dysrfxfyv/video/upload/v1757648438/pvox_loader_znjooh.mp4' /> Loading. </video>
        </div>
    )
}

export default PvoxLoader