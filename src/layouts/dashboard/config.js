import { SvgIcon } from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon"; // For Tuition and Results
import HomeIcon from "@heroicons/react/24/solid/HomeIcon"; // For Accommodation
import DocumentIcon from "@heroicons/react/24/solid/DocumentIcon"; // Import at the top with other icons

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: <SvgIcon component={ChartBarIcon} fontSize="small" />,
  },
  {
    title: "Application",
    path: "/application",
    icon: <SvgIcon component={DocumentIcon} fontSize="small" />,
  },
  {
    title: "My Profile",
    path: "/profile",
    icon: <SvgIcon component={UserIcon} fontSize="small" />,
  },
  {
    title: "My Courses",
    path: "/courses",
    icon: <SvgIcon component={HomeIcon} fontSize="small" />,
  },
  {
    title: "My Results",
    path: "/results",
    icon: <SvgIcon component={AcademicCapIcon} fontSize="small" />, // Icon for Results
  },
  {
    title: "Tuition Fee",
    path: "/tuition",
    icon: <SvgIcon component={AcademicCapIcon} fontSize="small" />,
  },
  {
    title: "Accommodation",
    path: "/accommodation",
    icon: <SvgIcon component={HomeIcon} fontSize="small" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SvgIcon component={CogIcon} fontSize="small" />,
  },
];
