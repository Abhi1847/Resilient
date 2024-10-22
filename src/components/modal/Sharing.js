import React, {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Sharing = (props) => {

    const {setOpenSharing, sharingSubmit} = props;
    const [isFirstClose, setIsFirstClose] = useState(false);
    const [isSecondClose, setIsSecondClose] = useState(false);

    const firstClose = (event, reason) => {
        if (reason && reason === "backdropClick" && "escapeKeyDown") return;
        setIsFirstClose(true);
    };

    const secondClose = (event, reason) => {
        if (reason && reason === "backdropClick" && "escapeKeyDown") return;
        setIsSecondClose(true);
        setOpenSharing(false);
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={true}
            onClose={isFirstClose ? secondClose : firstClose}
            scroll={"body"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogContent>
                <div className="row">
                    <div className="col-md-7">
                        <img src={"/img/sharing.png"} alt={"sharing-bg"} style={{width: "100%"}}/>
                    </div>
                    <div className="col-md-5">
                        <div>
                            <h4>
                                Sharing is caring
                                <IconButton
                                    className={"float-end p-0"}
                                    color="inherit"
                                    onClick={isFirstClose ? secondClose : firstClose}
                                    aria-label="close">
                                    <CloseIcon/>
                                </IconButton>
                            </h4>
                            <p className={'text-secondary'}>
                                See how many other houses is your area have signed up, lowering cost for you.
                            </p>
                            <p className={'text-secondary mt-5'}>
                                To enable this feature, by default you're anonymously sharing aggregate data with community members. This setting can be updated
                                any time within the Permissions section of your <button className="greenLinkBtn">Account Details</button> page.
                            </p>
                            <div className={'mt-4'}>
                                {isFirstClose ?
                                    <div className="d-flex justify-content-between">
                                        <button type="button"
                                                className="btn btn-outline-dark text-uppercase"
                                                onClick={() => secondClose()}
                                                style={{fontSize: '15px'}}>NOT NOW
                                        </button>
                                        <button className="btn btn-primary"
                                                style={{fontSize: '15px'}}
                                                onClick={() => sharingSubmit()}>SHARE AND SAVE
                                        </button>
                                    </div> :
                                    <button className="btn btn-primary w-100"
                                            style={{fontSize: '15px'}}
                                            onClick={() => sharingSubmit()}>CONTINUE TO ANALYSIS</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Sharing;
