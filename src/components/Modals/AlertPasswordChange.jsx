import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const AlertPasswordChange = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/dashboard/changePassword");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Attention"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>
          Please update your password to continue using the app securely. Thank
          you.
        </p>
      </Modal>
    </>
  );
};
export default AlertPasswordChange;
