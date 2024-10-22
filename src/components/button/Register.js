import React from "react";
import {useDispatch} from "react-redux";
import {openRegisterModal} from "../../redux/actions/other";

const SignUpButton = ({type = 'default'}) => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(openRegisterModal(true));
    };

    return (
        <button onClick={() => openModal()}
                className={`${type === 'default' ? 'btn btn-primary' : 'btn btn-primary1  text-uppercase'}`}>GET STARTED NOW</button>
    );
};

export default SignUpButton;
