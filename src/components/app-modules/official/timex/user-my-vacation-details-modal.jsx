import React from "react";
import { Button, Modal } from "antd";
import Words from "../../../../resources/words";
import VacationDetails from "./vacation-details";

const UserMyVacationDetailsModal = ({ vacation, isOpen, onOk }) => {
  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="submit-button" type="primary" onClick={onOk}>
          {Words.confirm}
        </Button>,
      ]}
      onCancel={onOk}
      width={750}
    >
      <section>
        <article
          id="info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <VacationDetails vacation={vacation} />
        </article>
      </section>
    </Modal>
  );
};

export default UserMyVacationDetailsModal;
