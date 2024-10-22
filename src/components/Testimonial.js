import React from "react";
import SignUpButton from "./button/Register";

const Testimonial = () => {

    return (
        <>
            {/*--Portfolio Grid--*/}
            <section className="page-section" id="portfolio" style={{backgroundColor: '#26221D'}}>
                <div className="container-fluid">
                    <div className="container pt-4 text-light">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-lg-4 col-12  single-item">
                                 <h2 className="text-light">Check out what other land owners have to say</h2> {/* style={{fontSize: '45px'}} */}
                                <p className="text-primary">We know it can be hard to trust a new program like
                                    ours, so that’s why you should listen to users who already experienced benefits</p>
                                <SignUpButton type={'dark'}/>
                            </div>

                            <div className="col-md-8 col-sm-12 col-lg-8 col-12 ">
                                <div className="user-cards col-md-4 col-sm-12 col-12 p-4 ">
                                    <div className="item mb-2">
                                        <div className="thumb">
                                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="Thumb"/>
                                        </div>
                                        <div className="info p-3">
                                            <span className="message">
                                                <h1 className="fa-solid fa fa-quote-left"/>
                                            </span>
                                            <b className="mb-0 text_overflow_hide">It needs to be done, and this is the best way available.</b>
                                            <p className="mb-0 text-secondary" title="name">Areal Person</p>
                                            <i className="text-secondary">Tuolumne County</i>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-cards col-md-4 col-sm-12 col-12 p-4 ">
                                    <div className="item mb-2">
                                        <div className="thumb">
                                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="Thumb"/>
                                        </div>
                                        <div className="info p-3">
                                            <span className="message">
                                                <h1 className="fa-solid fa fa-quote-left"/>
                                            </span>
                                            <b className="mb-0 text_overflow_hide">I'd reccommend Resilient Sierra to all forest land owners</b>
                                            <p className="mb-0 text-secondary">Clark Kent</p>
                                            <i className="text-secondary">Metropolis County</i>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-cards col-md-4 col-sm-12 col-12 p-4">
                                    <div className="item mb-2">
                                        <div className="thumb">
                                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="Thumb"/>
                                        </div>
                                        <div className="info p-3 ">
                                          <span className="message">
                                              <h1 className="fa-solid fa fa-quote-left"/>
                                          </span>
                                            <b className="mb-0 text_overflow_hide">I'm enrolling my own property in the program, it works</b>
                                            <p className="mb-0 text-secondary">Bruce Wayne</p>
                                            <i className="text-secondary">Gotham County</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
