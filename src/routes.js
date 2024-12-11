import Index from "views/Index.js";
import AdminManagement from "views/AdminManagement";
import AdminDetailView from "views/AdminManagement/DetailView";
import MemberManagement from "views/MemberManagement";
import RoundingManagement from "views/RoundingManagement";
import AdminAdd from "views/AdminManagement/Add";
import AdminUpdate from "views/AdminManagement/Update";
import MemberDetailView from "views/MemberManagement/DetailView";
import MemberUpdate from "views/MemberManagement/Update";
import MemberAdd from "views/MemberManagement/Add";
import RoundingDetailView from "views/RoundingManagement/DetailView";
import ClubManagement from "views/ClubManagement";
import ClubDetailView from "views/ClubManagement/DetailView";
import SettingManagement from "views/SettingManagement";
import UserMessageDetailView from "views/MemberManagement/MessageDetailView";
import ClubMessageDetailView from "views/ClubManagement/MessageDetailView";
import FollowDetailView from "views/MemberManagement/FollowDetailView";
import Login from "views/Auth/Login";
import BlogManagement from "views/BlogManagement";
import ContentManagement from "views/ContentManagement";
import ServiceManagement from "views/ServiceManagement";
import LogManagement from "views/LogManagement";
import ContentAdd from "views/ContentManagement/Add";
import ContentUpdate from "views/ContentManagement/Update";
import SerivceAdd from "views/ServiceManagement/Add";
import ServiceUpdate from "views/ServiceManagement/Update";
import BlogDetailView from "views/BlogManagement/DetailView";
import MyPage from "views/Mypage";
import CourseManagement from "views/CourseManagement";
import CourseDetailView from "views/CourseManagement/DetailView";
const routes = [
  {
    path: "/admin/index",
    name: "sideMenu.dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/admin/admin_management",
    name: "sideMenu.adminManagement",
    icon: "ni ni-badge text-blue",
    component: <AdminManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/admin_management/detail/:id",
    name: "sideMenu.adminManagement",
    icon: "ni ni-badge text-blue",
    component: <AdminDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/admin_management/add",
    name: "sideMenu.adminManagement",
    icon: "ni ni-badge text-blue",
    component: <AdminAdd />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/admin_management/update/:id",
    name: "sideMenu.adminManagement",
    icon: "ni ni-badge text-blue",
    component: <AdminUpdate />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/user_management",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <MemberManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/user_management/detail/:id",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <MemberDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/user_management/message/:id",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <UserMessageDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/user_management/follow/:id",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <FollowDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/user_management/update/:id",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <MemberUpdate />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/user_management/add",
    name: "sideMenu.userManagement",
    icon: "ni ni-circle-08 text-blue",
    component: <MemberAdd />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/round_management",
    name: "sideMenu.roundManagement",
    icon: "ni ni-world text-yellow",
    component: <RoundingManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/round_management/detail/:id",
    name: "sideMenu.roundManagement",
    icon: "ni ni-world text-yellow",
    component: <RoundingDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/club_management",
    name: "sideMenu.clubManagement",
    icon: "ni ni-istanbul text-yellow",
    component: <ClubManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/club_management/detail/:id",
    name: "sideMenu.clubManagement",
    icon: "ni ni-istanbul text-yellow",
    component: <ClubDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/club_management/message/:id",
    name: "sideMenu.clubManagement",
    icon: "ni ni-istanbul text-yellow",
    component: <ClubMessageDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/setting_management",
    name: "sideMenu.generalSetting",
    icon: "ni ni-settings text-yellow",
    component: <SettingManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/blog_management",
    name: "sideMenu.blogManagement",
    icon: "ni ni-archive-2 text-yellow",
    component: <BlogManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/blog_management/detail/:id",
    name: "sideMenu.blogManagement",
    icon: "ni ni-archive-2 text-yellow",
    component: <BlogDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/content_management",
    name: "sideMenu.contentManagement",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: <ContentManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/content_management/add/:contentType",
    name: "sideMenu.contentManagement",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: <ContentAdd />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/content_management/update/:contentType/:id",
    name: "sideMenu.contentManagement",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: <ContentUpdate />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/log_management",
    name: "sideMenu.logManagement",
    icon: "ni ni-money-coins text-yellow",
    component: <LogManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/service_management",
    name: "sideMenu.serviceManagement",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: <ServiceManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/service_management/add/:contentType",
    name: "sideMenu.contentManagement",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: <SerivceAdd />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/service_management/update/:contentType/:id",
    name: "sideMenu.contentManagement",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: <ServiceUpdate />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/course_management/",
    name: "sideMenu.courseManagement",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: <CourseManagement />,
    layout: "/admin",
  },
  {
    path: "/admin/course_management/detail/:id",
    name: "sideMenu.courseManagement",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: <CourseDetailView />,
    layout: "/admin",
    isNotInSidebar: true,
  },
  {
    path: "/admin/mypage",
    name: "sideMenu.mypage",
    icon: "ni ni-single-02 text-yellow",
    component: <MyPage />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "sideMenu.serviceManagement",
    icon: "ni ni-single-02 text-yellow",
    component: <Login />,
    layout: "/auth",
    isNotInSidebar: true,
  },
];

export default routes;
