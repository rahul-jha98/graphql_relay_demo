import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useRelayEnvironment, fetchQuery } from "react-relay";
import Banner from './banner';

const validateLoginQuery = graphql`
  query loginQuery($user_id: ID!, $password: String!) {
      validateUser(user_id: $user_id, password: $password)
  }
`;

export default ({ showRegister, onSuccess }) => {
    const { register, handleSubmit } = useForm();

    const environment = useRelayEnvironment();

    const querySubscriptionRef = useRef(null);
    const [isInFlight, setIsInFlight] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (data) => {
        const { username, password } = data;
        if (username === '' || password === '') {
            setErrorMessage("Fields are empty");
            return;
        } 
        setErrorMessage('');
        querySubscriptionRef.current = fetchQuery(environment, 
            validateLoginQuery,
            {user_id: username, password}
        ).subscribe({
            start: () => {
                setIsInFlight(true);
            },
            next: (data) => {
                setIsInFlight(false);
                
                if (data.validateUser) {
                    onSuccess(username);
                } else {
                    setErrorMessage("Login failed");
                }

                querySubscriptionRef.current = null;
            },
            error: (error) => {
                setIsInFlight(false);
                setErrorMessage(error.message);

                querySubscriptionRef.current = null;
            }
        })
    }

    useEffect(() => {
        return () => {
            if (querySubscriptionRef.current) {
                querySubscriptionRef.current.unsubscribe();
            }
        }
    }, []);
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
                    Login
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
                    onClick={showRegister}
                    sx={{cursor: "pointer" }}>
                        Register Instead
                </Typography>       
            </Stack>
        </form>
      );
}
