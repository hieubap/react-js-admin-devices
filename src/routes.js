import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdAssignmentTurnedIn,
  MdHistoryEdu,
  MdLock,
  MdPerson,
  MdSettingsApplications,
} from "react-icons/md";

import SignInCentered from "@/views/auth/signIn";
import AssignedDevice from "./views/admin/AssignedDevice";
import AuditDevice from "./views/admin/AuditDevice";
import ImportDevice from "./views/admin/ImportDevice";
import UserManager from "./views/admin/UserManager";

const routes = [
  {
    name: "Nhân viên",
    layout: "/admin",
    path: "/user",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: UserManager,
  },
  {
    name: "Nhập thiết bị",
    layout: "/admin",
    path: "/import",
    icon: (
      <Icon
        as={MdSettingsApplications}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: ImportDevice,
  },
  {
    name: "Xuất thiết bị",
    layout: "/admin",
    path: "/assigned",
    icon: (
      <Icon
        as={MdAssignmentTurnedIn}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: AssignedDevice,
  },
  {
    name: "Kiểm kê",
    layout: "/admin",
    path: "/audit",
    icon: <Icon as={MdHistoryEdu} width="20px" height="20px" color="inherit" />,
    component: AuditDevice,
  },
  {
    name: "Đăng nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default routes;
