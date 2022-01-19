import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {  useEffect, useState } from 'react';
import { useSelectedUserId, useCurrentUserId } from '../store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FindProfileModal from './FindProfileModal';

export default () => {
    const [selectedUserID, { setSelectedUserId }] = useSelectedUserId();
    const [currentUserID, { logoutUser }] = useCurrentUserId();

    return (<Stack direction="row" justifyContent="space-between" marginRight={15}>
        <FindProfileModal>
            {(openModal) => {
            
                return <Button startIcon={<PersonSearchIcon />} onClick={openModal}>Search User</Button>;
            
            }}
        </FindProfileModal>
    
        {selectedUserID !== currentUserID ? 
            <Button 
                onClick={() => setSelectedUserId(currentUserID)}
                startIcon={<AccountCircleIcon />}>
                    My Profile
                </Button> :
            <Button 
                startIcon={<LogoutIcon />}
                onClick={logoutUser}>
                    Logout
                    </Button>
        }
    </Stack>
    );
}