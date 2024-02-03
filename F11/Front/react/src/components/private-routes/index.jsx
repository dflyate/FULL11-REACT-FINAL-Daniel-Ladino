import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginAction } from '../../redux/slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('jwt_token'));
        if(token){
            dispatch(setLoginAction(token))
        }
    },[children])

    const authStore = useSelector(state=> state.authStore);
    const isAuth = authStore.jwt;
    const location = useLocation();

    return(isAuth ? children : <Navigate to="/login" state={{from: location}}/>)
}

export default PrivateRoute;