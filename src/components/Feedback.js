import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import FeedbackIcon from '@mui/icons-material/Feedback';
import {addFeedback} from "../redux/actions/other";

const Feedback = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const initialValue = {first_name: '', last_name: '', phone: '', email: '', comment: ''};
    const [feedbackInitialValue, setFeedbackInitialValue] = useState(initialValue);

    useEffect(() => {
        if (user) {
            setFeedbackInitialValue({email: user['email']});
        }
    }, [user]);

    const openFeedback = () => {
        setOpen(true);
    };

    const closeFeedback = () => {
        setOpen(false);
    };

    const feedbackSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Required"),
        comment: Yup.string().required("Required")
    });

    const handleSubmit = (values) => {
        setSending(true);

        dispatch(addFeedback(values))
            .then(() => {
                closeFeedback();
                setSending(false);
            })
            .catch(() => {
                setSending(false);
            });
    };

    return (
        <>
            <button className="open-button rounded-circle" title={'Give feedback'} onClick={() => openFeedback()}>
                <FeedbackIcon/>
            </button>

            <div className={`chat-popup ${open ? '' : 'd-none'}`} id="myForm">
                <div className="feedback-container">
                    <Formik
                        initialValues={feedbackInitialValue}
                        validationSchema={feedbackSchema}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}>
                        {({errors, touched, isValidating}) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        Send your feedback
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="row">
                                            <div className="col-md-6" style={{paddingRight: 0}}>
                                                <div className="form-group">
                                                    <Field name="first_name" placeholder="First name" className={`form-control`}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Field name="last_name" placeholder="Last name" className={`form-control`}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <Field name="phone" placeholder="Phone" className={`form-control`}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <Field name="email" placeholder="Email"
                                                   disable={user}
                                                   className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <Field component="textarea" name="comment" placeholder="Message" rows="5" cols="50"
                                                   className={`form-control ${touched.comment && errors.comment ? "is-invalid" : ""}`}/>
                                        </div>
                                    </div>
                                    {/*<div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <input type={'file'} className={'form-control'}/>
                                        </div>
                                    </div>*/}
                                    <div className="col-md-12">
                                        <div className={'d-flex'}>
                                            <button
                                                disabled={sending}
                                                type="submit"
                                                className="btn btn-primary">
                                                {sending ? 'Sending...' : 'Send'}
                                            </button>
                                            <button type="button" className="btn cancel" onClick={() => closeFeedback()}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Feedback;
