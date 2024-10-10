import { useEffect, useState } from 'react'
import { AppRouter } from './router/AppRouter'
import { getUsuario } from './services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/auth/authSlice';

function App() {
  const userInfo = useSelector(state => state.usuarioState);
  const dispatch = useDispatch();

  const verifyToken = async () => {
    if(userInfo){
      const resp = await getUsuario(userInfo.user, userInfo.tipousuario);
      if(resp.status == 503){
        dispatch(logout());
      }
    }
  }

  useEffect(()=>{
    verifyToken();
  },[]);

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
