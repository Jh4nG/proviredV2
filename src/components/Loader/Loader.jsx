import { Modal } from "react-bootstrap";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loader = ({ show }) => {
    return (
        <>
            {show && (
                <Modal show={show} size="sm" centered>
                    <div className="d-flex justify-content-center mt-4 mb-3">
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="large"
                        />
                    </div>
                    <h4 className="mb-4 text-center">
                        Un momento, por favor ...
                    </h4>
                </Modal>
            )}
        </>
    );
};
