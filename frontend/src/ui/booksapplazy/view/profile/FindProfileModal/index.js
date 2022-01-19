import {useState, Suspense} from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { lazy } from 'react';
const Modal = lazy(() => import('./main'));

const getFetchKey = (cacheValidityInMs) => {
    return Math.floor(Date.now() / cacheValidityInMs);
}

export default ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }


    return <>
        { children(openModal) }
        <Suspense fallback={null}>
        { isModalOpen &&   
            <Modal closeModal={() => setIsModalOpen(false)}/>   
        }
        </Suspense>
    </>
}
