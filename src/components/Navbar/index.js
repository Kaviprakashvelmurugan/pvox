import Styles from './index.module.css'

const NavBar = () =>{
    const PVOX_LOGO  = process.env.REACT_APP_PVOX_LOGO
    return (
        <div className={Styles.navBg}>
            <div className={Styles.navLogo}>
                 <img src={PVOX_LOGO} alt='pvox-logo' />
            </div> 
            <div className={Styles.navLogin}>
                 <p>Explore</p>
                 <button>Login</button>
            </div>
        </div>
    )
}

export default NavBar;