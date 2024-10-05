import { CloseButton, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"

export const ModalTerminos = ({show, setModal, parametro, redirectHome}) => {

    return (
        <>
            <Modal
                show={show}
                size="xl"
                centered
            >
                <ModalHeader>
                    <h3>Términos y condiciones</h3>
                    <CloseButton onClick={()=>setModal(false)}/>
                </ModalHeader>
                <ModalBody>
                    <textarea className="w-100" name="terminosText" id="terminosText" readOnly style={{ height: '50vh'}} defaultValue={parametro.msg} />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn__primary" onClick={()=>redirectHome(parametro.user, parametro.tipousuario, parametro.token)}>Aceptar</button>
                    <button className="btn btn__cancel" onClick={()=>setModal(false)}>No acepto</button>
                </ModalFooter>
            </Modal>
        </>
    )
}