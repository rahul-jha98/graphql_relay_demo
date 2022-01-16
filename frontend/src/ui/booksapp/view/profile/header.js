import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {  useEffect, useState } from 'react';
import { useSelectedUserId, useCurrentUserId } from '../store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default () => {
    const [selectedUserID, { setSelectedUserId }] = useSelectedUserId();
    const [currentUserID, { logoutUser }] = useCurrentUserId();

    return (<Stack direction="row" justifyContent="space-between" marginRight={15}>

        <Button startIcon={<PersonSearchIcon />}>Search User</Button>

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