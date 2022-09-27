import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Spin,
  Row,
  Col,
  Typography,
  Tree,
  Button,
  Space,
  Popconfirm,
} from "antd";
// import { AiFillFolder as FolderIcon } from "react-icons/ai";
import {
  PlusOutlined as PlusIcon,
  QuestionCircleOutlined as QuestionIcon,
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
} from "@ant-design/icons";
import Words from "../../../../resources/words";
// import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import groupService from "../../../../services/financial/accounts/structure-groups-service";
import { checkAccess, handleError } from "../../../../tools/form-manager";
// import TafsilAccountModal from "./tafsil-account-modal";
// import DetailsModal from "./tafsil-account-details-modal";
import {
  usePageContext,
  useResetContext,
} from "../../../contexts/page-context";
import GroupModal from "./structure-group-modal";
import StructureGroupDetails from "./structure-group-details";

const { Text } = Typography;

const AccountStructuesPage = ({ pageName }) => {
  const {
    progress,
    setProgress,
    access,
    setAccess,
    // searched,
    // searchText,
    // setSearchText,
    // records,
    // setRecords,
    selectedObject,
    setSelectedObject,
    // showModal,
    // showDetails,
    // setShowDetails,
  } = usePageContext();

  const resetContext = useResetContext();

  const [groups, setGroups] = useState([]);
  const [groupsTree, setGroupsTree] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  //   const [showTotalModal, setShowTotalModal] = useState(false);
  //   const [showMoeinModal, setShowMoeinModal] = useState(false);

  useMount(async () => {
    resetContext();
    await checkAccess(setAccess, pageName);

    //------

    await getAllAccountStructures();
  });

  const refreshContent = async () => {
    const group_data = await groupService.getAllData();
    setGroups(group_data);
    setGroupsTree(arrangeStructure(group_data));
  };

  const getAllAccountStructures = async () => {
    setProgress(true);

    try {
      await refreshContent();
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const arrangeStructure = (groups) => {
    let groupsList = [];

    groups.forEach((group) => {
      groupsList = [
        ...groupsList,
        {
          title: utils.farsiNum(`${group.GroupCode} - ${group.Title}`),
          key: `g${group.GroupID}`,
        },
      ];
    });

    return groupsList;
  };

  //------

  const onSelect = (selectedKeys, info) => {
    const { selectedNodes } = info;

    let node = null;

    if (selectedNodes.length === 0) setSelectedNode(node);
    else {
      node = selectedNodes[0];

      const id = parseInt(node.key.substring(1));
      node.id = id;

      switch (node.key[0]) {
        case "g":
          node.type = "group";
          node = { ...node, ...groups.find((g) => g.GroupID === id) };
          break;
        case "t":
          node.type = "total";
          break;
        case "m":
          node.type = "moein";
          break;
        default:
          break;
      }

      setSelectedNode(node);
    }
  };

  const getNewButtonTitle = () => {
    let result = Words.new_group;

    if (selectedNode) {
      const { key } = selectedNode;

      switch (key[0]) {
        case "g":
          result = Words.new_total;
          break;
        case "t":
          result = Words.new_moein;
          break;
        case "m":
          result = Words.new;
          break;
        default:
          result = Words.new_group;
          break;
      }
    }

    return result;
  };

  const handleNewButtonClick = async () => {
    if (selectedNode) {
      if (selectedNode.type === "group") {
        setShowGroupModal(true);
      }
    } else {
      setShowGroupModal(true);
    }
  };

  const handleSaveGroup = async (group) => {
    const saved_data = await groupService.saveData(group);

    if (selectedNode) {
      const { id, key, type } = selectedNode;
      setSelectedNode({ ...saved_data, id, key, type });
      setSelectedObject({ ...saved_data, id, key, type });
    }

    await refreshContent();
  };

  const handleDelete = async () => {
    if (selectedNode) {
      setProgress(true);

      try {
        let data = null;

        switch (selectedNode.type) {
          case "group":
            data = await groupService.deleteData(selectedNode.GroupID);
            break;
          default:
            data = null;
            break;
        }

        //------

        await refreshContent();

        //------

        setSelectedNode(null);
        setSelectedObject(null);
      } catch (ex) {
        handleError(ex);
      }

      setProgress(false);
    }
  };

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <Col xs={24}>
            <Text
              style={{
                paddingBottom: 20,
                paddingRight: 5,
                fontSize: 18,
              }}
              strong
              type="success"
            >
              {Words.account_structures}
            </Text>
          </Col>
          <Col xs={24}>
            <Button
              type="primary"
              icon={<PlusIcon />}
              disabled={selectedNode?.type === "moein"}
              onClick={handleNewButtonClick}
            >
              {!selectedNode ? Words.new_group : getNewButtonTitle()}
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Tree
              showLine={{ showLeafIcon: false }}
              showIcon={false}
              onSelect={onSelect}
              treeData={groupsTree}
              height={350}
              defaultExpandAll
            />
          </Col>
          <Col xs={24} md={12}>
            {selectedNode && (
              <Row gutter={[5, 10]}>
                <Col xs={24}>
                  {selectedNode.type === "group" && (
                    <StructureGroupDetails group={selectedNode} />
                  )}
                </Col>
                {selectedNode && (access?.CanEdit || access?.CanDelete) && (
                  <Col xs={24} md={12}>
                    <Space>
                      {access.CanEdit && (
                        <Button
                          type="primary"
                          icon={<EditIcon />}
                          onClick={() => {
                            setSelectedObject(selectedNode);
                            setShowGroupModal(true);
                          }}
                        >
                          {Words.edit}
                        </Button>
                      )}

                      {access.CanDelete && selectedNode.Totals.length === 0 && (
                        <Popconfirm
                          title={Words.questions.sure_to_delete_selected_item}
                          onConfirm={handleDelete}
                          okText={Words.yes}
                          cancelText={Words.no}
                          icon={<QuestionIcon style={{ color: "red" }} />}
                        >
                          <Button type="primary" danger icon={<DeleteIcon />}>
                            {Words.delete}
                          </Button>
                        </Popconfirm>
                      )}
                    </Space>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Spin>

      {showGroupModal && (
        <GroupModal
          selectedObject={selectedObject}
          isOpen={showGroupModal}
          onOk={handleSaveGroup}
          onCancel={() => setShowGroupModal(false)}
        />
      )}

      {/* {showModal && (
        <TafsilAccountModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <DetailsModal
          isOpen={showDetails}
          selectedObject={selectedObject}
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
        />
      )} */}
    </>
  );
};

export default AccountStructuesPage;
