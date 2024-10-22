import React from "react";
import {useSelector} from "react-redux";
import JPAFooter from "./JPAFooter";
import UserFooter from "./UserFooter";

const Footer = () => {

    const {user} = useSelector((state) => state.auth);

    return (
        // user ? user.user_type === "user" ? <UserFooter/> : <JPAFooter/> : <JPAFooter/>
        user ? user.user_type === "user" ? <UserFooter/> : <></> : <JPAFooter/>
    )
};

export default Footer;
