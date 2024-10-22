import React, {useEffect, useState} from 'react';
import {Uppy} from '@uppy/core';
import axios from 'axios';
import Webcam from '@uppy/webcam';
import ImageEditor from '@uppy/image-editor';
import {Dashboard} from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import authHeader from "../../services/auth-header";
import $ from "jquery";
import {toast} from "react-toastify";

function Uploader({id, children, onUploadSuccess, email, plugins, uploaderType, property_id}) {

    let files = [];
    let metadata = [];
    const [isOpen, setIsOpen] = useState(false);

    const uppy = new Uppy({
        id,
        allowMultipleUploads: false,
        restrictions: {
            // maxNumberOfFiles: 1,
            allowedFileTypes: [
                // '.jpg',
                '.jpeg',
                // '.png',
                // '.gif',
                // '.JPG',
                // '.JPEG',
                // '.PNG',
                // '.GIF',
            ],
        }
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
                const param = {email: email, property_id: property_id, metadata: metadata};
                return axios.post(`${process.env.REACT_APP_API_URL}/image/put/get-presigned-url`, param, {headers: authHeader()})
                    .then((response) => {
                            toast.success("Uploaded image successfully!");
                            return {
                                url: response.data.url,
                                method: 'POST',
                                fields: response.data.fields
                            };
                        },
                        (error) => {
                            const message = (error.response && error.response.data && error.response.data) || error.message || error.toString();
                            console.error(message);
                            toast.error("Oops! Something went wrong. Please try again.");
                        })
            },
        })
        .on('file-added', (file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const magicNumbers = new Uint8Array(reader.result).subarray(0, 4);
                metadata.push(magicNumbers)
            };
            reader.readAsArrayBuffer(file.data.slice(0, 4))
        })
        .on('upload-success', (file, snapshot) => {
            if (typeof onUploadSuccess === 'function') {
                console.log('upload-success', file);
                files.push(file?.preview);
            }
        })
        .on('complete', () => {
            if(files.length > 0) {
                onUploadSuccess(files);
                handleClose();
            }
        });

    useEffect(() => {
        if(uploaderType != null) {
            setIsOpen(true);
            setTimeout(() => {
                if (uploaderType === 'device') {
                    $(".uppy-DashboardTab[data-uppy-acquirer-id='MyDevice'] .uppy-DashboardTab-btn").click();
                } else {
                    $(".uppy-DashboardTab[data-uppy-acquirer-id='Webcam'] .uppy-DashboardTab-btn").click();
                }
            }, 500);
        } else {
            setIsOpen(false);
        }
        return () => uppy.close();
    }, [uploaderType]);

    useEffect(() => {
        return () => uppy.close();
    }, [uppy]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {React.cloneElement(children)}
            {isOpen && <Dashboard
                className={uploaderType}
                uppy={uppy}
                proudlyDisplayPoweredByUppy={false}
                plugins={plugins}
                autoOpenFileEditor={false}/>}
        </>
    );
}

export default Uploader;
