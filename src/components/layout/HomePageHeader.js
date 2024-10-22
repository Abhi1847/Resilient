import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import SignUpButton from "../button/Register";
import SignInButton from "../button/SignIn";

const HomePageHeader = () => {
    const {isLoggedIn, user} = useSelector(state => state.auth);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
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
                        <ul className="navbar-nav ms-5 py-4 py-lg-0">
                            <li className="nav-item">
                                <Link to={"about"} className={`nav-link`}> About Us </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"map"} className={`nav-link`}> Land Map </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/"} className={`nav-link`}> Learn More </Link>
                            </li>

                            {isLoggedIn && (user.user_type === 'jpa' && user.user_type === 'lto') &&
                            <li className="nav-item">
                                <Link to={"admin-timeline"} className={`nav-link`}> Timeline </Link>
                            </li>}

                            {isLoggedIn && user.user_type === 'user' &&
                            <li className="nav-item">
                                <Link to={"user-timeline"} className={`nav-link`}> Timeline </Link>
                            </li>}

                        </ul>
                        <div className="ms-auto">
                            <SignInButton type={'dark'}/>
                            <SignUpButton/>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default HomePageHeader;
