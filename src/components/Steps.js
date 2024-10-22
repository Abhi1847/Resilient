import React from "react";

const Steps = () => {

    return (
        <>
            {/*--Services--*/}
            <section id="services">
                <div className="container-fluid d-flex">
                    <div className="row text-center">
                        <div className="col-md-4 col-sm-12 col-lg-4 col-12">
                            <img src={"/img/detect.svg"} id="outerImg" alt=""/>
                            <h2 className="stepTitle"><span className="circle-no">1</span>Detect</h2>
                            <p className="text-secondary">Use high tech satellites to detect potential wildfire fuel, called biomass, on your land.</p>
                        </div>

                        
                        <img className="arrow_right" src={"/img/right_arrow.svg"} alt=""/>
                      

                        <div className="col-md-4 col-sm-12 col-lg-4 col-12 ">
                            <img src={"/img/remove.svg"} id="middleImg" alt=""/>
                            <h2 className="stepTitle"><span className="circle-no">2</span>Remove</h2>
                            <p className="text-secondary">We’ll find a team to collect the biomass and remove it at the lowest possible cost to you</p>
                        </div>

                        
                        <img className="arrow_right" src={"/img/right_arrow.svg"} alt=""/>
                        

                        <div className="col-md-4 col-sm-12 col-lg-4 col-12">
                            <img src={"/img/reuse.svg"} id="outerImg" alt=""/>
                            <h2 className="stepTitle"><span className="circle-no">3</span>Reuse</h2>
                            <p className="text-secondary">They’ll take it to local business owners, who will convert it into new sustainable products</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Steps;
