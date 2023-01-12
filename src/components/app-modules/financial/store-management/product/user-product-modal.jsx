import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Form,
  Row,
  Col,
  Tabs,
  Alert,
  //   Button,
  //   Space,
  //   Typography,
  //   Popconfirm,
} from "antd";
// import {
// //   PlusOutlined as PlusIcon,
//   //   EditOutlined as EditIcon,
//   //   QuestionCircleOutlined as QuestionIcon,
//   //   DeleteOutlined as DeleteIcon,
//   //   CheckOutlined as CheckIcon,
// } from "@ant-design/icons";
import ModalWindow from "../../../../common/modal-window";
// import Words from "../../../../../resources/words";
// import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import service from "../../../../../services/financial/store-mgr/user-products-service";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../../tools/form-manager";
// import InputItem from "../../../../form-controls/input-item";
// import DropdownItem from "../../../../form-controls/dropdown-item";
// import SwitchItem from "../../../../form-controls/switch-item";
import { handleError } from "../../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import { schema, initRecord, getTabItems } from "./user-product-modal-code";
// import DetailsTable from "./../../../../common/details-table";
// import FeatureModal from "./user-product-feature-modal";
// import MeasureUnitModal from "./user-product-measure-unit-modal";
// import MeasureConvertModal from "./user-product-measure-convert-modal";
import StoreModal from "./user-product-store-modal";
// import InventoryControlAgentModal from "./user-product-inventory-control-agent-modal";
import { v4 as uuid } from "uuid";

// const { Text } = Typography;

// const getFeatureValue = (record) => {
//   let result = "";

//   switch (record.ValueTypeID) {
//     case 4:
//       result = record.FeatureValue ? Words.yes : Words.no;
//       break;
//     case 5:
//       result = utils.slashDate(record.FeatureValue);
//       break;
//     case 6:
//       result = utils.colonTime(record.FeatureValue);
//       break;
//     default:
//       result = record.FeatureValue;
//       break;
//   }

//   return result;
// };

// const getFeaturesColumns = (access, onEdit, onDelete) => {
//   let columns = [
//     {
//       title: Words.id,
//       width: 75,
//       align: "center",
//       dataIndex: "PFID",
//       sorter: getSorter("PFID"),
//       render: (PFID) => <Text>{utils.farsiNum(`${PFID}`)}</Text>,
//     },
//     {
//       title: Words.feature,
//       width: 120,
//       align: "center",
//       dataIndex: "Title",
//       sorter: getSorter("Title"),
//       render: (Title) => (
//         <Text
//           style={{
//             color: Colors.red[7],
//           }}
//         >
//           {Title}
//         </Text>
//       ),
//     },
//     {
//       title: Words.value,
//       width: 150,
//       align: "center",
//       // dataIndex: "FeatureValue",
//       sorter: getSorter("FeatureValue"),
//       render: (record) => (
//         <Text style={{ color: Colors.green[7] }}>
//           {getFeatureValue(record)}
//         </Text>
//       ),
//     },
//   ];

//   if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
//     columns = [
//       ...columns,
//       {
//         title: "",
//         fixed: "right",
//         align: "center",
//         width: 75,
//         render: (record) => (
//           <Space>
//             {access.CanEdit && onEdit && (
//               <Button
//                 type="link"
//                 icon={<EditIcon />}
//                 onClick={() => onEdit(record)}
//               />
//             )}

//             {access.CanDelete && onDelete && (
//               <Popconfirm
//                 title={Words.questions.sure_to_delete_feature}
//                 onConfirm={async () => await onDelete(record.PFID)}
//                 okText={Words.yes}
//                 cancelText={Words.no}
//                 icon={<QuestionIcon style={{ color: "red" }} />}
//               >
//                 <Button type="link" icon={<DeleteIcon />} danger />
//               </Popconfirm>
//             )}
//           </Space>
//         ),
//       },
//     ];
//   }

//   return columns;
// };

