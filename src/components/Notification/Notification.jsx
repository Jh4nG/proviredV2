import React, { useEffect } from "react";
import { notification } from "antd";

const Context = React.createContext({
    name: "Default",
});
export const NotificationComponent = ({ resp }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        if (resp.type) {
            api[resp.type]({
                message:
                    resp.type == "success"
                        ? "Éxito"
                        : resp.type == "warining"
                        ? "Advertencia"
                        : resp.type == "info"
                        ? "Información"
                        : "Error",
                description: (
                    <Context.Consumer>
                        {({ name }) => resp.text}
                    </Context.Consumer>
                ),
                placement: resp.placement,
                showProgress: true,
                pauseOnHover: true,
            });
        }
    };

    useEffect(() => {
        openNotification();
    }, [resp]);
    return <>{contextHolder}</>;
};
