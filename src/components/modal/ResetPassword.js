import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openLoginModal, openResetPasswordModal} from "../../redux/actions/other";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {reSendVerificationCode, resetPassword} from "../../redux/actions/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const {isOpenResetPasswordModal} = useSelector(state => state.other);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    const close = (event, reason) => {
        if (reason && reason === "backdropClick" && "escapeKeyDown")
            return;
        dispatch(openResetPasswordModal(false));
    };

    const initialValue = {email: localStorage.getItem('USERNAME_TO_CONFIRM'), password: '', code: ''};

    const resetPasswordSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address format").required("Required"),
        password: Yup.string().min(3, "Password must be 3 characters at minimum").required("Required"),
        code: Yup.string().required("Required")
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(resetPassword(values.email, values.password, values.code))
            .then(() => {
                setLoading(false);
                dispatch(openResetPasswordModal(false));
                dispatch(openLoginModal(true));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const resend = () => {
        setSending(true);
        dispatch(reSendVerificationCode(localStorage.getItem('USERNAME_TO_CONFIRM')))
            .then(() => {
                setSending(false);
            })
            .catch(() => {
                setSending(false);
            });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={false}
            id="popupDialog"
            open={isOpenResetPasswordModal}
            onClose={close}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent class="popup">
                <div class="flex-row exit-button">
                    <IconButton
                        className={"float-end p-0"}
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="flex-row">
                    <div className="popup-img">
                        {/* <img src={'/img/register_login_bg.png'} alt={'register-bg'} style={{width: '100%'}}/> */}
                    </div>
                    <div className="popup-content">
                        <div>
                            <h2>Reset password</h2>
                            <p>If an account exists for the provided address you'll receive an email with a reset code soon</p>
                            <Formik
                                initialValues={initialValue}
                                validationSchema={resetPasswordSchema}
                                onSubmit={handleSubmit}>
                                {({errors, touched, isValidating}) => (
                                    <Form className={'mt-5'}>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <Field
                                                        name="email"
                                                        render={({field}) => (
                                                            <input {...field} className={`form-control`} disabled={true} type="text" placeholder="Email address"/>
                                                        )}/>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <Field type={'password'} name="password" placeholder="New password"
                                                           className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}/>
                                                    <ErrorMessage component="div" name="password" className="invalid-feedback"/>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-1">
                                                <div className="form-group">
                                                    <Field name="code" placeholder="Code"
                                                           className={`form-control ${touched.code && errors.code ? "is-invalid" : ""}`}/>
                                                    <ErrorMessage component="div" name="code" className="invalid-feedback"/>
                                                </div>
                                            </div>
                                            {!sending ? <button onClick={resend} style={{cursor: 'pointer'}} id="resend-code" className='greenLinkBtn mb-5'>
                                                    {!sending ? 'Resend Code' : 'Sending ...'}
                                                </button> : 'Sending ...'}

                                            <div className="col-md-12">
                                                {loading ?
                                                    <LoadingButton
                                                        endIcon={<SendIcon />}
                                                        className="mb-3 w-100"
                                                        loading
                                                        loadingPosition="end"
                                                        variant="contained">
                                                        LOADING...
                                                    </LoadingButton> :
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary mb-3 w-100">
                                                        RESET PASSWORD
                                                    </button>}
                                                   
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ResetPassword;
