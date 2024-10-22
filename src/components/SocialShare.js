import React from "react";
import IconButton from "@mui/material/IconButton";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import {EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const socialTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#26221D",
      darker: "#17130F",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});


const SocialShare = () => {

    const shareUrl = 'https://dev.rs.calpoly.io/';
    const message = 'I have signed up at https://dev.rs.calpoly.io/ to get woody biomass removed from my property. Sign up to get a free estimate for your property and help prevent wildfires in California!';
    const message_new = 'I have signed up at Resilient Sierra to get woody biomass removed from my property. Sign up to get a free estimate for your property and help prevent wildfires in California!';
    
    
    return (
        <ThemeProvider theme={socialTheme}>
        <style>
            {`
            .rs-share-button svg circle{
                stroke: #26221D;
                fill: #26221D;
            }
            `}
        </style>
        
        <div className={"d-flex s justify-content-between"}>

            {/*Share via FB*/}
            <FacebookShareButton
                color="primary"
                title={"Share via facebook"}
                url={'https://dev.rs.calpoly.io/'}
                quote={""}
                className="rs-share-button"
            >
                <FacebookIcon size={40} round/>
            </FacebookShareButton>

            {/*Share via Text message*/}
            <IconButton
                aria-label="message"
                color="primary"
                title={"Share via message"}
                className={"border"}
                onClick={() =>
                    (window.open(`sms:?body=${message}`, '_blank'))
                }
            >
                <MessageRoundedIcon />
            </IconButton>

            {/*Share via Email*/}
            <EmailShareButton
                title={"Share via email"}
                url={shareUrl}
                subject={'Invitation'}
                body={message_new}
                onClick={() => {}}
                openShareDialogOnClick
                className="rs-share-button"
                >
                <EmailIcon size={40} round />
            </EmailShareButton>

            {/*Share via Whatsapp*/}
            <WhatsappShareButton
                url={shareUrl}
                title={message_new}
                className="rs-share-button"
            >
                <WhatsappIcon size={40} round/>
            </WhatsappShareButton>

            {/*Share via Twitter*/}
            <TwitterShareButton
                color="primary"
                url={shareUrl}
                title={message_new}
                className="rs-share-button"
            >
                <TwitterIcon size={40} round/>
            </TwitterShareButton>

        </div>
        </ThemeProvider>
    );
};


export default SocialShare;



