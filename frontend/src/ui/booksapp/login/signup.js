import { useState } from 'react';
import { useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import { useMutation } from "react-relay";
import Banner from './banner';

const AddUserMutation = graphql`
  mutation signupMutation($user_id: ID!, $password: String!, $name: String!, $is_author: Boolean!) {
    addUser(id: $user_id, 
            password: $password,
            name: $name,
            is_author: $is_author) {
        success
        messages
        user {
            id
        }
    }
  }
`;

export default ({ showLogin, onSuccess }) => {
    const { register, handleSubmit } = useForm();

    const [commitMutation, isInFlight] = useMutation(AddUserMutation);

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (data) => {
        const { username, password, name, is_author} = data;
        if (username === '' || password === '' || name === '') {
            setErrorMessage("Fields are empty");
            return;
        } 
        setErrorMessage('');
        commitMutation({
            variables: {
                user_id: username,
                password,
                name,
                is_author
            },
            onCompleted: ({ addUser: data}) => {
                console.log(data);
                if (data.success) {
                    onSuccess(data.user.id);
                } else {
                    setErrorMessage(data.messages[0]);
                }
            },
            onError: (err) => {
                setErrorMessage(err.message);
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction="column"
                spacing={3}
                margin={4}
                width="30%"
                sx={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Typography variant="body1" align="center">
                    Register
                </Typography>
                {errorMessage && <Banner message={errorMessage} />}
                <TextField 
                    label="Username" 
                    fullWidth
                    size="small"
                    InputProps={{...register('username')}} />
                
                <TextField 
                    label="Password" 
                    fullWidth
                    size="small"
                    type="password"
                    InputProps={{...register('password')}} />

                <TextField 
                    label="Name" 
                    fullWidth
                    size="small"
                    InputProps={{...register('name')}} />

                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            defaultValue={false}
                            inputProps={{...register('is_author')}}
                        >
                            <MenuItem value={false}>Normal User</MenuItem>
                            <MenuItem value={true}>Author</MenuItem>
                        </Select>
                    </FormControl>
                <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit"
                    disabled={isInFlight}>
                        Submit
                </Button>

                <Typography 
                    variant="body2"
                    align="center"
                    color="primary" 
                    onClick={showLogin}
                    sx={{cursor: "pointer" }}>
                        Go to Login Screen
                </Typography>
            </Stack>
        </form>
      );
}
