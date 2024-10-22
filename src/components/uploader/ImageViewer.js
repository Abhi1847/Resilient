import React from 'react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import Lightbox from "react-image-lightbox";

function ImageViewer({data, activePhoto, setActivePhoto, onClose, isOpen }) {

    return (
        <>
            {isOpen &&
            <Lightbox
                mainSrc={data[activePhoto]}
                nextSrc={data[(activePhoto + 1) % data.length]}
                prevSrc={data[(activePhoto + data.length - 1) % data.length]}
                onCloseRequest={() => onClose(false)}
                onMovePrevRequest={() =>
                    setActivePhoto((activePhoto + data.length - 1) % data.length)
                }
                onMoveNextRequest={() =>
                    setActivePhoto((activePhoto + 1) % data.length)
                }
            />}
        </>
    );
}

export default ImageViewer;
