import React from "react";
import {Link} from "@mui/material";

const NoPageFound = () => {

    return (
        <div className={'page_not_found'}>
            <div className="fof">
                <h1>Error 404</h1>
                <div className='d-flex justify-content-center'>
                    <Link to={'/home'} className="mt-3">
                        GO TO HOME
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoPageFound;
