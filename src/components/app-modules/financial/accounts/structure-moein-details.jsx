import React from "react";
import { Descriptions, Typography, Space, Alert } from "antd";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import utils from "../../../../tools/utils";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const StructureMoeinDetails = ({ moein }) => {
  const {
    MoeinID,
    GeneralMoeinCode,
    Title,
    AccountTypeTitle,
    NatureTitle,
    CurrencyTitle,
    DetailsText,
    IsActive,
    IsConvertable,
    ControlTypeTitle,
  } = moein;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert type="info" message={Title} />

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
            {utils.farsiNum(`${MoeinID}`)}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label={Words.moein_code}>
          <Text style={{ color: Colors.red[6] }}>
            {utils.farsiNum(`${GeneralMoeinCode}`)}
          </Text>
        </Descriptions.Item>
        {/* <Descriptions.Item label={Words.title} span={2}>
          <Text style={{ color: Colors.cyan[6] }}>
            {utils.farsiNum(`${Title}`)}
          </Text>
        </Descriptions.Item>  */}
        <Descriptions.Item label={Words.account_type}>
          <Text style={{ color: valueColor }}>{AccountTypeTitle}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={Words.nature}>
          <Text style={{ color: valueColor }}>{NatureTitle}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={Words.default_currency}>
          <Text style={{ color: valueColor }}>{CurrencyTitle}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={Words.account_control_type}>
          <Text style={{ color: valueColor }}>{ControlTypeTitle}</Text>
        </Descriptions.Item>
        {DetailsText.length > 0 && (
          <Descriptions.Item label={Words.descriptions} span={2}>
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
        <Descriptions.Item label={Words.is_convertable}>
          <Text
            style={{ color: IsConvertable ? Colors.green[6] : Colors.red[6] }}
          >
            {`${IsConvertable ? Words.yes : Words.no} `}
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
      </Descriptions>
    </Space>
  );
};

export default StructureMoeinDetails;