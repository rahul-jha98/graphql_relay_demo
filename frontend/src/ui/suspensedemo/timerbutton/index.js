import {graphql, useLazyLoadQuery}  from 'react-relay';
import Button from '@mui/material/Button';


export default ({ timeInMs }) => {
    const data = useLazyLoadQuery(graphql`
        query timerbutton_Query($timeInMs: Int!) {
            timer(ms: $timeInMs)
        }
    `, 
    { timeInMs },
    { fetchPolicy: 'network-only'}
    );

    return <Button variant="contained" disableElevation fullWidth>
       {`${data.timer/1000} seconds`}
    </Button>
}