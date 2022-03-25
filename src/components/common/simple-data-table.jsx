import React from "react";
import { Table, Alert } from "antd";
import Words from "../../resources/words";
import { getData } from "../../tools/form-manager";

const SimpleDataTable = ({ records, columns }) => {
  return (
    <>
      {records.length > 0 ? (
        <Table
          columns={columns}
          dataSource={getData(records)}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: "100%",
            y: 500,
          }}
          showSorterTooltip={false}
          locale={{
            filterConfirm: Words.ok,
            filterReset: Words.clear,
            emptyText: Words.emptyData,
          }}
          size="small"
        />
      ) : (
        <Alert message={Words.empty_data} type="warning" showIcon />
      )}
    </>
  );
};

export default SimpleDataTable;
