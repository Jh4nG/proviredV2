
import { Modal } from "react-bootstrap"
// import { SunspotLoader } from "react-awesome-loaders"

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
                        {/* <SunspotLoader
                            gradientColors={["#2e58a6", "#110979"]}
                            shadowColor={"#3730A3"}
                            desktopSize={"30px"}
                            mobileSize={"100px"}
                        /> */}
                    </div>
                    <h4 className="mb-4 text-center">
                        Un momento, por favor ...
                    </h4>
                </Modal>
            )}
        </>
    )
}