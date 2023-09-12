import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Wrapper from "./Wrapper";
import Input from "./Input";
import "./styles.css";
import Button from "./Button";
import Modal from "./Modal";

const PortalModal = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-red-500 text-center">PlayGround</h1>
            <Wrapper className="p-2">
                <Input />
            </Wrapper>
            <Wrapper className="p-2">
                <Button onClick={handleShowModal}>Show Modal</Button>
                {showModal && <Modal onCancel={handleCloseModal} />}
            </Wrapper>
        </div>
    );
}

export default PortalModal;