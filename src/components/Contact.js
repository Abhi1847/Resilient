import React from "react";
import SignUpButton from "./button/Register";
import SignInButton from "./button/SignIn";

const Contact = () => {
    return (
        <>
            <section className="page-section" id="contact" style={{backgroundColor: '#26221D'}}>
                <div className="container text-light">
                    <div className="row text-center ">
                        <div className="col-md-12 col-12 col-sm-12">
                            <h1>Ready to experience the benefits?</h1>
                            <div>
                                <SignUpButton/>&nbsp;
                                <SignInButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
