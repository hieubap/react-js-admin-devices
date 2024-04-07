import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdAssignmentTurnedIn,
  MdHistoryEdu,
  MdLock,
  MdOutlineDeviceHub,
  MdPerson,
  MdSettingsApplications,
} from "react-icons/md";

import SignInCentered from "@/views/auth/signIn";
import AssignedDevice from "./views/admin/AssignedDevice";
import HistoryRepair from "./views/admin/HistoryRepair";
import ImportDevice from "./views/admin/ImportDevice";
import UserManager from "./views/admin/UserManager";
import TypeDevice from "./views/admin/TypeDevice";
import RepairDevice from "./views/admin/RepairDevice";
import StatisticDevice from "./views/admin/Statistic";
import AccessoryDevice from "./views/admin/AccessoryDevice";
import { FaLayerGroup } from "react-icons/fa";
import { GoDeviceCameraVideo, GoDeviceDesktop } from "react-icons/go";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { GiGearStick } from "react-icons/gi";
import { FaGear } from "react-icons/fa6";

const routes = [
  
  {
    name: "Loại thiết bị",
    layout: "/admin",
    path: "/type-device",
    icon: (
      <Icon
        as={FaLayerGroup}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: TypeDevice,
  },
  {
    name: "Nhập thiết bị",
    layout: "/admin",
    path: "/import",
    icon: (
      <Icon
        as={GoDeviceDesktop}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: ImportDevice,
  },
  {
    name: "Thiết bị đã bán",
    layout: "/admin",
    path: "/assigned",
    icon: (
      <Icon
        as={RiMoneyEuroBoxLine}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: AssignedDevice,
  },
  {
    name: "Linh kiện sửa chữa",
    layout: "/admin",
    path: "/accessory",
    icon: <Icon as={GiGearStick} width="20px" height="20px" color="inherit" />,
    component: AccessoryDevice,
  },
  {
    name: "Sửa chữa",
    layout: "/admin",
    path: "/repair",
    icon: <Icon as={FaGear} width="20px" height="20px" color="inherit" />,
    component: RepairDevice,
  },
  {
    name: "Lịch sử sửa chữa",
    layout: "/admin",
    path: "/history-repair",
    icon: <Icon as={MdHistoryEdu} width="20px" height="20px" color="inherit" />,
    component: HistoryRepair,
  },
  // {
  //   name: "Thống kê",
  //   layout: "/admin",
  //   path: "/statistic",
  //   icon: <Icon as={MdHistoryEdu} width="20px" height="20px" color="inherit" />,
  //   component: StatisticDevice,
  // },
  {
    name: "Đăng nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default routes;
