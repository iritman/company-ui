import React from "react";
// , { useState }
import { Button, Modal } from "antd";
// import {
//   SnippetsOutlined as ReportIcon,
//   MessageOutlined as MessageIcon,
// } from "@ant-design/icons";
import Words from "../../../../../resources/words";
// import utils from "../../../../../tools/utils";
import PersonalTransferDetails from "./personal-transfer-details";
// import ReportsModal from "./user-personal-transfer-reports-modal";
// import ResponseModal from "./user-personal-transfer-reg-response-modal";

const UserPersonalTransferDetailsModal = ({ transfer, isOpen, onOk }) => {
  //   const [showResponseModal, setShowResponseModal] = useState(false);

  //   const { Actions } = transfer;

  const getFooterButtons = () => {
    let buttons = [
      <Button key="close-button" onClick={onOk}>
        {Words.close}
      </Button>,
    ];

    // if (Actions[1].MemberID > 0 && Actions[2].MemberID === 0) {
    //   buttons = [
    //     <Button
    //       key="response-button"
    //       type="primary"
    //       onClick={() => setShowResponseModal(true)}
    //       icon={<MessageIcon />}
    //     >
    //       {`${Words.submit_response}`}
    //     </Button>,
    //     ...buttons,
    //   ];
    // }

    // buttons = [
    //   <Button
    //     key="reports-button"
    //     type="primary"
    //     danger
    //     onClick={() => setShowReportsModal(true)}
    //     icon={<ReportIcon />}
    //   >
    //     {`${Words.reports}${
    //       Reports.length > 0 ? utils.farsiNum(` (${Reports.length})`) : ""
    //     }`}
    //   </Button>,
    //   ...buttons,
    // ];

    return buttons;
  };

  return (
    <>
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
            <PersonalTransferDetails transfer={transfer} />
          </article>
        </section>
      </Modal>

      {/* {showReportsModal && (
        <ReportsModal
          isOpen={showReportsModal}
          onRegReport={onRegReport}
          onDeleteReport={onDeleteReport}
          onCancel={() => setShowReportsModal(false)}
          transfer={transfer}
        />
      )} */}

      {/* {showResponseModal && (
        <ResponseModal
          isOpen={showResponseModal}
          onOk={onResponse}
          onCancel={() => setShowResponseModal(false)}
          transfer={transfer}
        />
      )} */}
    </>
  );
};

export default UserPersonalTransferDetailsModal;
