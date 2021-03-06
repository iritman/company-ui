import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Form,
  Row,
  Col,
  Tabs,
  Alert,
  Button,
  Space,
  Typography,
  Popconfirm,
} from "antd";
import {
  PlusOutlined as PlusIcon,
  EditOutlined as EditIcon,
  QuestionCircleOutlined as QuestionIcon,
  DeleteOutlined as DeleteIcon,
  CheckOutlined as CheckIcon,
} from "@ant-design/icons";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import service from "../../../../services/financial/store-mgr/user-products-service";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import SwitchItem from "./../../../form-controls/switch-item";
import { getSorter, handleError } from "./../../../../tools/form-manager";
import DetailsTable from "./../../../common/details-table";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";
import FeatureModal from "./user-product-feature-modal";
import MeasureUnitModal from "./user-product-measure-unit-modal";

const { TabPane } = Tabs;
const { Text } = Typography;

const getFeaturesColumns = (access, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "PFID",
      sorter: getSorter("PFID"),
      render: (PFID) => <Text>{utils.farsiNum(`${PFID}`)}</Text>,
    },
    {
      title: Words.feature,
      width: 120,
      align: "center",
      dataIndex: "Title",
      sorter: getSorter("Title"),
      render: (Title) => (
        <Text
          style={{
            color: Colors.red[7],
          }}
        >
          {Title}
        </Text>
      ),
    },
    {
      title: Words.value,
      width: 150,
      align: "center",
      dataIndex: "FeatureValue",
      sorter: getSorter("FeatureValue"),
      render: (FeatureValue) => (
        <Text style={{ color: Colors.green[7] }}>{FeatureValue}</Text>
      ),
    },
  ];

  if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
    columns = [
      ...columns,
      {
        title: "",
        fixed: "right",
        align: "center",
        width: 75,
        render: (record) => (
          <Space>
            {access.CanEdit && onEdit && (
              <Button
                type="link"
                icon={<EditIcon />}
                onClick={() => onEdit(record)}
              />
            )}

            {access.CanDelete && onDelete && (
              <Popconfirm
                title={Words.questions.sure_to_delete_feature}
                onConfirm={async () => await onDelete(record.PFID)}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
              >
                <Button type="link" icon={<DeleteIcon />} danger />
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];
  }

  return columns;
};

const getMeasureUnitsColumns = (access, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "PMID",
      sorter: getSorter("PMID"),
      render: (PMID) => <Text>{utils.farsiNum(`${PMID}`)}</Text>,
    },
    {
      title: Words.measure_unit,
      width: 120,
      align: "center",
      dataIndex: "MeasureUnitTitle",
      sorter: getSorter("MeasureUnitTitle"),
      render: (MeasureUnitTitle) => (
        <Text
          style={{
            color: Colors.red[7],
          }}
        >
          {MeasureUnitTitle}
        </Text>
      ),
    },
    {
      title: Words.measure_type,
      width: 150,
      align: "center",
      dataIndex: "MeasureTypeTitle",
      sorter: getSorter("MeasureTypeTitle"),
      render: (MeasureTypeTitle) => (
        <Text style={{ color: Colors.green[7] }}>{MeasureTypeTitle}</Text>
      ),
    },
    {
      title: Words.default,
      width: 75,
      align: "center",
      dataIndex: "IsDefault",
      sorter: getSorter("IsDefault"),
      render: (IsDefault) => (
        <>{IsDefault && <CheckIcon style={{ color: Colors.green[6] }} />}</>
      ),
    },
  ];

  if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
    columns = [
      ...columns,
      {
        title: "",
        fixed: "right",
        align: "center",
        width: 75,
        render: (record) => (
          <Space>
            {access.CanEdit && onEdit && (
              <Button
                type="link"
                icon={<EditIcon />}
                onClick={() => onEdit(record)}
              />
            )}

            {access.CanDelete && onDelete && (
              <Popconfirm
                title={Words.questions.sure_to_delete_measure_unit}
                onConfirm={async () => await onDelete(record.PMID)}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
              >
                <Button type="link" icon={<DeleteIcon />} danger />
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];
  }

  return columns;
};

const schema = {
  ProductID: Joi.number().required(),
  CategoryID: Joi.number().min(1).required().label(Words.product_category),
  NatureID: Joi.number().min(1).required().label(Words.product_nature),
  ProductCode: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.product_code)
    .regex(utils.VALID_REGEX),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  IsBuyable: Joi.boolean(),
  IsSalable: Joi.boolean(),
  IsBuildable: Joi.boolean(),
};

const initRecord = {
  ProductID: 0,
  CategoryID: 0,
  NatureID: 0,
  ProductCode: "",
  Title: "",
  IsBuyable: false,
  IsSalable: false,
  IsBuildable: false,
};

const formRef = React.createRef();

const UserProductModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveFeature,
  onDeleteFeature,
  onSaveMeasureUnit,
  onDeleteMeasureUnit,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [categories, setCategories] = useState([]);
  const [natures, setNatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [measureUnits, setMeasureUnits] = useState([]);
  //---
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  //---
  const [showMeasureUnitModal, setShowMeasureUnitModal] = useState(false);
  const [selectedMeasureUnit, setSelectedMeasureUnit] = useState(null);
  //---

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.CategoryID = 0;
    record.NatureID = 0;
    record.ProductCode = "";
    record.Title = "";
    record.IsBuyable = false;
    record.IsSalable = false;
    record.IsBuildable = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);

    setProgress(true);
    try {
      const data = await service.getParams();

      const { Categories, Natures, Features, MeasureUnits } = data;

      setCategories(Categories);
      setNatures(Natures);
      setFeatures(Features);
      setMeasureUnits(MeasureUnits);
    } catch (ex) {
      handleError(ex);
    }
    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  //   const handleTabChange = (key) => {
  //     console.log(key);
  //   };

  const handleShowFeatureModal = () => {
    setSelectedFeature(null);
    setShowFeatureModal(true);
  };

  const handleHideFeatureModal = () => {
    setSelectedFeature(null);
    setShowFeatureModal(false);
  };

  const handleEditFeature = (feature) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  //-----------------

  const handleShowMeasureUnitModal = () => {
    setSelectedMeasureUnit(null);
    setShowMeasureUnitModal(true);
  };

  const handleHideMeasureUnitModal = () => {
    setSelectedMeasureUnit(null);
    setShowMeasureUnitModal(false);
  };

  const handleEditMeasureUnit = (measureUnit) => {
    setSelectedMeasureUnit(measureUnit);
    setShowMeasureUnitModal(true);
  };

  //-----------------

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={validateForm({ record, schema }) && true}
        onClear={clearRecord}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        width={750}
      >
        <Row gutter={[2, 5]}>
          {selectedObject && (
            <Col xs={24}>
              <Alert
                type="info"
                showIcon
                message={`#${selectedObject.ProductID} ${selectedObject.Title} - ${selectedObject.ProductCode}`}
              />
            </Col>
          )}
          <Col xs={24}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              //   onChange={handleTabChange}
            >
              <TabPane tab={Words.product} key="1">
                <Form ref={formRef} name="dataForm">
                  <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
                    <Col xs={24} md={12}>
                      <InputItem
                        title={Words.title}
                        fieldName="Title"
                        maxLength={50}
                        formConfig={formConfig}
                        required
                        autoFocus
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <InputItem
                        title={Words.product_code}
                        fieldName="ProductCode"
                        maxLength={50}
                        formConfig={formConfig}
                        required
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <DropdownItem
                        title={Words.product_category}
                        dataSource={categories}
                        keyColumn="CategoryID"
                        valueColumn="Title"
                        formConfig={formConfig}
                        required
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <DropdownItem
                        title={Words.product_nature}
                        dataSource={natures}
                        keyColumn="NatureID"
                        valueColumn="Title"
                        formConfig={formConfig}
                        required
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <SwitchItem
                        title={Words.is_buyable}
                        fieldName="IsBuyable"
                        initialValue={false}
                        checkedTitle={Words.yes}
                        unCheckedTitle={Words.no}
                        formConfig={formConfig}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <SwitchItem
                        title={Words.is_salable}
                        fieldName="IsSalable"
                        initialValue={false}
                        checkedTitle={Words.yes}
                        unCheckedTitle={Words.no}
                        formConfig={formConfig}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <SwitchItem
                        title={Words.is_buildable}
                        fieldName="IsBuildable"
                        initialValue={false}
                        checkedTitle={Words.yes}
                        unCheckedTitle={Words.no}
                        formConfig={formConfig}
                      />
                    </Col>
                  </Row>
                </Form>
              </TabPane>
              {selectedObject && (
                <>
                  <TabPane tab={Words.features} key="2">
                    <Row gutter={[2, 5]}>
                      <Col xs={24}>
                        <Button
                          type="primary"
                          icon={<PlusIcon />}
                          onClick={handleShowFeatureModal}
                        >
                          {Words.new_feature}
                        </Button>
                      </Col>
                      <Col xs={24}>
                        <DetailsTable
                          records={selectedObject.Features}
                          columns={getFeaturesColumns(
                            access,
                            handleEditFeature, // handle edit feature
                            onDeleteFeature // handle delete feature
                          )}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={Words.measure_units} key="3">
                    <Row gutter={[2, 5]}>
                      <Col xs={24}>
                        <Button
                          type="primary"
                          icon={<PlusIcon />}
                          onClick={handleShowMeasureUnitModal}
                        >
                          {Words.new_measure_unit}
                        </Button>
                      </Col>
                      <Col xs={24}>
                        <DetailsTable
                          records={selectedObject.MeasureUnits}
                          columns={getMeasureUnitsColumns(
                            access,
                            handleEditMeasureUnit, // handle edit measure unit
                            onDeleteMeasureUnit // handle delete measure unit
                          )}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={Words.measure_converts} key="4">
                    Content of Tab Pane 4
                  </TabPane>
                </>
              )}
            </Tabs>
          </Col>
        </Row>
      </ModalWindow>

      {showFeatureModal && (
        <FeatureModal
          isOpen={showFeatureModal}
          product={selectedObject}
          selectedFeature={selectedFeature}
          features={features}
          onOk={onSaveFeature}
          onCancel={handleHideFeatureModal}
        />
      )}

      {showMeasureUnitModal && (
        <MeasureUnitModal
          isOpen={showMeasureUnitModal}
          product={selectedObject}
          selectedMeasureUnit={selectedMeasureUnit}
          measureUnits={measureUnits}
          onOk={onSaveMeasureUnit}
          onCancel={handleHideMeasureUnitModal}
        />
      )}
    </>
  );
};

export default UserProductModal;
