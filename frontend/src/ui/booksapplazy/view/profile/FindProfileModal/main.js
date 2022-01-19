import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { graphql, useLazyLoadQuery } from "react-relay";
import useCustomSearchHook from './helper';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default ({ closeModal }) => {

    const { isLoading, data, refetch, resetState } = useCustomSearchHook();
    const [value, setValue] = useState("");

    return (
        <Dialog open onClose={closeModal} maxWidth='xs' fullWidth>
            <DialogTitle>Find User</DialogTitle>
                <DialogContent >
                    <Autocomplete 
                        sx={{marginTop: 2}}
                        isOptionEqualToValue={(option, value) => option.node.name === value}
                        getOptionLabel={(edge) => edge?.node?.name || ""}
                        options={data}  
                        loading={isLoading} 
                        value={value}
                        onChange={(_, newValue) => {
                            setValue(newValue);
                        }}
                        onInputChange={(_, newInputValue) => {
                            refetch(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Name"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeModal} >Cancel</Button>
                </DialogActions>
        </Dialog>
    );
}
