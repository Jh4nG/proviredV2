
import { Modal } from "react-bootstrap"
import { Spin } from 'antd';

export const Loader = ({show}) => {
    return (
        <>
            {show && (
                <Modal 
                    show={show}
                    size="sm"
                    centered
                >
                    <div className="d-flex justify-content-center mt-4">
                        <Spin />
                    </div>
                    <h4 className="mb-4 text-center">
                        Un momento, por favor ...
                    </h4>
                </Modal>
            )}
        </>
    )
}