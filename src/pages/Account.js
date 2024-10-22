import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteAccount, getProfileImage, setLoading} from "../redux/actions/other";
import Skeleton from "@mui/material/Skeleton";
import ProfileUploader from "../components/uploader/ProfileUploader";
import swal from "sweetalert";
import {logout} from "../redux/actions/auth";
import {toast} from "react-toastify";
import {LOGIN_SUCCESS} from "../redux/actions/types";

const Account = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const [profileImage, setProfileImage] = useState('None');
    const [imageLoading, setImageLoading] = useState(false);
    const dummyImage = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

    useEffect(() => {
        setProfileImage(user?.img_url)
    }, [user]);

    const get_profile_images = (email) => {
        setImageLoading(true);
        dispatch(getProfileImage({email: email}))
            .then((response) => {
                setImageLoading(false);
                if (response !== "No image uploaded" && response.includes("https://dxhub-woodybiomass-user-assets")) {
                    setProfileImage(response);

                    let user = JSON.parse(localStorage.getItem("user"));
                    user['img_url'] = response;
                    localStorage.setItem("user", JSON.stringify(user));

                    let data = user;
                    data['img_url'] = response;

                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {user: data},
                    });
                }
            })
            .catch(() => {
                setImageLoading(false);
            });
    };

    const delete_account = (email) => {
        swal({
            title: "Are you sure want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes"],
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(setLoading(true));
                dispatch(deleteAccount({email: email}))
                    .then(() => {
                        toast.success("Deleted account successfully!");
                        dispatch(setLoading(false));
                        dispatch(logout());
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                    });
            }
        });
    };

    const onUploadSuccess = () => {
        get_profile_images(user.email);
    };

    return (
        <section className="page-section" id="account">
            <div className="container rounded bg-white">
                <div className="row">
                    <div className="justify-content-between align-items-center mb-3">
                        <p class="btn-text page_title">RESILIENT SIERRA ACCOUNT</p>
                        <hr class="solid sub-divider"></hr>
                    </div>
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column text-left p-3">
                            <div className="profile_pic_block">
                                {imageLoading ?
                                    <Skeleton className="rounded-circle align-items-center user_pic_img" variant="circular" width={270} height={260}/> :
                                    <img className="rounded-circle align-items-center user_pic_img"
                                         src={profileImage === '' || profileImage === 'None' || !profileImage.includes("https://dxhub-woodybiomass-user-assets") ? dummyImage : profileImage}/>}
                                <ProfileUploader
                                    email={user.email}
                                    profileImage={profileImage}
                                    className={'mb-2'}
                                    id="avatar-image-picker"
                                    onUploadSuccess={onUploadSuccess}>
                                    <button type="button" className="btn btn-primary edit_pic_btn">
                                        Edit<img id="editimg" src={"/img/icon_edit.png"} alt="edit" width="15" className="ms-2"/>
                                    </button>
                                </ProfileUploader>
                            </div>
                            <h3 class="text-dark account-name">{user.name}</h3>
                            <p className="text-secondary account-email">{user.email}</p>
                            <span> </span>
                        </div>
                    </div>

                    <div className="col-md-9 border-right mt-5">
                        <div className="justify-content-between align-items-center page_title_header mb-3">
                            <h2 className="text-dark">Account Details</h2>
                            <p class="text-secondary">Manage your personal info, account data, and property permissions from here. The information displayed on this page is how the JPA or any licensed timber operators will contact you for removal proccedings.</p>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6 p-3 pe-5">

                                <b className="text-dark">Contact Info</b>
                                <hr class="solid sub-divider"></hr>
                                <h6>Select any field to edit your information</h6>
                                <div className="row">
                                    <div className="col-md-12 account_fields_input">
                                        <label className="labels"/>
                                        <input type="text" className="form-control" placeholder="User Name" disabled={true} defaultValue={user.name}/>
                                    </div>
                                    <div className="col-md-12 account_fields_input">
                                        <label className="labels"/>
                                        <input type="email" className="form-control" placeholder="example@gmail.com" disabled={true} defaultValue={user.email}/>
                                    </div>
                                    <div className="col-md-12 account_fields_input">
                                        <label className="labels"/>
                                        <input type="tel" className="form-control" placeholder=" ( ___ ) - ___ - ____" disabled={true} defaultValue={user.phone}/>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 property_block p-3 ">
                                <b className="text-dark">Property Status</b>
                                <hr class="solid sub-divider"></hr>
                                <h6>Set the individual property status to active or inactive</h6>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" id="Checked1" defaultChecked={true}/>
                                            <label className="form-check-label" htmlFor="Checked1"><p>1771 Alazan Way</p></label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="Checked2"/>
                                            <label className="form-check-label" htmlFor="Checked2"><p>17795 Ranchera Rd</p></label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12 p-3 mt-4 permissions_block">
                                <b className="text-dark">Permissions</b>
                                <hr class="solid sub-divider"></hr>
                                <h6></h6>
                                <div className="row mt-4">
                                    <div className="col-md-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                <p>Allow LTOs to contact you via email inbox system</p>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckChecked" defaultChecked={true}/>
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                <p>Allow LTOs to contact you via pohne number listed under your account</p>

                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckChecked1" defaultChecked={true}/>
                                            <label className="form-check-label" htmlFor="flexCheckChecked1">
                                                <p>Allow LTOs to contact you via phone number listed under your account</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 p-3 mt-4 delete_block">
                                <b className="text-dark">Delete Account</b>
                                <hr class="solid sub-divider"></hr>
                                <h6> Once you confirm your account deletion, there is no way to restore your data. <br/>
                                    Be sure that this is what you want.
                                    </h6>
                                <button type="button" className="btn btn-outline-info btn_delete mt-4"
                                        onClick={() => delete_account(user.email)}>DELETE MY ACCOUNT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;
