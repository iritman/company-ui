import React, { useState } from "react";
import { useMount } from "react-use";
import service from "./../../../../services/org/departments-service";
import { OrganizationGraph } from "@ant-design/charts";

const OrgChartPage = () => {
  const [departments, setDepartments] = useState([]);

  useMount(async () => {
    const data = await service.getAllData();

    setDepartments(data);
  });

  const getNodes = (departments) => {
    let node_list = {};

    if (departments.length > 0) {
      node_list = getAntdNodes(
        departments.filter((n) => n.ParentDepartmentID === 0)[0],
        departments
      );
    }

    return node_list;
  };

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

  return (
    <>
      {departments.length > 0 && (
        <OrganizationGraph
          data={getNodes(departments)}
          behaviors={["drag-canvas", "zoom-canvas", "drag-node"]}
        />
      )}
    </>
  );
};

export default OrgChartPage;
