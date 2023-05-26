import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Button,
  Row,
  Col,
  Typography,
  Descriptions,
  Tabs,
  Space,
  Popover,
  Popconfirm,
} from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import { QuestionCircleOutlined as QuestionIcon } from "@ant-design/icons";
import { MdInfoOutline as InfoIcon } from "react-icons/md";
import { getSorter, handleError } from "../../../../../tools/form-manager";
import DetailsTable from "../../../../common/details-table";
import ModalWindow from "../../../../common/modal-window";
import service from "../../../../../services/logistic/purchase/purchase-requests-service";

const { Text } = Typography;

const getPurchaseRequestItemsColumns = () => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "ItemID",
      sorter: getSorter("ItemID"),
      render: (ItemID) => (
        <Text>{ItemID > 0 ? utils.farsiNum(`${ItemID}`) : ""}</Text>
      ),
    },
    {
      title: Words.base_type,
      width: 120,
      align: "center",
      dataIndex: "BaseTypeTitle",
      sorter: getSorter("BaseTypeTitle"),
      render: (BaseTypeTitle) => (
        <Text style={{ color: Colors.magenta[6] }}> {BaseTypeTitle}</Text>
      ),
    },
    {
      title: Words.product_code,
      width: 150,
      align: "center",
      dataIndex: "ProductCode",
      sorter: getSorter("ProductCode"),
      render: (ProductCode) => (
        <Text style={{ color: Colors.orange[6] }}>
          {utils.farsiNum(ProductCode)}
        </Text>
      ),
    },
    {
      title: Words.product,
      width: 150,
      align: "center",
      dataIndex: "ProductTitle",
      sorter: getSorter("ProductTitle"),
      render: (ProductTitle) => (
        <Text style={{ color: Colors.cyan[6] }}>
          {utils.farsiNum(ProductTitle)}
        </Text>
      ),
    },
    {
      title: Words.request_count,
      width: 150,
      align: "center",
      dataIndex: "RequestCount",
      sorter: getSorter("RequestCount"),
      render: (RequestCount) => (
        <Text style={{ color: Colors.red[6] }}>
          {utils.farsiNum(RequestCount)}
        </Text>
      ),
    },
    {
      title: Words.need_date,
      width: 120,
      align: "center",
      dataIndex: "NeedDate",
      sorter: getSorter("NeedDate"),
      render: (NeedDate) => (
        <Text style={{ color: Colors.orange[6] }}>
          {utils.farsiNum(utils.slashDate(NeedDate))}
        </Text>
      ),
    },
    {
      title: Words.purchase_type,
      width: 120,
      align: "center",
      dataIndex: "PurchaseTypeTitle",
      sorter: getSorter("PurchaseTypeTitle"),
      render: (PurchaseTypeTitle) => (
        <Text style={{ color: Colors.green[6] }}>{PurchaseTypeTitle}</Text>
      ),
    },
    {
      title: Words.inquiry_deadline,
      width: 120,
      align: "center",
      dataIndex: "InquiryDeadline",
      sorter: getSorter("InquiryDeadline"),
      render: (InquiryDeadline) => (
        <Text
          style={{
            color: Colors.green[6],
          }}
        >
          {InquiryDeadline.length > 0
            ? utils.farsiNum(utils.slashDate(InquiryDeadline))
            : ""}
        </Text>
      ),
    },
    {
      title: Words.supplier,
      width: 200,
      align: "center",
      dataIndex: "SupplierTitle",
      sorter: getSorter("SupplierTitle"),
      render: (SupplierTitle) => (
        <Text style={{ color: Colors.purple[6] }}>
          {utils.farsiNum(SupplierTitle)}
        </Text>
      ),
    },
    {
      title: Words.purchasing_agent,
      width: 150,
      align: "center",
      //   dataIndex: "---",
      sorter: getSorter("AgentLastName"),
      render: (record) => (
        <Text
          style={{ color: Colors.grey[6] }}
        >{`${record.AgentFirstName} ${record.AgentLastName}`}</Text>
      ),
    },
    {
      title: Words.descriptions,
      width: 100,
      align: "center",
      render: (record) => (
        <>
          {record.DetailsText.length > 0 && (
            <Popover content={<Text>{record.DetailsText}</Text>}>
              <InfoIcon
                style={{
                  color: Colors.green[6],
                  fontSize: 19,
                  cursor: "pointer",
                }}
              />
            </Popover>
          )}
        </>
      ),
    },
    {
      title: "",
      fixed: "right",
      align: "center",
      width: 1,
      render: () => <></>,
    },
  ];

  return columns;
};

