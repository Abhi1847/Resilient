import React from "react";
import {Link} from "react-router-dom";

const Analysis = (props) => {
    function navigateToFindProperty() {
        return props.navigateFindProperty();
    }

    return (
        <>
            <section id="map-section">
                <div className="container-fluid p-0 m-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="position-absolute p-5 bg-dark shadow-lg map-box2">
                                <div className=" mt-4 mb-3">
                                    <address className="mb-3">
                                        <h1 className="text-light">Free Analysis </h1>
                                        <p className="text-light">of the Woody Biomass Feedstock that could be removed from your property.</p>
                                    </address>
                                    <button href="/" onClick={() => navigateToFindProperty()}
                                          className="btn btn-outline-light">
                                        TRY NOW
                                    </button>
                                </div>
                            </div>
                            <div className="embed-responsive">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <div className="iframe-container">
                                            <img src={'/img/analyze_map.png'} alt="..." width="100%" height="500"/>
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

export default Analysis;
