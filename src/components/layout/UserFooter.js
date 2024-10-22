import React from "react";
import {Link} from "react-router-dom";
import SocialShare from "../SocialShare";

const UserFooter = () => {

    return (
        <>  
            <footer className="bg-light text-dark" >
                <div className="container py-md-1">
                    <div className="row justify-content-md-between">
                        <div className="col-md-4 col-sm-12">
                            <h2 className=" mb-4 text-secondary"> Sierra JPA</h2>
                            <ul className="footer-links nav mt-5">
                                <li className="mb-1">
                                    <Link to={'#'} className="link-secondary text-decoration-underline"><p>Privacy</p></Link>
                                </li>
                                <li className="mb-1">
                                    <Link to={'#'} className="link-secondary text-decoration-underline"><p>Security</p></Link>
                                </li>
                                <li className="mb-1">
                                    <Link to={'#'} className="link-secondary text-decoration-underline"><p>Terms</p></Link>
                                </li>
                                <li className="mb-1">
                                    <Link to={'#'} className="link-secondary text-decoration-underline"><p>Cookies</p></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-12 text-center">
                            <SocialShare/>
                            <p class="text-secondary">Spread the word!</p>
                        </div>
                        <div className="col-md-4 col-sm-12 text-end">
                            <p className="mb-4 text-secondary footer-contact">
                                (123) - 456 - 7890<br/>
                                email@contact.com
                            </p>
                            <div className="mt-5">
                                <p className="text-secondary">@ResilientSierra all rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default UserFooter;
