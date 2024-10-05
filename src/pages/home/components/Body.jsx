import { Outlet } from "react-router-dom"

export const BodyComponent = ()=> {
    return (
        <div className="contain_body">
            <Outlet />
        </div>
    )
}