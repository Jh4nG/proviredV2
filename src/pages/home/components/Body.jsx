import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { buscarPorKey } from "../../../hooks/useMenu";

export const BodyComponent = ({ items, itemSelected }) => {
    const [title, setTitle] = useState("");
    useEffect(() => {
        setTitle(buscarPorKey(items, itemSelected)?.label);
    }, [itemSelected, items]);

    return (
        <div className="contain_body p-4">
            <h4 className="mb-5 fw-bold">{title}</h4>
            <Outlet />
        </div>
    );
};
