import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  RiRefund2Fill as FundIcon,
  RiArtboardFill as BoardIcon,
  RiWalkFill as CheckoutIcon,
  RiUserAddFill as AddUserIcon,
  RiExchangeFundsLine as PersonalReplacementIcon,
  RiExchangeLine as ManagerReplacementIcon,
} from "react-icons/ri";
import { GiPoliceOfficerHead as PoliceIcon } from "react-icons/gi";
import { MdPersonRemoveAlt1 as RemoveUserIcon } from "react-icons/md";
import {
  AiOutlineDashboard as DashboardIcon,
  // AiFillIdcard as MembersRegedCardIcon,
  // AiOutlineSchedule as WorkShiftIcon,
  // AiOutlineUserSwitch as ReplaceWorkRequestIcon,
  // AiOutlineIdcard as CardexIcon,
} from "react-icons/ai";
import {
  // MdCardTravel as VacationIcon,
  // MdOutlineWork as MissionIcon,
  // MdSpeakerNotes as ReportIcon,
  MdSecurity as SecurityIcon,
  // MdOutlineSwapCalls as AlternativeIcon,
} from "react-icons/md";
import {
  // FaChartPie as WorkReportIcon,
  FaLandmark as OfficialIcon,
} from "react-icons/fa";
// import { GiSwipeCard as RegedCardIcon } from "react-icons/gi";
// import { BiAlarmAdd as ExtraWorkIcon } from "react-icons/bi";
// import { CgArrowsExchange as ExchangeIcon } from "react-icons/cg";
import { FiUser as UserIcon, FiUsers as UsersIcon } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../../services/app/modules-service";
import Colors from "../../../resources/colors";
import Words from "../../../resources/words";
import { useLocation } from "react-router-dom";
import TabTitle from "../../common/tab-title";

const { SubMenu } = Menu;

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    case 91:
      link = "dismissals";
      icon = (
        <RemoveUserIcon style={{ color: Colors.red[6] }} size={iconSize} />
      );
      break;

    case 98:
      link = "dismissals-check-official";
      icon = (
        <RemoveUserIcon style={{ color: Colors.red[6] }} size={iconSize} />
      );
      break;

    case 92:
      link = "edu-funds";
      icon = <FundIcon style={{ color: Colors.green[6] }} size={iconSize} />;
      break;

    case 99:
      link = "edu-funds-check-official";
      icon = <FundIcon style={{ color: Colors.green[6] }} size={iconSize} />;
      break;

    case 100:
      link = "violations";
      icon = <PoliceIcon style={{ color: Colors.red[7] }} size={iconSize} />;
      break;

    case 101:
      link = "violations-check-official";
      icon = <PoliceIcon style={{ color: Colors.red[7] }} size={iconSize} />;
      break;

    case 93:
      link = "learnings";
      icon = <BoardIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 94:
      link = "checkouts";
      icon = (
        <CheckoutIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 95:
      link = "employments";
      icon = (
        <AddUserIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    case 96:
      link = "personal-replacements";
      icon = (
        <PersonalReplacementIcon
          style={{ color: Colors.magenta[6] }}
          size={iconSize}
        />
      );
      break;

    case 97:
      link = "manager-replacements";
      icon = (
        <ManagerReplacementIcon
          style={{ color: Colors.cyan[6] }}
          size={iconSize}
        />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const tabs = [
  {
    name: "my-cartable",
    title: (
      <TabTitle
        title={Words.my_cartable}
        color={Colors.orange[6]}
        icon={UserIcon}
      />
    ),
    pages: [{ pageName: "user-EduFunds" }, { pageName: "user-Violations" }],
  },
  {
    name: "security-cartable",
    title: (
      <TabTitle
        title={Words.security_cartable}
        color={Colors.red[6]}
        icon={SecurityIcon}
      />
    ),
    pages: [
      // { pageName: "user-SecurityGuardRegedCards" },
    ],
  },
  {
    name: "department-cartable",
    title: (
      <TabTitle
        title={Words.department_cartable}
        color={Colors.blue[6]}
        icon={UsersIcon}
      />
    ),
    pages: [{ pageName: "user-Dismissals" }],
  },
  {
    name: "official-cartable",
    title: (
      <TabTitle
        title={Words.official_cartable}
        color={Colors.cyan[6]}
        icon={OfficialIcon}
      />
    ),
    pages: [
      { pageName: "user-DismissalsCheckOfficial" },
      { pageName: "user-EduFundsCheckOfficial" },
      { pageName: "user-ViolationsCheckOfficial" },
    ],
  },
];

const UserProcessesMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");
  const [openKeys, setOpenKeys] = React.useState([]);

  const currentLocation = useLocation();

  useMount(async () => {
    const processes_module_id = 10;
    const accessiblePages = await modulesService.accessiblePages(
      processes_module_id
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

    const parentTab = getParentTab(_lastPathKey);
    if (parentTab !== null) setOpenKeys([parentTab.name]);
  }, [currentLocation.pathname]);

  const getParentTab = (pageName) => {
    let tab = null;

    tab = tabs.find(
      (t) =>
        t.pages.filter(
          (p) =>
            p.pageName
              .replace("user-", "")
              .replaceAll("-", "")
              .toLocaleLowerCase() === pageName
        ).length > 0
    );

    tab = tab || null;

    return tab;
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    let rootSubmenuKeys = [];
    tabs.forEach((t) => (rootSubmenuKeys = [...rootSubmenuKeys, t.name]));

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getSubMenus = () => {
    const processes_module_path_name = "processes";
    const isEndsWithModuleName = currentLocation.pathname.endsWith(
      `/${processes_module_path_name}`
    );
    const prePath = isEndsWithModuleName
      ? `${processes_module_path_name}/`
      : "";

    //---

    let subMenus = [];

    tabs.forEach((tab) => {
      if (
        accessiblePages.filter((p) =>
          tab.pages.filter((tp) => tp.pageName === p.PageName)
        ).length > 0
      ) {
        subMenus = [
          ...subMenus,
          <SubMenu key={tab.name} title={tab.title}>
            {accessiblePages
              .filter(
                (ap) =>
                  tab.pages.filter((tp) => tp.pageName === ap.PageName)
                    .length === 1
              )
              .map((page) => (
                <Menu.Item
                  key={page.PageName.replace("user-", "")
                    .replaceAll("-", "")
                    .toLocaleLowerCase()}
                  icon={mapper(page.PageID).icon}
                >
                  <Link to={`${prePath}${mapper(page.PageID).link}`}>
                    {page.PageTitle}
                  </Link>
                </Menu.Item>
              ))}
          </SubMenu>,
        ];
      }
    });

    return subMenus;
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      openKeys={openKeys}
      selectedKeys={[lastPathKey]}
      onOpenChange={onOpenChange}
    >
      <Menu.Item
        key="settings"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/official`}>{Words.official}</Link>
      </Menu.Item>
      <Menu.Divider />

      {getSubMenus()}
    </Menu>
  );
};

export default UserProcessesMenu;