// const getMeasureUnitsColumns = (access, onEdit, onDelete) => {
//   let columns = [
//     {
//       title: Words.id,
//       width: 75,
//       align: "center",
//       dataIndex: "PMID",
//       sorter: getSorter("PMID"),
//       render: (PMID) => <Text>{utils.farsiNum(`${PMID}`)}</Text>,
//     },
//     {
//       title: Words.measure_unit,
//       width: 120,
//       align: "center",
//       dataIndex: "MeasureUnitTitle",
//       sorter: getSorter("MeasureUnitTitle"),
//       render: (MeasureUnitTitle) => (
//         <Text
//           style={{
//             color: Colors.red[7],
//           }}
//         >
//           {MeasureUnitTitle}
//         </Text>
//       ),
//     },
//     {
//       title: Words.measure_type,
//       width: 150,
//       align: "center",
//       dataIndex: "MeasureTypeTitle",
//       sorter: getSorter("MeasureTypeTitle"),
//       render: (MeasureTypeTitle) => (
//         <Text style={{ color: Colors.green[7] }}>{MeasureTypeTitle}</Text>
//       ),
//     },
//     {
//       title: Words.default,
//       width: 75,
//       align: "center",
//       dataIndex: "IsDefault",
//       sorter: getSorter("IsDefault"),
//       render: (IsDefault) => (
//         <>{IsDefault && <CheckIcon style={{ color: Colors.green[6] }} />}</>
//       ),
//     },
//   ];

//   if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
//     columns = [
//       ...columns,
//       {
//         title: "",
//         fixed: "right",
//         align: "center",
//         width: 75,
//         render: (record) => (
//           <Space>
//             {access.CanEdit && onEdit && (
//               <Button
//                 type="link"
//                 icon={<EditIcon />}
//                 onClick={() => onEdit(record)}
//               />
//             )}

//             {access.CanDelete && onDelete && (
//               <Popconfirm
//                 title={Words.questions.sure_to_delete_measure_unit}
//                 onConfirm={async () => await onDelete(record.PMID)}
//                 okText={Words.yes}
//                 cancelText={Words.no}
//                 icon={<QuestionIcon style={{ color: "red" }} />}
//               >
//                 <Button type="link" icon={<DeleteIcon />} danger />
//               </Popconfirm>
//             )}
//           </Space>
//         ),
//       },
//     ];
//   }

//   return columns;
// };

// const getMeasureConvertsColumns = (access, onEdit, onDelete) => {
//   let columns = [
//     {
//       title: Words.id,
//       width: 75,
//       align: "center",
//       dataIndex: "ConvertID",
//       sorter: getSorter("ConvertID"),
//       render: (ConvertID) => <Text>{utils.farsiNum(`${ConvertID}`)}</Text>,
//     },
//     {
//       title: Words.from_measure_unit,
//       width: 120,
//       align: "center",
//       dataIndex: "FromUnitTitle",
//       sorter: getSorter("FromUnitTitle"),
//       render: (FromUnitTitle) => (
//         <Text
//           style={{
//             color: Colors.red[7],
//           }}
//         >
//           {FromUnitTitle}
//         </Text>
//       ),
//     },
//     {
//       title: Words.from_measure_value,
//       width: 150,
//       align: "center",
//       dataIndex: "FromUnitValue",
//       sorter: getSorter("FromUnitValue"),
//       render: (FromUnitValue) => (
//         <Text style={{ color: Colors.green[6] }}>{FromUnitValue}</Text>
//       ),
//     },
//     {
//       title: Words.to_measure_unit,
//       width: 120,
//       align: "center",
//       dataIndex: "ToUnitTitle",
//       sorter: getSorter("ToUnitTitle"),
//       render: (ToUnitTitle) => (
//         <Text
//           style={{
//             color: Colors.red[7],
//           }}
//         >
//           {ToUnitTitle}
//         </Text>
//       ),
//     },
//     {
//       title: Words.to_measure_value,
//       width: 150,
//       align: "center",
//       dataIndex: "ToUnitValue",
//       sorter: getSorter("ToUnitValue"),
//       render: (ToUnitValue) => (
//         <Text style={{ color: Colors.green[6] }}>{ToUnitValue}</Text>
//       ),
//     },
//     {
//       title: Words.tolerance,
//       width: 100,
//       align: "center",
//       dataIndex: "TolerancePercent",
//       sorter: getSorter("TolerancePercent"),
//       render: (TolerancePercent) => (
//         <Text style={{ color: Colors.orange[6] }}>{TolerancePercent}</Text>
//       ),
//     },
//   ];

