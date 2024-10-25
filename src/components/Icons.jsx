import {
    DeleteOutlined,
    EditOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";

export const IconDelete = ({ data, handleAction }) => {
    return (
        <Tooltip placement="top" title="Eliminar" className="mx-1">
            <Popconfirm
                title="Está segur@ de eliminar este registro?"
                onConfirm={() => handleAction(data)}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <DeleteOutlined style={{ fontSize: "17px", color: "red" }} />
            </Popconfirm>
        </Tooltip>
    );
};

export const IconEdit = ({ data, handleAction }) => {
    return (
        <Tooltip placement="top" title="Editar" className="mx-1">
            <a onClick={() => handleAction(data)}>
                <EditOutlined
                    style={{
                        fontSize: "17px",
                        color: "orange",
                    }}
                />
            </a>
        </Tooltip>
    );
};
