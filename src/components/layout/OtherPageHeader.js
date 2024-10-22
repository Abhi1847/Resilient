import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const OtherPageHeader = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const [profileImage, setProfileImage] = useState('');
    const dummyImage = 'https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png';

    useEffect(() => {
        if(user && user.img_url && user.img_url.includes("https://dxhub-woodybiomass-user-assets")) {
            setProfileImage(user.img_url);
        }
    }, [user]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top diff_nav" id="mainNav">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand" id="logoRS-nav-link" >
                        <div>
                            <img className="logo_w" src={"/img/Logo.svg"} height="22px" alt=""/>
                            <img className="logo_black" src={"img/logo_white.svg"} height="22px" alt=""/>
                        </div>
                        <div id="logoRS-text">
                            RESILIENT SIERRA
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa fa-bars ms-1"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-5 py-4 py-lg-0 ms-auto">
                            {/* <li className={`nav-item ${location?.pathname === '/about' ? 'active' : ''} `}>
                                <Link to={"about"} className={`nav-link`}> ABOUT </Link>
                            </li> */}

                            <li className="nav-item">
                                <Link to={"/"} className={`nav-link`}> Land Manager </Link> {/* Previously known as DASHBOARD */}
                            </li>
                            <li className={`nav-item ${location?.pathname === '/map' ? 'active' : ''} `}>
                                <Link to={"map"} className={`nav-link`}> Land Map </Link>
                            </li>
                            <li className={`nav-item ${location?.pathname === '/about' ? 'active' : ''} `}>
                                <Link to={"/"} className={`nav-link`}> Learn More </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse nav-links-other nav-profile" id="navbarResponsive">
                        <ul className="navbar-nav">
                            <li className=" dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="user_drop" src={profileImage ? profileImage : dummyImage} alt="username"/>
                                </a>
                                {isLoggedIn && <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to={"/"} className={`dropdown-item`} onClick={() => dispatch(logout())}>
                                            <LogoutIcon/> Logout
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/account"} className={`dropdown-item`}>
                                            <PersonIcon/> Account details
                                        </Link>
                                    </li>
                                </ul>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default OtherPageHeader;
