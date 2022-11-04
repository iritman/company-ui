import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Button,
  Modal,
  Spin,
  Row,
  Col,
  Typography,
  Descriptions,
  Tree,
  Alert,
  Space,
} from "antd";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import { DownOutlined as DownIcon } from "@ant-design/icons";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import service from "../../../../../services/financial/treasury/basic-info/financial-operations-service";
import { handleError } from "../../../../../tools/form-manager";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const FinancialOperationDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    OperationID,
    Title,
    // OperationTypeID,
    OperationTypeTitle,
    // ItemTypeID,
    ItemTypeTitle,
    MoeinID,
    MoeinTitle,
    MoeinCode,
    // PaperNatureID,
    PaperNatureTitle,
    // DurationTypeID,
    DurationTypeTitle,
    IsDefault,
    IsActive,
    TafsilTypeID4,
    TafsilTypeTitle4,
    // FixSide4,
    TafsilTypeID5,
    TafsilTypeTitle5,
    // FixSide5,
    TafsilTypeID6,
    TafsilTypeTitle6,
    // FixSide6,
  } = selectedObject;

  const [progress, setProgress] = useState([]);
  const [tafsilTypes, setTafsilTypes] = useState([]);

  useMount(async () => {
    setProgress(true);

    try {
      const data = await service.getParams();

      let { TafsilTypes } = data;

      setTafsilTypes(TafsilTypes);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  //------

  const getTafsilTypeLevels = () => {
    let levels = [];

    tafsilTypes
      .filter((tt) => tt.MoeinID === MoeinID)
      .forEach((tt) => {
        if (!levels.find((l) => l.LevelID === tt.LevelID)) {
          levels = [
            ...levels,
            {
              LevelID: tt.LevelID,
              Title: utils.farsiNum(`${Words.level} ${tt.LevelID}`),
            },
          ];
        }
      });

    return levels;
  };

  const levels = getTafsilTypeLevels();

  const getTafsilTypesData = () => {
    let nodes = [];

    //------

    levels.forEach((level) => {
      nodes = [
        ...nodes,
        {
          title: (
            <Text style={{ color: Colors.volcano[6] }}>{level.Title}</Text>
          ),
          key: level.LevelID,
        },
      ];
    });

    //------

    nodes.forEach((node) => {
      const data = tafsilTypes.filter(
        (tt) => tt.MoeinID === MoeinID && tt.LevelID === node.key
      );

      if (data.length > 0) {
        let children = [];

        data.forEach((tafsil_type) => {
          children = [
            ...children,
            {
              title: (
                <Text style={{ color: Colors.blue[7] }}>
                  {tafsil_type.Title}
                </Text>
              ),
              key: `tafsil_type_id_${tafsil_type.TafsilTypeID}`,
            },
          ];
        });

        node.children = [...children];
      }
    });

    //------

    return nodes;
  };

  //------

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="close-button" onClick={onOk}>
          {Words.close}
        </Button>,
      ]}
      onCancel={onOk}
      width={800}
    >
      <Spin spinning={progress}>
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
                      {utils.farsiNum(`#${OperationID} - ${Title}`)}
                    </Text>
                  }
                  type="info"
                />
              </Col>
              <Col xs={24}>
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
                  <Descriptions.Item label={Words.financial_operation_type}>
                    <Text style={{ color: Colors.green[6] }}>
                      {OperationTypeTitle}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.account_moein}>
                    <Text style={{ color: Colors.cyan[6] }}>{MoeinTitle}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.moein_code}>
                    <Text style={{ color: valueColor }}>
                      {utils.farsiNum(MoeinCode)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.item_type}>
                    <Text style={{ color: valueColor }}>{ItemTypeTitle}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.paper_nature}>
                    <Text style={{ color: valueColor }}>
                      {PaperNatureTitle}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.duration_type}>
                    <Text style={{ color: valueColor }}>
                      {DurationTypeTitle}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.is_default}>
                    <Text style={{ color: valueColor }}>
                      {`${IsDefault ? Words.yes : Words.no} `}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.status}>
                    <Space>
                      {IsActive ? (
                        <CheckIcon style={{ color: Colors.green[6] }} />
                      ) : (
                        <LockIcon style={{ color: Colors.red[6] }} />
                      )}

                      <Text style={{ color: valueColor }}>
                        {`${IsActive ? Words.active : Words.inactive} `}
                      </Text>
                    </Space>
                  </Descriptions.Item>
                  {TafsilTypeID4 > 0 && (
                    <Descriptions.Item
                      label={utils.farsiNum(Words.tafsil_type_level_4)}
                      span={2}
                    >
                      <Text style={{ color: Colors.purple[6] }}>
                        {TafsilTypeTitle4}
                      </Text>
                    </Descriptions.Item>
                  )}
                  {TafsilTypeID5 > 0 && (
                    <Descriptions.Item
                      label={utils.farsiNum(Words.tafsil_type_level_5)}
                      span={2}
                    >
                      <Text style={{ color: Colors.purple[6] }}>
                        {TafsilTypeTitle5}
                      </Text>
                    </Descriptions.Item>
                  )}
                  {TafsilTypeID6 > 0 && (
                    <Descriptions.Item
                      label={utils.farsiNum(Words.tafsil_type_level_6)}
                      span={2}
                    >
                      <Text style={{ color: Colors.purple[6] }}>
                        {TafsilTypeTitle6}
                      </Text>
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item
                    label={Words.related_tafsil_levels}
                    span={2}
                  >
                    <Tree
                      showLine
                      switcherIcon={<DownIcon />}
                      treeData={getTafsilTypesData()}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </article>
        </section>
      </Spin>
    </Modal>
  );
};

export default FinancialOperationDetailsModal;
