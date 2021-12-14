import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, message } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModaleChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import DateItem from "./../../../form-controls/date-item";
import SwitchItem from "./../../../form-controls/switch-item";
// import FileItem from "./../../../form-controls/file-item";
import TextItem from "./../../../form-controls/text-item";
import membersService from "./../../../../services/org/members-service";
import Colors from "../../../../resources/colors";
import utils from "./../../../../tools/utils";
// import { profileImageFileSize as fileConfig } from "./../../../../config.json";

const schema = {
  MemberID: Joi.number().required(),
  CityID: Joi.number().required().min(1),
  GenderID: Joi.number().required().min(1),
  FirstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/)
    .label(Words.first_name),
  LastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/)
    .label(Words.last_name),
  FixTel: Joi.string()
    .max(50)
    .allow("")
    .regex(/^[0-9]+$/)
    .label(Words.fix_tel),
  Mobile: Joi.string()
    .max(50)
    .allow("")
    .regex(/^[0-9]+$/)
    .label(Words.mobile),
  Address: Joi.string().max(200).allow("").label(Words.address),
  PostalCode: Joi.string()
    .max(50)
    .allow("")
    .regex(/^[0-9]+$/)
    .label(Words.postal_code),
  NationalCode: Joi.string()
    .max(10)
    .required()
    .regex(/^[0-9]+$/)
    .label(Words.national_code),
  BirthDate: Joi.string().allow("").label(Words.birth_date),
  PicFileName: Joi.string().max(50).allow("").label(Words.profile_image),
  Username: Joi.string()
    .min(8)
    .max(50)
    .required()
    .regex(/^[a-zA-Z0-9.\-()\s]+$/)
    .label(Words.username),
  Password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .regex(/^[a-zA-Z0-9.\-()\s]+$/)
    .label(Words.password),
  IsActive: Joi.boolean(),
};

const initRecord = {
  MemberID: 0,
  CityID: 0,
  GenderID: 0,
  FirstName: "",
  LastName: "",
  FixTel: "",
  Mobile: "",
  Address: "",
  PostalCode: "",
  NationalCode: "",
  BirthDate: "",
  PicFileName: "",
  Username: "",
  Password: "",
  IsActive: true,
};

const genders = [
  { GenderID: 1, GenderTitle: Words.male },
  { GenderID: 2, GenderTitle: Words.female },
];

const formRef = React.createRef();

// const getUploadProps = (fieldName, formConfig, fileList) => {
//   let {
//     // fileList,
//     setFileList,
//     record,
//     setRecord,
//     fileConfig,
//     loadFieldsValue,
//     formRef,
//   } = formConfig;
//   const { sizeType, maxFileSize } = fileConfig;

//   const props = {
//     onRemove: (file) => {
//       console.log("1>", record);
//       delete fileList[fieldName];
//       record[fieldName] = "";
//       setFileList(fileList);
//       setRecord(record);
//       console.log("2>", record);
//       loadFieldsValue(formRef, record);
//     },
//     beforeUpload: (file) => {
//       const validFileSize =
//         file.size / 1024 / (sizeType === "mb" ? 1024 : 1) <= maxFileSize;

//       if (!validFileSize) {
//         message.error(Words.limit_upload_file_size);

//         //prevent auto upload
//         return false;
//       }

//       fileList[fieldName] = file;
//       record[fieldName] = file.name;

//       console.log(fileList);
//       setFileList(fileList);
//       loadFieldsValue(formRef, record);

//       //prevent auto upload
//       return false;
//     },
//     fileList: fileList[fieldName] ? [fileList[fieldName]] : [],
//   };

//   return props;
// };

const MemberModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [progress, setProgress] = useState(false);
  const [record, setRecord] = useState(initRecord);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceID, setSelectedProvinceID] = useState(0);
  const [cities, setCities] = useState([]);
  // const [fileList, setFileList] = useState({});
  const [errors, setErrors] = useState({});

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
    // fileList,
    // setFileList,
    // fileConfig,
  };

  const clearRecord = () => {
    record.CityID = 0;
    record.GenderID = 0;
    record.FirstName = "";
    record.LastName = "";
    record.FixTel = "";
    record.Mobile = "";
    record.Address = "";
    record.PostalCode = "";
    record.NationalCode = "";
    record.BirthDate = "";
    record.PicFileName = "";
    record.Username = "";
    record.Password = "";
    record.IsActive = true;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    initModal(formRef, selectedObject, setRecord);

    const data = await membersService.getParams();

    setProvinces(data.Provinces);
    setCities(data.Cities);

    setSelectedProvinceID(
      selectedObject !== null ? selectedObject.ProvinceID : 0
    );
  });

  const isEdit = selectedObject !== null;

  if (isEdit) {
    schema.Password = Joi.string()
      .min(8)
      .max(50)
      .allow("")
      .regex(/^[a-zA-Z0-9.\-()\s]+$/)
      .label(Words.password);
  }

  const handleSubmit = async () => {
    saveModaleChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  const handleSelectProvince = (value) => {
    setSelectedProvinceID(value);
  };

  const getCities = () => {
    const selectedCities = cities.filter(
      (c) => c.ProvinceID === selectedProvinceID
    );
    return selectedCities;
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={650}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]}>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.first_name}
              fieldName="FirstName"
              required
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.last_name}
              fieldName="LastName"
              maxLength={50}
              required
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.national_code}
              fieldName="NationalCode"
              maxLength={10}
              required
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.gender}
              dataSource={genders}
              keyColumn="GenderID"
              valueColumn="GenderTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.birth_date}
              fieldName="BirthDate"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.fix_tel}
              fieldName="FixTel"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.mobile}
              fieldName="Mobile"
              maxLength={11}
              required
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.postal_code}
              fieldName="PostalCode"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.province}
              dataSource={provinces}
              keyColumn="ProvinceID"
              valueColumn="ProvinceTitle"
              onChange={handleSelectProvince}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.city}
              dataSource={getCities()}
              keyColumn="CityID"
              valueColumn="CityTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24}>
            <InputItem
              title={Words.address}
              fieldName="Address"
              maxLength={200}
              multiline
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.username}
              fieldName="Username"
              maxLength={50}
              required
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.password}
              fieldName="Password"
              maxLength={50}
              required={!isEdit}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.status}
              fieldName="IsActive"
              initialValue={true}
              checkedTitle={Words.active}
              unCheckedTitle={Words.inactive}
              formConfig={formConfig}
            />
          </Col>
          {/* <Col xs={24} md={12}>
            <FileItem
              horizontal
              rows={1}
              title={Words.profile_image}
              fieldName="PicFileName"
              formConfig={formConfig}
              // errors={errors}
              //maxFileSize={maxFileSize}
              uploadProps={getUploadProps}
              fileList={fileList}
            />
          </Col> */}
          {isEdit && (
            <>
              <Col xs={24} md={12}>
                <TextItem
                  title={Words.reg_member}
                  value={`${record.RegFirstName} ${record.RegLastName}`}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
              <Col xs={24} md={12}>
                <TextItem
                  title={Words.reg_date_time}
                  value={utils.formattedDateTime(
                    record.RegDate,
                    record.RegTime
                  )}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default MemberModal;