//   if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
//     columns = [
//       ...columns,
//       {
//         title: "",
//         fixed: "right",
//         align: "center",
//         width: 75,
//         render: (record) => (
//           <Space>
//             {access.CanEdit && onEdit && (
//               <Button
//                 type="link"
//                 icon={<EditIcon />}
//                 onClick={() => onEdit(record)}
//               />
//             )}

//             {access.CanDelete && onDelete && (
//               <Popconfirm
//                 title={Words.questions.sure_to_delete_measure_unit}
//                 onConfirm={async () => await onDelete(record.ConvertID)}
//                 okText={Words.yes}
//                 cancelText={Words.no}
//                 icon={<QuestionIcon style={{ color: "red" }} />}
//               >
//                 <Button type="link" icon={<DeleteIcon />} danger />
//               </Popconfirm>
//             )}
//           </Space>
//         ),
//       },
//     ];
//   }

//   return columns;
// };

// const getInventoryControlAgentsColumns = (access, onEdit, onDelete) => {
//   let columns = [
//     {
//       title: Words.id,
//       width: 75,
//       align: "center",
//       dataIndex: "PAID",
//       sorter: getSorter("PAID"),
//       render: (PAID) => <Text>{utils.farsiNum(`${PAID}`)}</Text>,
//     },
//     {
//       title: Words.title,
//       width: 120,
//       align: "center",
//       dataIndex: "Title",
//       sorter: getSorter("Title"),
//       render: (Title) => (
//         <Text
//           style={{
//             color: Colors.red[7],
//           }}
//         >
//           {Title}
//         </Text>
//       ),
//     },
//     {
//       title: Words.effective_in_pricing,
//       width: 75,
//       align: "center",
//       dataIndex: "EffectiveInPricing",
//       sorter: getSorter("EffectiveInPricing"),
//       render: (EffectiveInPricing) => (
//         <>
//           {EffectiveInPricing && (
//             <CheckIcon style={{ color: Colors.green[6] }} />
//           )}
//         </>
//       ),
//     },
//     {
//       title: Words.effective_in_warehousing,
//       width: 75,
//       align: "center",
//       dataIndex: "EffectiveInWarehousing",
//       sorter: getSorter("EffectiveInWarehousing"),
//       render: (EffectiveInWarehousing) => (
//         <>
//           {EffectiveInWarehousing && (
//             <CheckIcon style={{ color: Colors.green[6] }} />
//           )}
//         </>
//       ),
//     },
//   ];

//   if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
//     columns = [
//       ...columns,
//       {
//         title: "",
//         fixed: "right",
//         align: "center",
//         width: 75,
//         render: (record) => (
//           <Space>
//             {access.CanEdit && onEdit && (
//               <Button
//                 type="link"
//                 icon={<EditIcon />}
//                 onClick={() => onEdit(record)}
//               />
//             )}

//             {access.CanDelete && onDelete && (
//               <Popconfirm
//                 title={Words.questions.sure_to_delete_inventory_control_agent}
//                 onConfirm={async () => await onDelete(record.PAID)}
//                 okText={Words.yes}
//                 cancelText={Words.no}
//                 icon={<QuestionIcon style={{ color: "red" }} />}
//               >
//                 <Button type="link" icon={<DeleteIcon />} danger />
//               </Popconfirm>
//             )}
//           </Space>
//         ),
//       },
//     ];
//   }

//   return columns;
// };

// const getBachPatternFeaturesColumns = () => {
//   let columns = [
//     {
//       title: Words.id,
//       width: 75,
//       align: "center",
//       dataIndex: "FeatureID",
//       sorter: getSorter("FeatureID"),
//       render: (FeatureID) => <Text>{utils.farsiNum(`${FeatureID}`)}</Text>,
//     },
//     {
//       title: Words.title,
//       width: 120,
//       align: "center",
//       dataIndex: "Title",
//       sorter: getSorter("Title"),
//       render: (Title) => (
//         <Text
//           style={{
//             color: Colors.green[6],
//           }}
//         >
//           {Title}
//         </Text>
//       ),
//     },
//     {
//       title: Words.value_type,
//       width: 100,
//       align: "center",
//       dataIndex: "ValueTypeTitle",
//       sorter: getSorter("ValueTypeTitle"),
//       render: (ValueTypeTitle) => (
//         <Text
//           style={{
//             color: Colors.orange[6],
//           }}
//         >
//           {ValueTypeTitle}
//         </Text>
//       ),
//     },
//   ];

