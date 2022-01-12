import { useEffect } from 'react';
import LoginPage from './login';

export default () => {
    const userid = window.sessionStorage.getItem('userid');
    if (!userid) {
        return <LoginPage />
    }
    return `${userid} Hello`
}
