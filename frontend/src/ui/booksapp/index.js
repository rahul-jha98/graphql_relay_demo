import { useState } from 'react';
import LoginPage from './login';
import View from './view';

export default () => {
    const [userid, setUserId] = useState(window.sessionStorage.getItem('userid'));
    if (!userid) {
        return <LoginPage setUserId={setUserId} />
    }
    return <View userid={userid} />
}