//   return columns;
// };

const formRef = React.createRef();

const UserProductModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  //   onSaveFeature,
  //   onDeleteFeature,
  //   onSaveMeasureUnit,
  //   onDeleteMeasureUnit,
  //   onSaveMeasureConvert,
  //   onDeleteMeasureConvert,
  onSaveStore,
  onDeleteStore,
  //   onSaveInventoryControlAgent,
  //   onDeleteInventoryControlAgent,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [categories, setCategories] = useState([]);
  const [natures, setNatures] = useState([]);
  //   const [features, setFeatures] = useState([]);
  //   const [measureUnits, setMeasureUnits] = useState([]);
  const [stores, setStores] = useState([]);
  //   const [inventoryControlAgents, setInventoryControlAgents] = useState([]);
  //   const [systemInventoryControlAgents, setSystemInventoryControlAgents] =
  //     useState([]);
  const [bachPatterns, setBachPatterns] = useState([]);
  //---
  //   const [showFeatureModal, setShowFeatureModal] = useState(false);
  //   const [selectedFeature, setSelectedFeature] = useState(null);
  //---
  //   const [showMeasureUnitModal, setShowMeasureUnitModal] = useState(false);
  //   const [selectedMeasureUnit, setSelectedMeasureUnit] = useState(null);
  //---
  //   const [showMeasureConvertModal, setShowMeasureConvertModal] = useState(false);
  //   const [selectedMeasureConvert, setSelectedMeasureConvert] = useState(null);
  //---
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  //---
  //   const [showInventoryControlAgentModal, setShowInventoryControlAgentModal] =
  //     useState(false);
  //   const [selectedInventoryControlAgent, setSelectedInventoryControlAgent] =
  //     useState(null);
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
    record.BachPatternID = 0;
    record.IsBuyable = false;
    record.IsSalable = false;
    record.IsBuildable = false;
    record.DetailsText = "";
    record.Stores = [];
    record.MeasureUnits = [];
    record.MeasureConverts = [];
    record.InventoryControlAgents = [];
    record.AlternativeProducts = [];

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord({ ...initRecord });
    initModal(formRef, selectedObject, setRecord);

    setProgress(true);
    try {
      const data = await service.getParams();

      const {
        Categories,
        Natures,
        // Features,
        // MeasureUnits,
        Stores,
        // InventoryControlAgents,
        // SystemInventoryControlAgents,
        BachPatterns,
      } = data;

      setCategories(Categories);
      setNatures(Natures);
      //   setFeatures(Features);
      //   setMeasureUnits(MeasureUnits);
      setStores(Stores);
      //   setInventoryControlAgents(InventoryControlAgents);
      //   setSystemInventoryControlAgents(SystemInventoryControlAgents);
      setBachPatterns(BachPatterns);
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

  //   const handleShowFeatureModal = () => {
  //     setSelectedFeature(null);
  //     setShowFeatureModal(true);
  //   };

  //   const handleHideFeatureModal = () => {
  //     setSelectedFeature(null);
  //     setShowFeatureModal(false);
  //   };

  //   const handleEditFeature = (feature) => {
  //     setSelectedFeature(feature);
  //     setShowFeatureModal(true);
  //   };

  //-----------------

  //   const handleShowMeasureUnitModal = () => {
  //     setSelectedMeasureUnit(null);
  //     setShowMeasureUnitModal(true);
  //   };

  //   const handleHideMeasureUnitModal = () => {
  //     setSelectedMeasureUnit(null);
  //     setShowMeasureUnitModal(false);
  //   };

  //   const handleEditMeasureUnit = (measureUnit) => {
  //     setSelectedMeasureUnit(measureUnit);
  //     setShowMeasureUnitModal(true);
  //   };

  //-----------------

  //   const handleShowMeasureConvertModal = () => {
  //     setSelectedMeasureConvert(null);
  //     setShowMeasureConvertModal(true);
  //   };

  //   const handleHideMeasureConvertModal = () => {
  //     setSelectedMeasureConvert(null);
  //     setShowMeasureConvertModal(false);
  //   };

  //   const handleEditMeasureConvert = (measureConvert) => {
  //     setSelectedMeasureConvert(measureConvert);
  //     setShowMeasureConvertModal(true);
  //   };

  //-----------------

  const handleShowStoreModal = () => {
    setSelectedStore(null);
    setShowStoreModal(true);
  };

  const handleHideStoreModal = () => {
    setSelectedStore(null);
    setShowStoreModal(false);
  };

  const handleEditStore = (store) => {
    setSelectedStore(store);
    setShowStoreModal(true);
  };

  const handleSaveStore = async (store) => {
    if (store.ProductID === 0) {
      const main_store_info = stores.find((s) => s.StoreID === store.StoreID);
      const { Title, StorageCenterTitle } = main_store_info;
      store.Title = Title;
      store.StorageCenterTitle = StorageCenterTitle;

      //--- managing unique id (UID) for new items
      if (store.PSID === 0 && selectedStore === null) {
        store.UID = uuid();
        record.Stores = [...record.Stores, store];
      } else if (store.PSID === 0 && selectedStore !== null) {
        const index = record.Stores.findIndex(
          (s) => s.UID === selectedStore.UID
        );
        record.Stores[index] = store;
      }
    } else {
      const saved_store = await onSaveStore(store);
      const index = record.Stores.findIndex((s) => s.PSID === store.PSID);

      if (index === -1) {
        record.Stores = [...record.Stores, saved_store];
      } else {
        record.Stores[index] = saved_store;
      }
    }

    setRecord({ ...record });
    setSelectedStore(null);
  };

  const handleDeleteStore = async (store) => {
    setProgress(true);

    try {
      if (store.PSID > 0) {
        await onDeleteStore(store.PSID);

        record.Stores = record.Stores.filter((s) => s.PSID !== store.PSID);
      } else {
        record.Stores = record.Stores.filter((s) => s.UID !== store.UID);
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  //-----------------

  //   const handleShowInventoryControlAgentModal = () => {
  //     setSelectedInventoryControlAgent(null);
  //     setShowInventoryControlAgentModal(true);
  //   };

  //   const handleHideInventoryControlAgentModal = () => {
  //     setSelectedInventoryControlAgent(null);
  //     setShowInventoryControlAgentModal(false);
  //   };

  //   const handleEditInventoryControlAgent = (store) => {
  //     setSelectedInventoryControlAgent(store);
  //     setShowInventoryControlAgentModal(true);
  //   };

  //-----------------

  const tab_props = {
    categories,
    natures,
    bachPatterns,
    record,
    access,
  };

  const tab_events = {
    handleShowStoreModal,
    handleEditStore,
    handleDeleteStore,
  };

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
        width={1050}
      >
        <Row gutter={[2, 5]}>
          {selectedObject && (
            <Col xs={24}>
              <Alert
                type="info"
                showIcon
                message={utils.farsiNum(
                  `#${selectedObject.ProductID} - ${selectedObject.Title} (${selectedObject.ProductCode})`
                )}
              />
            </Col>
          )}
          <Col xs={24}>
            <Form ref={formRef} name="dataForm">
              <Tabs
                defaultActiveKey="1"
                type="card"
                // onChange={handleTabChange}
                items={getTabItems(formConfig, tab_props, tab_events)}
              >
                {/* <TabPane tab={Words.main_info} key="main-info">
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
                    <Col xs={24} md={12}>
                      <SwitchItem
                        title={Words.spare_part}
                        fieldName="IsSparePart"
                        initialValue={false}
                        checkedTitle={Words.yes}
                        unCheckedTitle={Words.no}
                        formConfig={formConfig}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <SwitchItem
                        title={Words.fix_property}
                        fieldName="IsFixProperty"
                        initialValue={false}
                        checkedTitle={Words.yes}
                        unCheckedTitle={Words.no}
                        formConfig={formConfig}
                      />
                    </Col>
                  </Row>
                </TabPane>
                {selectedObject && (
                  <>
                    <TabPane tab={Words.descriptions} key="tab-details-text">
                      <Col xs={24}>
                        <InputItem
                          title={Words.descriptions}
                          fieldName="DetailsText"
                          multiline
                          rows={7}
                          showCount
                          maxLength={512}
                          formConfig={formConfig}
                          autoFocus
                        />
                      </Col>
                    </TabPane>
                    <TabPane tab={Words.features} key="tab-features">
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
                    <TabPane tab={Words.measure_units} key="tab-measure-units">
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
                    <TabPane
                      tab={Words.measure_converts}
                      key="tab-measure-converts"
                    >
                      <Row gutter={[2, 5]}>
                        <Col xs={24}>
                          <Button
                            type="primary"
                            icon={<PlusIcon />}
                            onClick={handleShowMeasureConvertModal}
                          >
                            {Words.new_measure_convert}
                          </Button>
                        </Col>
                        <Col xs={24}>
                          <DetailsTable
                            records={selectedObject.MeasureConverts}
                            columns={getMeasureConvertsColumns(
                              access,
                              handleEditMeasureConvert, // handle edit measure convert
                              onDeleteMeasureConvert // handle delete measure convert
                            )}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab={Words.stores} key="tab-stores">
                      <Row gutter={[2, 5]}>
                        <Col xs={24}>
                          <Button
                            type="primary"
                            icon={<PlusIcon />}
                            onClick={handleShowStoreModal}
                          >
                            {Words.new_store}
                          </Button>
                        </Col>
                        <Col xs={24}>
                          <DetailsTable
                            records={selectedObject.Stores}
                            columns={getStoresColumns(
                              access,
                              handleEditStore, // handle edit store
                              onDeleteStore // handle delete store
                            )}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={Words.inventory_control_agent}
                      key="tab-inventory-control-agents"
                    >
                      <Row gutter={[2, 5]}>
                        <Col xs={24}>
                          <Button
                            type="primary"
                            icon={<PlusIcon />}
                            onClick={handleShowInventoryControlAgentModal}
                          >
                            {Words.new_inventory_control_agent}
                          </Button>
                        </Col>
                        <Col xs={24}>
                          <DetailsTable
                            records={selectedObject.InventoryControlAgents}
                            columns={getInventoryControlAgentsColumns(
                              access,
                              handleEditInventoryControlAgent, // handle edit inventory control agent
                              onDeleteInventoryControlAgent // handle delete inventory control agent
                            )}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab={Words.bach_pattern} key="tab-bach-pattern">
                      
                      <Row gutter={[2, 5]}>
                        <Col xs={24}>
                          <Col xs={24}>
                            {selectedObject === null ||
                            selectedObject.ChangableBachPatternID ? (
                              <DropdownItem
                                title={Words.bach_pattern}
                                dataSource={bachPatterns}
                                keyColumn="BachPatternID"
                                valueColumn="Title"
                                formConfig={formConfig}
                              />
                            ) : (
                              <Alert
                                type="success"
                                showIcon
                                message={
                                  <Text>{`${
                                    Words.bach_pattern
                                  }: ${utils.farsiNum(
                                    record.BachPatternTitle
                                  )}`}</Text>
                                }
                              />
                            )}
                          </Col>
                        </Col>
                        <Col xs={24}>
                          <DetailsTable
                            records={
                              bachPatterns.find(
                                (p) => p.BachPatternID === record.BachPatternID
                              )?.Features || []
                            }
                            columns={getBachPatternFeaturesColumns()}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                  </>
                )} */}
              </Tabs>
            </Form>
          </Col>
        </Row>
      </ModalWindow>

      {showStoreModal && (
        <StoreModal
          isOpen={showStoreModal}
          product={selectedObject}
          selectedStore={selectedStore}
          stores={stores.filter(
            (s) => !record.Stores?.find((ps) => ps.StoreID === s.StoreID)
          )}
          onOk={handleSaveStore}
          onCancel={handleHideStoreModal}
        />
      )}

      {/* {showFeatureModal && (
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
      )} */}

      {/* {showMeasureConvertModal && (
        <MeasureConvertModal
          isOpen={showMeasureConvertModal}
          product={selectedObject}
          selectedMeasureConvert={selectedMeasureConvert}
          measureUnits={measureUnits}
          onOk={onSaveMeasureConvert}
          onCancel={handleHideMeasureConvertModal}
        />
      )} */}

      {/* {showInventoryControlAgentModal && (
        <InventoryControlAgentModal
          isOpen={showInventoryControlAgentModal}
          product={selectedObject}
          selectedInventoryControlAgent={selectedInventoryControlAgent}
          inventoryControlAgents={inventoryControlAgents}
          systemInventoryControlAgents={systemInventoryControlAgents}
          onOk={onSaveInventoryControlAgent}
          onCancel={handleHideInventoryControlAgentModal}
        />
      )} */}
    </>
  );
};

export default UserProductModal;
