// import { CButton, CSpinner } from "@coreui/react";
import Spinnner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function SpinningButton({loading=false, text="Button", onClick, type="button" }){
    const spinnerVisiblty = loading ? "visible": "invisible";
    return (
        <>
            <Button className="pl-1 pr-4 border-sre bg-sre text-white text-nowrap text-center" type={type} disabled={loading} onClick={onClick}>
                <Spinnner className={spinnerVisiblty} as="span" animation="border" color="white" size="sm" />
                <span className="m-0 ml-1">{text}</span>
            </Button>
        </>
    );
}

SpinningButton.propTypes = {
    loading: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string
}

export default SpinningButton;