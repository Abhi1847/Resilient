import React from "react";
import SignUpButton from "./button/Register";
import SignInButton from "./button/SignIn";

const Banner = () => {
    return (
      <>
        {/*--Masthead--*/}
        <header className="masthead col-sm-12">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner w-100">
              <div
                className="carousel-item active"
                style={{ backgroundImage: 'url("/img/landingHeader.svg")' }}
              >
                <div className="head2 carousel-caption">
                  <h1 className="headtitle text-light">
                    Minimize wildfire risk 
                    <br />on your property
                  </h1>
                  <h3 className="text-light subtitle2">
                    Fortifying your land is an accessible and easy proccess with Resilient Sierra
                  </h3>
                  <div className="headbuttons">
                    <SignUpButton />
                    &nbsp;
                    <SignInButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container scroll-block ps-5">
          <p className="text-secondary">
            <i className="fa-solid fa fa-angle-down" /> Scroll to learn more
            about the benefits
          </p>
        </div>
      </>
    );
};

export default Banner;
