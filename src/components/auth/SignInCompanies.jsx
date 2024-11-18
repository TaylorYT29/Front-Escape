import "../../index.css";
import { AuthInput } from "../inputs/AuthInput";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthCarousel } from "./AuthCaruosel";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function SignInCompanies() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateFields = () => {
        if (!email || !password) {
            setErrorMessage('Por favor, completa todos los campos solicitados.');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateFields()) {
            setShowError(true);
            setShowSuccess(false);
            return;
        }

        setShowError(false);

        const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/company-login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        });
        //const content = await response.json();
        //console.log(content);

        const data = await response.json();

        if (response.ok) {
            setShowError(false);
            setShowSuccess(true);
            setUser(data.user);
            console.log(data.user);
            setTimeout(() => {
                navigate('/home');
            }, 2500);
        }
        else 
        {
            setShowSuccess(false);
            setShowError(true);
        }
    };

    return (
        <div className="grid justify-center items-center h-[100vh] md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
            <form className="w-full lg:w-2/4 " onSubmit={handleSubmit}>
                <img className="w-[12rem] mx-auto mt-8 mb-12 " src="../src/assets/imgs/logo-celeste.png" alt="Logo" /> 
                <h2 className="text-4xl font-bold text-center mb-8 text-sky-500">{t('login')}</h2>
                <AuthInput name="email" placeholder={t('iEmail')} type="email" onChange={e => setEmail(e.target.value)}/>
                <AuthInput name="password" placeholder={t('iPassword')} type="password" className="mb-4 lg:mb-4" onChange={e => setPassword(e.target.value)}/>
                <div className="text-right">
                    <NavLink className="text-sky-500 font-medium" to="/forgot-password-company">{t('forgotPassword')}</NavLink>
                </div>

                <input
                    className="text-white p-3 bg-sky-500 flex rounded-xl items-center justify-center w-full lg:my-8 my-10 font-bold text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:bg-blue-800 hover:text-white"
                    type="submit"
                    name="btn-signip"
                    value={t('iSignIn')}
                />

                <p className="text-gray-400 text-center dark:text-white">{t('goSignUp')}
                    <NavLink className="text-sky-500 ml-2 font-medium" to="/signUpCompanies">{t('createAccount')}</NavLink>
                </p>
            </form> 

            
        </div>

        <AuthCarousel />

        {showSuccess && (
            <Alert severity="success" className="absolute top-4 right-4">
                <AlertTitle>Éxito</AlertTitle>
                ¡Inicio de sesión correctamente! Serás redirigido en breve.
            </Alert>
        )}

        {showError && (
            <Alert severity="error" className="absolute top-4 right-4">
                <AlertTitle>Error</AlertTitle>
                ¡Error! Credenciales inválidas, por favor introduce las correctas.
            </Alert>
        )}

        </div>
    );
}