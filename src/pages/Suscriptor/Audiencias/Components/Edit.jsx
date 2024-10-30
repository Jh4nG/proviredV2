import { Modal } from "antd";
export const EditAudiencia = ({ show, setShow }) => {
    return (
        <Modal
            title="Modal 1000px width"
            centered
            open={show}
            onOk={() => setShow(false)}
            okText="Guardar"
            onCancel={() => setShow(false)}
            cancelText="Cancelar"
            width={1000}
            maskClosable={false}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    );
};
