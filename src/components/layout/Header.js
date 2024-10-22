import React from "react";
import {useLocation} from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import OtherPageHeader from "./OtherPageHeader";
import {useDispatch, useSelector} from "react-redux";
import $ from "jquery";

$(window).scroll(function () {
    if ($(window).scrollTop() >= 30) {
        $('nav').addClass('shadow-header');
    } else {
        $('nav').removeClass('shadow-header');
    }
});

const Header = () => {
    const {pathname} = useLocation();
    const {isLoggedIn, user} = useSelector(state => state.auth);

    return (
        isLoggedIn ?
        pathname === "/" || pathname === "/home" || pathname === "/about" ? <HomePageHeader/> : <OtherPageHeader/>
        : <HomePageHeader/>
    )
};

export default Header;
