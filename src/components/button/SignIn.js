import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openLoginModal} from "../../redux/actions/other";
import {logout} from "../../redux/actions/auth";

const SignInButton = ({type = 'default'}) => {

    const dispatch = useDispatch();
    const {isLoggedIn, user} = useSelector(state => state.auth);

    const openModal = () => {
        dispatch(openLoginModal(true));
    };

    const loggedOut = () => {
        dispatch(logout());
    };

    return (
        isLoggedIn ?
            <button onClick={() => loggedOut()} type="button" className={`btn btn-outline-${type === 'default' ? 'light' : 'dark'} text-uppercase`}>SIGN OUT</button> :
            <button onClick={() => openModal()} type="button" className={`btn btn-outline-${type === 'default' ? 'light' : 'dark'} text-uppercase`}>SIGN IN</button>
    );
};

export default SignInButton;
