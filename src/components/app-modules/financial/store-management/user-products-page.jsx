import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography } from "antd";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import service from "../../../../services/financial/store-mgr/user-products-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import ProductModal from "./user-product-modal";
import DetailsModal from "./user-product-details-modal";
import SearchModal from "./user-products-search-modal";
import { usePageContext } from "../../../contexts/page-context";
import DetailsButton from "./../../../common/details-button";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Products",
    data: records,
    columns: [
      { label: Words.id, value: "ProductID" },
      { label: Words.title, value: "Title" },
      { label: Words.product_code, value: "ProductCode" },
      { label: Words.product_category, value: "CategoryTitle" },
      { label: Words.product_nature, value: "NatureTitle" },
      { label: Words.is_buyable, value: "IsBuyable" },
      { label: Words.is_salable, value: "IsSalable" },
      { label: Words.is_buildable, value: "IsBuildable" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "ProductID",
    sorter: getSorter("ProductID"),
    render: (ProductID) => <Text>{utils.farsiNum(`${ProductID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    dataIndex: "Title",
    sorter: getSorter("Title"),
    render: (Title) => <Text style={{ color: Colors.blue[7] }}>{Title}</Text>,
  },
  {
    title: Words.product_code,
    width: 100,
    align: "center",
    dataIndex: "ProductCode",
    sorter: getSorter("ProductCode"),
    render: (ProductCode) => (
      <Text style={{ color: Colors.volcano[6] }}>{ProductCode}</Text>
    ),
  },
  {
    title: Words.product_category,
    width: 100,
    align: "center",
    dataIndex: "CategoryTitle",
    sorter: getSorter("CategoryTitle"),
    render: (CategoryTitle) => (
      <Text style={{ color: Colors.cyan[6] }}>{CategoryTitle}</Text>
    ),
  },
  {
    title: Words.product_nature,
    width: 100,
    align: "center",
    dataIndex: "NatureTitle",
    sorter: getSorter("NatureTitle"),
    render: (NatureTitle) => (
      <Text style={{ color: Colors.purple[6] }}>{NatureTitle}</Text>
    ),
  },
];

const handleCheckEditable = (row) => row.Editable;
const handleCheckDeletable = (row) => row.Deletable;

const recordID = "ProductID";

const UserProductsPage = ({ pageName }) => {
  const {
    progress,
    searched,
    setSearched,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showModal,
    showDetails,
    setShowDetails,
    showSearchModal,
    setShowSearchModal,
    filter,
    setFilter,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    // handleGetAll,
    handleResetContext,
    handleAdvancedSearch,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const getOperationalButtons = (record) => {
    return (
      <DetailsButton
        record={record}
        setSelectedObject={setSelectedObject}
        setShowDetails={setShowDetails}
      />
    );
  };

  const columns = access
    ? getColumns(
        baseColumns,
        getOperationalButtons,
        access,
        handleEdit,
        handleDelete,
        handleCheckEditable,
        handleCheckDeletable
      )
    : [];

  const handleClear = () => {
    setRecords([]);
    setFilter(null);
    setSearched(false);
  };

  //------

  const handleSaveFeature = async (row) => {
    const feature = await service.saveFeature(row);

    const so = { ...selectedObject };
    if (so.Features.find((f) => f.PFID === feature.PFID))
      so.Features[so.Features.findIndex((f) => f.PFID === feature.PFID)] =
        feature;
    else so.Features = [...so.Features, feature];

    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  const handleDeleteFeature = async (id) => {
    await service.deleteFeature(id);

    const so = { ...selectedObject };
    so.Features = so.Features.filter((f) => f.PFID !== id);
    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  //------

  const handleSaveMeasureUnit = async (row) => {
    const measure_units = await service.saveMeasureUnit(row);

    const so = { ...selectedObject };
    so.MeasureUnits = measure_units;

    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  const handleDeleteMeasureUnit = async (id) => {
    await service.deleteMeasureUnit(id);

    const so = { ...selectedObject };
    so.MeasureUnits = so.MeasureUnits.filter((f) => f.PMID !== id);
    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  //------

  const handleSaveMeasureConvert = async (row) => {
    const feature = await service.saveMeasureConvert(row);

    const so = { ...selectedObject };
    if (so.MeasureConverts.find((c) => c.ConvertID === feature.ConvertID))
      so.MeasureConverts[
        so.MeasureConverts.findIndex((c) => c.ConvertID === feature.ConvertID)
      ] = feature;
    else so.MeasureConverts = [...so.MeasureConverts, feature];

    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  const handleDeleteMeasureConvert = async (id) => {
    await service.deleteMeasureConvert(id);

    const so = { ...selectedObject };
    so.MeasureConverts = so.MeasureConverts.filter((c) => c.ConvertID !== id);
    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  //------

  const handleSaveStore = async (row) => {
    const store = await service.saveStore(row);

    const so = { ...selectedObject };
    if (so.Stores.find((s) => s.PSID === store.PSID))
      so.Stores[so.Stores.findIndex((s) => s.PSID === store.PSID)] = store;
    else so.Stores = [...so.Stores, store];

    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  const handleDeleteStore = async (id) => {
    await service.deleteStore(id);

    const so = { ...selectedObject };
    so.Stores = so.Stores.filter((s) => s.PSID !== id);
    setSelectedObject(so);

    const rec = [...records];
    rec[rec.findIndex((r) => r.ProductID === so.ProductID)] = so;
    setRecords(rec);
  };

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.products}
            sheets={getSheets(records)}
            fileName="Products"
            onSearch={() => setShowSearchModal(true)}
            onClear={handleClear}
            onAdd={access?.CanAdd && handleAdd}
          />
          <Col xs={24}>
            {searched && (
              <SimpleDataTable records={records} columns={columns} />
            )}
          </Col>
        </Row>
      </Spin>

      {showModal && (
        <ProductModal
          access={access}
          isOpen={showModal}
          selectedObject={selectedObject}
          onOk={handleSave}
          onCancel={handleCloseModal}
          onSaveFeature={handleSaveFeature}
          onDeleteFeature={handleDeleteFeature}
          onSaveMeasureUnit={handleSaveMeasureUnit}
          onDeleteMeasureUnit={handleDeleteMeasureUnit}
          onSaveMeasureConvert={handleSaveMeasureConvert}
          onDeleteMeasureConvert={handleDeleteMeasureConvert}
          onSaveStore={handleSaveStore}
          onDeleteStore={handleDeleteStore}
        />
      )}

      {showSearchModal && (
        <SearchModal
          onOk={handleAdvancedSearch}
          onCancel={() => setShowSearchModal(false)}
          isOpen={showSearchModal}
          filter={filter}
        />
      )}

      {showDetails && (
        <DetailsModal
          isOpen={showDetails}
          product={selectedObject}
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
        />
      )}
    </>
  );
};

export default UserProductsPage;
