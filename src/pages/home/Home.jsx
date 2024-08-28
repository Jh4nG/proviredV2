import { useDispatch } from "react-redux"
import { logout } from "../../store/auth/authSlice";

export const Home = () => {

    const dispatch = useDispatch();

    const closeSession = () => {
        dispatch(logout());
    }
    return(
        <>
            Bienvenido!!!
            <button onClick={closeSession}>Cerrar</button>
        </>
    )
}