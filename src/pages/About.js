import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {addFeedback, sendContactUs} from "../redux/actions/other";
import {Field, Form, Formik} from "formik";

const About = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const initialValue = {first_name: '', last_name: '', email: '', phone: '', comment: ''};
    const [contactUsInitialValue, setContactUsInitialValue] = useState(initialValue);

    const contactUsSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Required"),
        comment: Yup.string().required("Required")
    });

    useEffect(() => {
        if (user) {
            setContactUsInitialValue({email: user['email']});
        }
    }, [user]);

    const handleSubmit = (values) => {
        setSending(true);

        dispatch(sendContactUs(values))
            .then(() => {
                setSending(false);
            })
            .catch(() => {
                setSending(false);
            });
    };

    return (
        <div className={'about_us_page'}>
            {/*<section className="page-section about_section" id="progress">
                <div className="container-fluid">
                    <div className="row row-flex">
                        <p className="p-0 timeline_page_title">About [Resilient Sierra]</p>
                        <p className="p-0">Program Details</p>
                        <div className="col-md-4 col-sm-12 col-lg-4 p-0 m-0">
                            <img className="img-fluid h-100" src={"/img/about_side.png"} alt="about"/>
                        </div>
                        <div className="col-md-8 col-sm-12 col-lg-8 p-0 px-lg-5 m-0 px-0">
                            <h4>Our mission</h4>
                            <p className="mission_text m-0">Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                                has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section team_section p-4 pb-2">
                <div className="container-fluid">
                    <div className="row">
                        <p className="p-0 mb-4 timeline_page_title">Our Team</p>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                        <div className="col-md-4 col-sm-12 col-lg-4 mb-5 text-center team_card">
                            <img className="img-fluid" src={"/img/user_img_null.jpg"} alt="about"/>
                            <p className="team_name m-0 pt-3">John Doe</p>
                            <p className="team_post m-0 mb-2">Program Director</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section team_section p-4 pb-5">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <p className="p-0 mb-4 timeline_page_title">Contact Us</p>
                        <p className="contact_text mb-0 ms-2 ">Email address: email@contact.com</p>
                        <p className="contact_text mb-0 ms-2">Phone number: (123) - 456 - 7890</p>
                    </div>
                </div>
            </section>*/}

            <section className="page-section about_section about_team_section">
                <div className="container">
                    <div className="row row-flex about_title">
                        <h1>Meet the people making <span>Resilient Sierra</span><br/>
                            their mission</h1>
                    </div>
                    <div className="row mt-5 team_member">
                        <div className="col-lg-4 mb-4 col-sm-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <img src={"/img/team1.jpg"} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12">
                                    <div className="pt-2">
                                        <h3 className="mt-1 mb-0">Arthur Dent</h3>
                                        <p className="text-secondary m-0">Professional Occupation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 col-sm-4">
                            <div className="row">
                                <div className="col-md-12 pro-pic">
                                    <img src={"/img/team2.jpg"} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12">
                                    <div className="pt-2">
                                        <h3 className="mt-1 mb-0">Ford Prefect</h3>
                                        <p className="text-secondary m-0">Professional Occupation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 col-sm-4">
                            <div className="row">
                                <div className="col-md-12 pro-pic">
                                    <img src={"/img/team3.jpg"} alt="" className="img-fluid"/>
                                </div>
                                <div className="col-md-12">
                                    <div className="pt-2">
                                        <h3 className="mt-1 mb-0">Trillian Astra</h3>
                                        <p className="text-secondary m-0">Professional Occupation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about_section help_section">
                <div className="container">
                    <div className="row row-flex">
                        <div className="col-md-6 col-sm-12 col-lg-6 p-0 m-0">
                            <img className="img-fluid h-100" src={"/img/help_img.jpg"} alt="Help"/>
                        </div>

                        <div className="col-md-6 col-sm-12 col-lg-6 p-0 px-lg-5 mt-5 px-0 ">
                            <h1 className="text-white mt-5 pt-5 ps-5">We’re here to help</h1>
                            <p className="mission_text m-0  ps-5 text-white">Wildfires affect everyone, so your success is our success.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="help_list_section">
                <div className="container">
                    <div className="row row-flex mb-5">
                        <div className="col-auto m-5">
                            <img className="img-fluid h-100" src={"/img/icon_history.svg"} alt="History"/>
                        </div>
                        <div className="col mt-4">
                            <h4 className="text-white">History</h4>
                            <p className="mission_text m-0 text-white me-5">
                                Resilient Sierra was born out of a shared concern for the
                                health and safety of the forested lands in the Tuolumne area.
                                In recent years, devastating wildfires have ravaged many parts
                                of California, causing significant damage to homes,
                                communities, and the environment. <br/><br/>Recognizing the urgent need
                                for action, representatives from five counties came together
                                to form a joint powers authority with the goal of promoting a
                                more resilient, fire-safe forest. The Resilient Sierra program
                                was established as a way to connect private landowners with
                                the wood industry, creating a mutually beneficial system that
                                would help to reduce the risk of wildfires while also
                                providing economic benefits to the region.
                            </p>
                        </div>
                    </div>
                    <div className="row row-flex mb-5">
                        <div className="col-auto m-5">
                            <img className="img-fluid h-100" src={"/img/icon_mission.svg"} alt="Mission"/>
                        </div>
                        <div className="col mt-4">
                            <h4 className="text-white">Mission</h4>
                            <p className="mission_text m-0 text-white me-5">
                                At Resilient Sierra, our mission is to create a more
                                resilient, fire-safe forest in the Tuolumne area, while also
                                promoting economic growth and sustainability. <br/><br/> We
                                believe that by connecting private landowners with the wood
                                industry, we can create a mutually beneficial system that
                                reduces the risk of wildfires, supports local businesses, and
                                promotes sustainable forestry practices. We are committed to
                                using the latest technology and local expertise to provide
                                accurate and up-to-date information about available woody
                                biomass feedstocks, and to creating a reliable supply chain
                                that benefits both landowners and businesses.<br/><br/> Ultimately, our
                                goal is to build a stronger, more resilient community that
                                values and protects our natural resources for generations to
                                come.
                            </p>
                        </div>
                    </div>
                    <div className="row row-flex ">
                        <div className="col-auto m-5">
                            <img className="img-fluid h-100" src={"/img/icon_future.svg"} alt="Future"/>
                        </div>
                        <div className="col mt-4">
                            <h4 className="text-white">Future</h4>
                            <p className="mission_text m-0 text-white me-5">
                                We recognize that the challenges facing our community are
                                ongoing, and we are committed to adapting and evolving our
                                program to meet these challenges head-on. In the coming years,
                                we plan to expand our use of advanced technology to provide
                                even more accurate and comprehensive information about woody
                                biomass feedstocks in the area. <br/><br/>Ultimately, our vision for the
                                future is one of a healthier, safer, and more sustainable
                                forest, and we are committed to doing everything in our power
                                to make that vision a reality. We invite you to join us on
                                this journey, as we work together to build a brighter future
                                for the Tuolumne area and beyond.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="page-section contact_section py-5">
                <div className="container">
                    <h1 className="m-0 mb-2">Contact Us</h1>
                    <p className="m-0 mb-4">If you want to reach out to us, send an email to email@contact.com or give us a call at (123) - 456 -
                        7890, or fill out the contact form below. We’ll get back to you as soon as we can! </p>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="mb-4">
                                <div className="card-body">

                                    <Formik
                                        initialValues={contactUsInitialValue}
                                        validationSchema={contactUsSchema}
                                        enableReinitialize={true}
                                        onSubmit={handleSubmit}>
                                        {({errors, touched, isValidating}) => (
                                            <Form>
                                                <div className="row mb-3">
                                                    <div className="col">
                                                        <div className="form-outline">
                                                            <label className="form-label" htmlFor="first_name">First name</label>
                                                            <Field id={'first_name'} name="first_name" placeholder="First name" className={`form-control`}/>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-outline">
                                                            <label className="form-label" htmlFor="last_name">Last name</label>
                                                            <Field id={'last_name'} name="last_name" placeholder="Last name" className={`form-control`}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                    <Field id={'email'} name="email" placeholder="example@personalgmail.com"
                                                           className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}/>
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="phone">Phone Number</label>
                                                    <Field id={'phone'} name="phone" placeholder="XXX - XXX - XXXX" className={`form-control`}/>
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="comment">Message</label>
                                                    <Field id='comment' as="textarea" name="comment" placeholder="Leave your message here" rows="4"
                                                           className={`form-control ${touched.comment && errors.comment ? "is-invalid" : ""}`}/>
                                                </div>

                                                <button
                                                    disabled={sending}
                                                    type="submit"
                                                    className="btn send_btn float-end">
                                                    {sending ? 'SENDING...' : 'SEND MESSAGE'}
                                                </button>

                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className=" mt-4">
                                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Office+of+Planning+%26+Research/@38.5755685,-121.4957269,21z"
                                        className="w-100" height="435" allowFullScreen="" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
