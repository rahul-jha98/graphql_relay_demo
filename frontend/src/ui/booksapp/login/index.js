import { useState } from "react"
import Login from './login';
import Signup from './signup';
import { useNavigate } from "react-router-dom";

export default () => {
    const [showingLogin, setShowingLogin] = useState(true);
    const navigate = useNavigate();

    const showLogin = () => {
        setShowingLogin(true);
    }

    const showRegister = () => {
        setShowingLogin(false);
    }

    const onSuccess = (id) => {
        window.sessionStorage.setItem('userid', id);
        navigate('/bookapp', { replace: true });
    }

    return showingLogin ? 
        <Login showRegister={showRegister} onSuccess={onSuccess}/> :
        <Signup showLogin={showLogin} onSuccess={onSuccess} />;
}