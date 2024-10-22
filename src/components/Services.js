import React from "react";

const Services = () => {

    return (
        <>
            {/*-- About--*/}
            <section className="page-section" id="about">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-lg-6 col-12 p-5">
                            <div className="d-flex align-items-center">
                                <div className="mr-4 ">
                                    <img src={"/img/safety_icon.svg"} alt=""/>
                                </div>
                                <div className="mt-1 ms-3">
                                    <h2 className="mb-2 text-dark">Safety</h2>
                                    <h3 className="mb-2 text-dark">Make your Property Safer</h3>
                                </div>
                            </div>
                            <p className="text-secondary">With the increased danger of California wildfires in recent years, it makes sense to
                                take all possible measures to keep your land, home, and family safe. Remove woody biomass from your land to protect what matters most.</p>
                        </div>

                        <div className="col-md-6 col-sm-12 col-lg-6 col-12 p-5">
                            <div className="d-flex align-items-center">
                                <div className="mr-4">
                                    <img src={"/img/savings_icon.svg"} alt=""/>
                                </div>
                                <div className="mt-1 ms-3">
                                    <h2 className="mb-2 text-dark">Savings</h2>
                                    <h3 className="mb-2 text-dark">Save on Fire Insurance</h3>
                                </div>
                            </div>
                            <p className="text-secondary">Protecting your land can have a direct impact on your wallet. By taking action as simple as signing up with [Resilient Sierra], you can decrease your risk levels and qualify for lower fire insurance rates.</p>
                        </div>

                        <div className="col-md-6 col-sm-12 col-lg-6 col-12 p-5">
                            <div className="d-flex align-items-center">
                                <div className="mr-4">
                                    <img src={"/img/ca_products_icon.svg"} alt=""/>
                                </div>
                                <div className="mt-1 ms-3">
                                    <h2 className="mb-2 text-dark">CA Products</h2>
                                    <h3 className="mb-2 text-dark">Support Sustainability</h3>
                                </div>
                            </div>
                            <p className="text-secondary">Once removed, the woody biomass is sent to local businesses and converted into sustainable products, creating jobs and supporting the community. Let the biomass from your property reach its full potential.</p>
                        </div>

                        <div className="col-md-6 col-sm-12 col-lg-6 col-12 p-5">
                            <div className="d-flex align-items-center">
                                <div className="mr-4">
                                    <img src={"/img/reslilence_icon.svg"} alt=""/>
                                </div>
                                <div className="mt-1 ms-3">
                                    <h2 className="mb-2 text-dark">Resilience</h2>
                                    <h3 className="mb-2 text-dark">Protect the Forest</h3>
                                </div>
                            </div>
                            <p className="text-secondary">The forests and wildlife of California are known worldwide for their beauty and potential. Let’s protect this great American resource by strategically removing biomass and creating resilient forest landscapes.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
