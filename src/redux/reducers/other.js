import {OPEN_REGISTER_MODAL, OPEN_LOGIN_MODAL, OPEN_VERIFY_EMAIL_MODAL, OPEN_FORGOT_PASSWORD_MODAL,
    OPEN_RESET_PASSWORD_MODAL, SELECTED_GEO, LOADING, PROPERTY_LOADING, SELECTED_PROPERTY, SELECTED_USER_PROPERTY} from "../actions/types";

const initialState = {
    isOpenRegisterModal: false, isOpenLoginModal: false, isOpenVerifyEmailModal: false, isOpenForgotPasswordModal: false, isOpenResetPasswordModal: false,
    selectedGeo: '', selectedProperty: {}, isLoading: false, isPropertyLoading: false, selectedUserProperty: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case OPEN_REGISTER_MODAL:
            return {...state, isOpenRegisterModal: payload};

        case OPEN_LOGIN_MODAL:
            return {...state, isOpenLoginModal: payload};

        case OPEN_VERIFY_EMAIL_MODAL:
            return {...state, isOpenVerifyEmailModal: payload};

        case OPEN_FORGOT_PASSWORD_MODAL:
            return {...state, isOpenForgotPasswordModal: payload};

        case OPEN_RESET_PASSWORD_MODAL:
            return {...state, isOpenResetPasswordModal: payload};

        case SELECTED_GEO:
            return {...state, selectedGeo: payload};

        case SELECTED_PROPERTY:
            return {...state, selectedProperty: payload};

        case LOADING:
            return {...state, isLoading: payload};

        case PROPERTY_LOADING:
            return {...state, isPropertyLoading: payload};

        case SELECTED_USER_PROPERTY:
            return {...state, selectedUserProperty: payload};

        default:
            return state;
    }
}