const PurchaseRequestDetailsModal = ({
  selectedObject,
  isOpen,
  onOk,
  onUndoApprove,
}) => {
  const valueColor = Colors.blue[7];

  const [progress, setProgress] = useState(false);
  const [hasUndoApproveAccess, setHasUndoApproveAccess] = useState(false);

  const {
    RequestID,
    //   StorageCenterID,
    StorageCenterTitle,
    //   FrontSideTypeID,
    FrontSideTypeTitle,
    //   FrontSideAccountID,
    FrontSideAccountTitle,
    // RegMemberID,
    RegFirstName,
    RegLastName,
    RequestDate,
    // RequestMemberID,
    RequestMemberFirstName,
    RequestMemberLastName,
    // RequestTypeID,
    RequestTypeTitle,
    StatusID,
    StatusTitle,
    // TafsilCode,
    // TafsilTypeID,
    // TafsilTypeTitle,
    RegDate,
    RegTime,
    DetailsText,
    Items,
  } = selectedObject;

  useMount(async () => {
    setProgress(true);

    try {
      //------ load params

      let data = await service.getParams();

      let { HasUndoApproveAccess } = data;

      setHasUndoApproveAccess(HasUndoApproveAccess);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const getFooterButtons = () => {
    return (
      <Space>
        {selectedObject !== null && selectedObject.StatusID === 2 && (
          <>
            {hasUndoApproveAccess && (
              <Popconfirm
                title={Words.questions.sure_to_undo_approve_purchase_request}
                onConfirm={onUndoApprove}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="undo-approve-confirm"
                disabled={progress}
              >
                <Button
                  key="undo-approve-button"
                  type="primary"
                  disabled={progress}
                >
                  {Words.undo_approve}
                </Button>
              </Popconfirm>
            )}
          </>
        )}

        <Button key="close-button" onClick={onOk}>
          {Words.close}
        </Button>
      </Space>
    );
  };

  const items = [
    {
      label: Words.inquiry_items,
      key: "inquiry-items",
      children: (
        <Row gutter={[0, 15]}>
          <Col xs={24}>
            <DetailsTable
              records={Items}
              columns={getPurchaseRequestItemsColumns()}
            />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        title={Words.more_details}
        footer={getFooterButtons()}
        showIcon={false}
        onCancel={onOk}
        width={1050}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24}>
            <Descriptions
              bordered
              column={{
                //   md: 2, sm: 2,
                lg: 3,
                md: 2,
                xs: 1,
              }}
              size="middle"
            >
              <Descriptions.Item label={Words.id}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(`${RequestID}`)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.storage_center}>
                <Text style={{ color: valueColor }}>{StorageCenterTitle}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.request_date}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(utils.slashDate(RequestDate))}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.front_side_type}>
                <Text style={{ color: valueColor }}>{FrontSideTypeTitle}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.front_side}>
                <Text style={{ color: valueColor }}>
                  {FrontSideAccountTitle}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.request_type}>
                <Text style={{ color: valueColor }}>{RequestTypeTitle}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.request_member}>
                <Text style={{ color: valueColor }}>
                  {`${RequestMemberFirstName} ${RequestMemberLastName}`}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.status} span={2}>
                <Text
                  style={{
                    color:
                      StatusID === 1
                        ? Colors.blue[6]
                        : StatusID === 2
                        ? Colors.green[6]
                        : Colors.red[6],
                  }}
                >
                  {StatusTitle}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.reg_member}>
                <Text
                  style={{ color: valueColor }}
                >{`${RegFirstName} ${RegLastName}`}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.reg_date_time} span={2}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(
                    `${utils.slashDate(RegDate)} - ${utils.colonTime(RegTime)}`
                  )}
                </Text>
              </Descriptions.Item>
              {DetailsText.length > 0 && (
                <Descriptions.Item label={Words.descriptions} span={3}>
                  <Text
                    style={{
                      color: Colors.purple[7],
                      whiteSpace: "pre-line",
                    }}
                  >
                    {utils.farsiNum(DetailsText)}
                  </Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
          <Col xs={24}>
            <Tabs type="card" defaultActiveKey="0" items={items} />
          </Col>
        </Row>
      </ModalWindow>
    </>
  );
};

export default PurchaseRequestDetailsModal;
