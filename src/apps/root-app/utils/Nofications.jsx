import React from 'react';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'
import 'react-toastify/dist/ReactToastify.min.css';

function LoadingComponent({message}){
    return (
        <div>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span className="pl-1">{message}</span>
        </div>
    );
}

const notificationOnProgress = async ({ toastId = 745212, message = "Loading" }) => {
    if(toast.isActive(toastId)) {
        toast.update(toastId, {
            render: () =>  <LoadingComponent message={message}/>,
            type: toast.TYPE.INFO,
            autoClose: false
        });
    }
    
    return toast(
        <LoadingComponent message={message}/>,
        {
            toastId: toastId,
            type: toast.TYPE.INFO,
            autoClose: false
        }
    )
}

const notificationUpdateToSuccess = ({ toastId = 745212, message = "Success", autoClose=10000 }) => toast.update(toastId, {
    render: () => <div>{message}</div>,
    type: toast.TYPE.SUCCESS,
    autoClose: autoClose
});

const notificationUpdateToError = ({ toastId = 745212, message = "Error", autoClose=10000 }) => toast.update(toastId, {
    render: () => <div>{message}</div>,
    type: toast.TYPE.ERROR,
    autoClose: autoClose
});

const notificationUpdateToInfo = ({ toastId = 745212, message = "Information", autoClose=10000 }) => toast.update(toastId, {
    render: () => <div>{message}</div>,
    type: toast.TYPE.INFO,
    autoClose: autoClose
});

const notificationSuccess = ({ message = "Success", autoClose=10000 }) => toast.success(message, {
    autoClose: autoClose
}
);
const notificationError = ({ message="Error", autoClose=10000 }) => toast.error(message, {
    autoClose: autoClose
}
);
const notificationInfo = ({ message = "Information", autoClose=10000 }) => toast.info(message, {
    autoClose: autoClose
}
);
export {
    notificationOnProgress,
    notificationUpdateToSuccess,
    notificationUpdateToError,
    notificationUpdateToInfo,
    notificationSuccess,
    notificationError,
    notificationInfo
}