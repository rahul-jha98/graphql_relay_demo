import { useState } from "react"
import Login from './login';
import Signup from './signup';

export default ({ setUserId }) => {
    const [showingLogin, setShowingLogin] = useState(true);

    const showLogin = () => {
        setShowingLogin(true);
    }

    const showRegister = () => {
        setShowingLogin(false);
    }

    const onSuccess = (id) => {
        window.sessionStorage.setItem('userid', id);
        setUserId(id);
    }

    return showingLogin ? 
        <Login showRegister={showRegister} onSuccess={onSuccess}/> :
        <Signup showLogin={showLogin} onSuccess={onSuccess} />;
}