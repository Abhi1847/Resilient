import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ProgressStep from "./ProgressStep";
import {Skeleton} from "@mui/material";
import moment from "moment";

const ProgressInfo = ({userDetail}) => {

    const {last_step = '', next_step = '', status = ''} = userDetail;

    return (
        <div>
            <div className={"row"}>
                <div className={"col-md-10 col-sm-12"}>
                    <Typography variant="body1" gutterBottom className="mb-4 mt-4 caps-text">
                        CURRENT PROGRESS
                    </Typography>
                    <div className={"row"}>
                        <div className={'col-md-6 col-sm-12 pe-sm-0'}>
                            <p className={'m-0'}>Last Action Taken</p>
                            <hr/>
                            <div className={'mb-4'}>
                                <p className={'m-0'}>Who</p>
                                {last_step ?
                                    <span className="text-muted m-0 d-flex align-items-center">
                                        <Avatar src="/broken-image.jpg"/>&nbsp;&nbsp;{last_step['who']}
                                </span> : <Skeleton height={20} width={150}/>}
                            </div>
                            <div className={'mb-4'}>
                                <p className={'m-0'}>What</p>
                                {last_step ?
                                    <p className="text-muted m-0 text-capitalize">{last_step['what']}</p> :
                                    <Skeleton height={20} width={150}/>}
                            </div>
                            <div>
                                <p className={'m-0'}>When</p>
                                {last_step ?
                                    <p className="text-muted m-0">
                                        {moment(last_step['when']).format("MMMM Do YYYY, h:mm:ss a")}
                                    </p> :
                                    <Skeleton height={20} width={150}/>}
                            </div>
                        </div>
                        <div className={'col-md-6 col-sm-12 ps-sm-0'}>
                            <p className={'m-0'}>Next Step</p>
                            <hr/>
                            <div className={'mb-4'}>
                                <p className={'m-0'}>Who</p>
                                {next_step ?
                                    <span className="text-muted m-0 d-flex align-items-center">
                                        <Avatar src="/broken-image.jpg"/>&nbsp;&nbsp;{next_step['who']}
                                </span> : <Skeleton height={20} width={150}/>}
                            </div>
                            <div className={'mb-4'}>
                                <p className={'m-0'}>What</p>
                                {next_step ?
                                    <p className="text-muted m-0 text-capitalize">{next_step['what']}</p> :
                                    <Skeleton height={20} width={150}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-12">
                    <ProgressStep status={status}/>
                </div>
            </div>
        </div>
    );
};

export default ProgressInfo;
