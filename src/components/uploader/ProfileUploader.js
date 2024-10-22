import React, { useEffect, useState } from 'react';
import { Uppy } from '@uppy/core';
import axios from 'axios';
import Webcam from '@uppy/webcam';
import ImageEditor from '@uppy/image-editor';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import authHeader from "../../services/auth-header";
import { toast } from "react-toastify";
import { DashboardModal } from '@uppy/react'; // Corrected import

function ProfileUploader({ id, children, onUploadSuccess, email, profileImage }) {
    let files = [];
    let metadata = [];
    const [isOpen, setIsOpen] = useState(false);

    const uppy = new Uppy({
        id,
        allowMultipleUploads: false,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['.jpg', '.jpeg'],
        },
    })
        .use(ImageEditor, {
            id: 'ImageEditor',
            quality: 0.8,
            cropperOptions: {
                viewMode: 1,
                background: false,
                autoCropArea: 1,
                responsive: true,
            },
        })
        .use(Webcam, {
            id: 'Webcam',
            modes: ['picture'],
        })
        .use(AwsS3, {
            limit: 1,
            timeout: 60 * 1000,
            getUploadParameters(file) {
                let param = { email: email, metadata: metadata, url: profileImage };
                let url = `${process.env.REACT_APP_API_URL}/profile/presigned-url/put`;

                return axios.post(url, param, { headers: authHeader() })
                    .then((response) => {
                        toast.success("Updated profile successfully!");
                        return {
                            url: response.data.url,
                            method: 'POST',
                            fields: response.data.fields,
                        };
                    })
                    .catch((error) => {
                        const message = (error.response && error.response.data) || error.message || error.toString();
                        console.error(message);
                        toast.error("Oops! Something went wrong. Please try again.");
                    });
            },
        })
        .on('file-added', (file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const magicNumbers = new Uint8Array(reader.result).subarray(0, 4);
                metadata.push(magicNumbers);
            };
            reader.readAsArrayBuffer(file.data.slice(0, 4));
        })
        .on('upload-success', (file, snapshot) => {
            if (typeof onUploadSuccess === 'function') {
                console.log('upload-success', file);
                files.push(file?.preview);
            }
        })
        .on('complete', () => {
            if (files.length > 0) {
                onUploadSuccess(files);
                handleClose();
            }
        });

    useEffect(() => {
        return () => uppy.close();
    }, [uppy]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            {React.cloneElement(children, { onClick: handleOpen })}
            <DashboardModal
                uppy={uppy}
                proudlyDisplayPoweredByUppy={false}
                closeModalOnClickOutside
                open={isOpen}
                onRequestClose={handleClose}
                plugins={['Webcam', 'ImageEditor']}
                metaFields={[]}
                autoOpenFileEditor={true}
                hidePauseResumeButton={true}
            />
        </>
    );
}

export default ProfileUploader;
