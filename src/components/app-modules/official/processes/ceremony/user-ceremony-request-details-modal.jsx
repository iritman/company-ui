import React from "react";
import { Button, Modal } from "antd";
import Words from "../../../../../resources/words";
import CeremonyRequestDetails from "./ceremony-request-details";

const UserCeremonyRequestDetailsModal = ({ request, isOpen, onOk }) => {
  const getFooterButtons = () => {
    let buttons = [
      <Button key="close-button" onClick={onOk}>
        {Words.close}
      </Button>,
    ];

    return buttons;
  };

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={getFooterButtons()}
      onCancel={onOk}
      width={750}
    >
      <section>
        <article
          id="info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <CeremonyRequestDetails request={request} />
        </article>
      </section>
    </Modal>
  );
};

export default UserCeremonyRequestDetailsModal;
