import React, { useState, useEffect } from "react";
import { BsFileEarmarkPersonFill as CollectorAgentIcon } from "react-icons/bs";
import { RiFolderUserLine as TransferToCollectorAgentIcon } from "react-icons/ri";
import { useMount } from "react-use";
import modulesService from "../../../services/app/modules-service";
import Colors from "../../../resources/colors";
import { useLocation } from "react-router-dom";
import ModuleMenu from "./../module-menu";
import Words from "../../../resources/words";

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    case 250:
      link = "collector-agents";
      icon = (
        <CollectorAgentIcon
          style={{ color: Colors.green[6] }}
          size={iconSize}
        />
      );
      break;

    case 251:
      link = "transfer-to-collector-agents";
      icon = (
        <TransferToCollectorAgentIcon
          style={{ color: Colors.blue[5] }}
          size={iconSize}
        />
      );
      break;

    //   Colors.blue[2];
    //   Colors.purple[3];
    //   Colors.orange[3];
    //   Colors.yellow[6];
    //   Colors.volcano[4];
    //   Colors.cyan[3];
    //   Colors.red[3];
    //   Colors.purple[2];
    //   Colors.magenta[3];
    //   Colors.blue[4];
    //   Colors.geekblue[3];

    default:
      break;
  }

  return { link, icon };
};

const UserTreasuryCollectorAgentMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const financial_treasury_collector_agent_id = 28;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_collector_agent_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("user-", "")
      .replaceAll("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [currentLocation.pathname]);

  return (
    <ModuleMenu
      type="financial"
      typeTitle={Words.financial}
      modulePathName="collector-agent"
      lastPathKey={lastPathKey}
      accessiblePages={accessiblePages}
      iconSize={iconSize}
      mapper={mapper}
    />
  );
};

export default UserTreasuryCollectorAgentMenu;
