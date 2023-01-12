import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Descriptions,
  Space,
  Alert,
  Tabs,
} from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import DetailsTable from "../../../../common/details-table";
import { getSorter } from "../../../../../tools/form-manager";

const { Text } = Typography;

const getStoresColumns = () => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "StoreID",
      sorter: getSorter("StoreID"),
      render: (StoreID) => <Text>{utils.farsiNum(`${StoreID}`)}</Text>,
    },
    {
      title: Words.title,
      width: 120,
      align: "center",
      dataIndex: "Title",
      sorter: getSorter("Title"),
      render: (Title) => (
        <Text
          style={{
            color: Colors.cyan[7],
          }}
        >
          {Title}
        </Text>
      ),
    },
    {
      title: Words.storage_center,
      width: 120,
      align: "center",
      dataIndex: "StorageCenterTitle",
      sorter: getSorter("StorageCenterTitle"),
      render: (StorageCenterTitle) => (
        <Text
          style={{
            color: Colors.orange[7],
          }}
        >
          {StorageCenterTitle}
        </Text>
      ),
    },
    {
      title: Words.status,
      width: 120,
      align: "center",
      dataIndex: "IsActive",
      sorter: getSorter("IsActive"),
      render: (IsActive) => (
        <Text
          style={{
            color: IsActive ? Colors.green[6] : Colors.red[6],
          }}
        >
          {IsActive ? Words.active : Words.inactive}
        </Text>
      ),
    },
  ];

  return columns;
};

const UserProductDetailsModal = ({ product, isOpen, onOk, onSeen }) => {
  const valueColor = Colors.blue[7];

  const {
    ProductID,
    ProductCode,
    CategoryTitle,
    NatureTitle,
    Title,
    IsBuyable,
    IsSalable,
    IsBuildable,
    IsFixProperty,
    IsSparePart,
    DetailsText,
    BachPatternTitle,
    Stores,
  } = product;

  const items = [
    {
      label: Words.main_info,
      key: "main-info",
      children: (
        <Descriptions
          bordered
          column={{
            //   md: 2, sm: 2,
            lg: 2,
            md: 2,
            xs: 1,
          }}
          size="middle"
        >
          <Descriptions.Item label={Words.id}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${ProductID}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.product_code}>
            <Text style={{ color: Colors.red[7] }}>
              {utils.farsiNum(ProductCode)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.product_category}>
            <Text style={{ color: Colors.green[6] }}>{CategoryTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.product_nature}>
            <Text style={{ color: Colors.blue[6] }}>{NatureTitle}</Text>
          </Descriptions.Item>

          <Descriptions.Item label={Words.status}>
            <Space direction="vertical">
              {IsBuyable && (
                <Text style={{ color: Colors.magenta[6] }}>
                  {Words.is_buyable}
                </Text>
              )}
              {IsSalable && (
                <Text style={{ color: Colors.magenta[6] }}>
                  {Words.is_salable}
                </Text>
              )}
              {IsBuildable && (
                <Text style={{ color: Colors.magenta[6] }}>
                  {Words.is_buildable}
                </Text>
              )}
              {IsFixProperty && (
                <Text style={{ color: Colors.magenta[6] }}>
                  {Words.fix_property}
                </Text>
              )}
              {IsSparePart && (
                <Text style={{ color: Colors.magenta[6] }}>
                  {Words.spare_part}
                </Text>
              )}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      label: Words.descriptions,
      key: "descriptions",
      children: (
        <>
          {DetailsText.length > 0 ? (
            <Text
              style={{
                color: Colors.purple[7],
                whiteSpace: "pre-line",
              }}
            >
              {utils.farsiNum(DetailsText)}
            </Text>
          ) : (
            <Alert message={Words.empty_data} type="warning" showIcon />
          )}
        </>
      ),
    },
    {
      label: Words.bach_pattern,
      key: "bach-pattern",
      children: (
        <Text
          style={{
            color: Colors.orange[6],
          }}
        >
          {BachPatternTitle}
        </Text>
      ),
    },
    {
      label: Words.store,
      key: "stores",
      children: (
        <Col xs={24}>
          <DetailsTable records={Stores} columns={getStoresColumns()} />
        </Col>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="close-button" onClick={onOk}>
          {Words.close}
        </Button>,
      ]}
      onCancel={onOk}
      width={1050}
    >
      <section>
        <article
          id="info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <Alert
                message={
                  <Text style={{ fontSize: 14 }}>
                    {utils.farsiNum(
                      `#${ProductID} - ${Title} (${ProductCode})`
                    )}
                  </Text>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Tabs defaultActiveKey="1" type="card" items={items} />
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserProductDetailsModal;
