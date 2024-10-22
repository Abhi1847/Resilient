import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addComment} from "../../redux/actions/other";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const Comment = ({open, onClose, email = '', comment = '', property_id = ''}) => {

    const dispatch = useDispatch();
    const [sending, setSending] = useState(false);

    const closeModal = (event, reason) => {
        if (reason && reason === "backdropClick" && "escapeKeyDown")
            return;
        onClose(false);
    };

    const initialValue = {email: email, comment: comment, property_id: property_id};
    const commentSchema = Yup.object().shape({
        comment: Yup.string().required("Required")
    });

    const handleSubmit = (values) => {
        setSending(true);
        dispatch(addComment(values))
            .then((data) => {
                setSending(false);
                onClose(true);
            })
            .catch(() => {
                setSending(false);
            });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'xs'}
            open={open}
            onClose={() => closeModal(false)}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Add comment
                            <IconButton
                                className={'float-end p-0'}
                                color="inherit"
                                onClick={closeModal}
                                aria-label="close">
                                <CloseIcon />
                            </IconButton></h4>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={commentSchema}
                            onSubmit={handleSubmit}>
                            {({errors, touched, isValidating}) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <Field component="textarea" name="comment" placeholder="Comment" rows="5" cols="50"
                                                       className={`form-control ${touched.comment && errors.comment ? "is-invalid" : ""}`}/>
                                                <ErrorMessage component="div" name="comment" className="invalid-feedback"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            {sending ?
                                                <LoadingButton
                                                    endIcon={<SendIcon />}
                                                    className="mb-3 w-100"
                                                    loading
                                                    loadingPosition="end"
                                                    variant="contained">
                                                    SENDING...
                                                </LoadingButton> :
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mb-3 w-100">
                                                    SEND
                                                </button>}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Comment;
