import React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import UserTimeline from "../../pages/UserTimeline";

const UserDashboard = ({email, open, onClose, property_id}) => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'xl'}
            open={open}
            onClose={onClose}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <IconButton
                                className={'float-end p-0'}
                                color="inherit"
                                onClick={onClose}
                                aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <UserTimeline email={email} property_id={property_id}/>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserDashboard;
