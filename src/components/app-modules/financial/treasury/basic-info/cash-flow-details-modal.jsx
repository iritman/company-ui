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
} from "antd";
import { DownOutlined as DownIcon } from "@ant-design/icons";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import service from "../../../../../services/financial/treasury/basic-info/cash-flows-service";
import { handleError } from "../../../../../tools/form-manager";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const CashFlowDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    CashFlowID,
    Title,
    MoeinID,
    MoeinTitle,
    MoeinCode,
    ShowInReceiptOperation,
    ShowInPaymentOperation,
    ShowInFundSummaryOperation,
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

  const getShowInOperations = () => {
    let result = "";

    if (ShowInReceiptOperation) result = `${result} - ${Words.receipt}`;
    if (ShowInPaymentOperation) result = `${result} - ${Words.payment}`;
    if (ShowInFundSummaryOperation)
      result = `${result} - ${Words.fund_summary}`;

    if (result.length > 0) result = result.substring(3);
    else result = "-";

    return result;
  };

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
      width={750}
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
                      {utils.farsiNum(`#${CashFlowID} - ${Title}`)}
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
                  <Descriptions.Item label={Words.account_moein}>
                    <Text style={{ color: Colors.cyan[6] }}>{MoeinTitle}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.moein_code}>
                    <Text style={{ color: valueColor }}>
                      {utils.farsiNum(MoeinCode)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={Words.show_in_operation} span={2}>
                    <Text style={{ color: valueColor }}>
                      {getShowInOperations()}
                    </Text>
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

export default CashFlowDetailsModal;
