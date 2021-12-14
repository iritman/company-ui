import React, { useState } from "react";
import { useMount } from "react-use";
// import { Typography } from "antd";
import service from "./../../../../services/org/departments-service";
// import OrgTree from "react-org-tree";
// import Colors from "./../../../../resources/colors";
import { OrganizationGraph } from "@ant-design/charts";

// const { Text } = Typography;

// const config = {
//   horizontal: false,
//   collapsable: true,
//   expandAll: true,
//   labelClassName: "bg-white",
// };

const OrgChartPage = () => {
  const [departments, setDepartments] = useState([]);
  const [nodes, setNodes] = useState(null);

  useMount(async () => {
    const data = await service.getAllData();

    setDepartments(data);

    const node_list = getAntdNodes(
      data.filter((n) => n.ParentDepartmentID === 0)[0],
      departments
    );

    setNodes(node_list);
  });

  const getAntdNodes = (department, depList) => {
    let children = [];

    const { DepartmentID, DepartmentTitle } = department;

    const subDepartments = depList.filter(
      (d) => d.ParentDepartmentID === DepartmentID
    );

    subDepartments.forEach((dep) => {
      children = [...children, getAntdNodes(dep, depList)];
    });

    return {
      id: `${DepartmentID}`,
      value: { text: DepartmentTitle },
      children,
    };
  };

  //   const { horizontal, collapsable, expandAll, labelClassName } = config;

  //   const getNodes = (department, depList) => {
  //     let children = [];

  //     const { DepartmentID, DepartmentTitle } = department;

  //     const subDepartments = depList.filter(
  //       (d) => d.ParentDepartmentID === DepartmentID
  //     );

  //     subDepartments.forEach((dep) => {
  //       children = [...children, getNodes(dep, depList)];
  //     });

  //     return {
  //       id: DepartmentID,
  //       label: DepartmentTitle,
  //       children,
  //     };
  //   };

  return (
    <>
      {nodes !== null && (
        <OrganizationGraph
          data={nodes}
          behaviors={["drag-canvas", "zoom-canvas", "drag-node"]}
        />
      )}
    </>
    // <div
    //   className="m-t-lg text-center scrolling-wrapper-flexbox"
    //   style={{ direction: "ltr" }}
    // >
    //   {nodes !== null && (
    //     <OrgTree
    //       data={nodes}
    //       horizontal={horizontal}
    //       collapsable={collapsable}
    //       labelClassName={labelClassName}
    //       expandAll={expandAll}
    //       renderContent={(data) => {
    //         return <Text style={{ color: Colors.blue[7] }}>{data.label}</Text>;
    //       }}
    //       onClick={(e, data) => {
    //         //todo
    //         console.log(data);
    //       }}
    //     ></OrgTree>
    //   )}
    // </div>
  );
};

export default OrgChartPage;
