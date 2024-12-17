import { createRouter, createWebHistory } from "vue-router";

//? Layouts
import HomeLayout from "@/layouts/HomeLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import StudentServiceLayout from "@/layouts/StudentServiceLayout.vue";
import PersonnelServiceLayout from "@/layouts/PersonnelServiceLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

//? Views without protected route
// import Welcome from "@/views/Welcome.vue";
import Home from "@/views/Home.vue";
import QRCode from "@/views/QRCode.vue";
import About from "@/views/About.vue";
import Classroom from "@/views/Classroom.vue";
import Teacher from "@/views/Teacher.vue";
import Staff from "@/views/Staff.vue";
import PersonnelCVForGuest from "@/views/PersonnelCV.vue";
import Schedule from "@/views/Schedule.vue";
import ScheduleExplain from "@/views/ScheduleExplain.vue";
import Program from "@/views/Program.vue";
import News from "@/views/News.vue";
import NewsExplain from "@/views/NewsExplain.vue";
import Alumnus from "@/views/Alumnus.vue";
import Download from "@/views/Download.vue";
import Contact from "@/views/Contact.vue";

//? About
import History from "@/views/about/History.vue";
import Importance from "@/views/about/Importance.vue";
import Objectivity from "@/views/about/Objectivity.vue";
import Philosophy from "@/views/about/Philosophy.vue";
import PLO from "@/views/about/PLO.vue";

//? Auth view
import Login from "@/views/auth/Login.vue";

//? Student
import StudentService from "@/views/student/StudentService.vue";
import StudentProfile from "@/views/student/StudentProfile.vue";
import StudentCourseAlert from "@/views/student/StudentCourseAlert.vue";
import StudentCourseAlertHistory from "@/views/student/StudentCourseAlertHistory.vue";
import StudentCourseAlertEdit from "@/views/student/StudentCourseAlertEdit.vue";
import StudentMaintenance from "@/views/student/StudentMaintenance.vue";
import StudentEquipmentRecovery from "@/views/student/StudentEquipmentRecovery.vue";
import StudentRecoveryHistory from "@/views/student/StudentRecoveryHistory.vue";
import StudentProjectLibrary from "@/views/student/StudentProjectLibrary.vue";
import StudentProjectSeeMore from "@/views/student/StudentProjectSeeMore.vue";

//? Personnel
import PersonnelService from "@/views/personnel/PersonnelService.vue";
import PersonnelProfile from "@/views/personnel/PersonnelProfile.vue";
import PersonnelCV from "@/views/personnel/PersonnelCV.vue";
import PersonnelCVPrint from "@/views/personnel/PersonnelCVPrint.vue";
import PersonnelMaintain from "@/views/personnel/PersonnelMaintain.vue";
import PersonnelMaterial from "@/views/personnel/PersonnelMaterial.vue";
import PersonnelMaterialDisbursement from "@/views/personnel/PersonnelMaterialDisbursement.vue";
import PersonnelEquipmentRecovery from "@/views/personnel/PersonnelEquipmentRecovery.vue";
import PersonnelRecoveryHistory from "@/views/personnel/PersonnelRecoveryHistory.vue";

//? Admin
import Dashboard from "@/views/admin/Dashboard.vue";
import AdminPermission from "@/views/admin/AdminPermission.vue";
import Banner from "@/views/admin/Banner.vue";
import BannerAdd from "@/views/admin/BannerAdd.vue";
import BannerEdit from "@/views/admin/BannerEdit.vue";
import SubjectShow from "@/views/admin/SubjectShow.vue";
import SubjectAdd from "@/views/admin/SubjectAdd.vue";
import SubjectEdit from "@/views/admin/SubjectEdit.vue";
import RoomShow from "@/views/admin/RoomShow.vue";
import RoomAdd from "@/views/admin/RoomAdd.vue";
import RoomEdit from "@/views/admin/RoomEdit.vue";
import StudentShow from "@/views/admin/StudentShow.vue";
import StudentAdd from "@/views/admin/StudentAdd.vue";
import StudentEdit from "@/views/admin/StudentEdit.vue";
import PersonnelShow from "@/views/admin/PersonnelShow.vue";
import PersonnelAdd from "@/views/admin/PersonnelAdd.vue";
import PersonnelEdit from "@/views/admin/PersonnelEdit.vue";
import FeedShow from "@/views/admin/FeedShow.vue";
import FeedAdd from "@/views/admin/FeedAdd.vue";
import FeedEdit from "@/views/admin/FeedEdit.vue";
import AlumnusShow from "@/views/admin/AlumnusShow.vue";
import AlumnusAdd from "@/views/admin/AlumnusAdd.vue";
import AlumnusEdit from "@/views/admin/AlumnusEdit.vue";
import EquipmentShow from "@/views/admin/EquipmentShow.vue";
import EquipmentAdd from "@/views/admin/EquipmentAdd.vue";
import EquipmentEdit from "@/views/admin/EquipmentEdit.vue";
import EquipmentRecoveryShow from "@/views/admin/EquipmentRecoveryShow.vue";
import EquipmentRecoveryAdd from "@/views/admin/EquipmentRecoveryAdd.vue";
import EquipmentRecoveryEdit from "@/views/admin/EquipmentRecoveryEdit.vue";
import ActivityShow from "@/views/admin/ActivityShow.vue";
import ActivityAdd from "@/views/admin/ActivityAdd.vue";
import ActivityEdit from "@/views/admin/ActivityEdit.vue";
import ActivityDocShow from "@/views/admin/ActivityDocShow.vue";
import ActivityDocAdd from "@/views/admin/ActivityDocAdd.vue";
import ActivityDocEdit from "@/views/admin/ActivityDocEdit.vue";
import RepairShow from "@/views/admin/RepairShow.vue";
import RepairLogs from "@/views/admin/repairPages/RepairLogs.vue";
import RepairHistory from "@/views/admin/repairPages/RepairHistory.vue";
import RepairHistoryDetail from "@/views/admin/repairPages/RepairHistoryDetail.vue";
import RepairChart from "@/views/admin/repairPages/RepairChart.vue";
import RepairAdd from "@/views/admin/RepairAdd.vue";
import RepairEdit from "@/views/admin/RepairEdit.vue";
import CourseAlertShow from "@/views/admin/CourseAlertShow.vue";
import CourseAlertSaveExcel from "../views/admin/CourseAlertSaveExcel.vue";
import ComplainingShow from "@/views/admin/ComplainingShow.vue";
import ComplainingRead from "@/views/admin/ComplainingRead.vue";
import ProjectShow from "@/views/admin/ProjectShow.vue";
import ProjectAdd from "@/views/admin/ProjectAdd.vue";
import ProjectEdit from "@/views/admin/ProjectEdit.vue";
import DocumentShow from "@/views/admin/DocumentShow.vue";
import DocumentAdd from "@/views/admin/DocumentAdd.vue";
import DocumentEdit from "@/views/admin/DocumentEdit.vue";
import MaterialShow from "@/views/admin/MaterialShow.vue";
import MaterialAdd from "@/views/admin/MaterialAdd.vue";
import MaterialEdit from "@/views/admin/MaterialEdit.vue";
import MaterialDisbursementShow from "@/views/admin/MaterialDisbursement.vue";
import LineTokenShow from "@/views/admin/LineTokenShow.vue";
import LineTokenAdd from "@/views/admin/LineTokenAdd.vue";
import LineTokenEdit from "@/views/admin/LineTokenEdit.vue";

//? Page 404
import Page404 from "@/views/Page404.vue";

const routes = [
  //? Home layout
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/qrcode",
        name: "Qrcode",
        component: QRCode,
        beforeEnter: intoGuard,
      },
      {
        path: "/personnel/service/cv/print",
        name: "CVPrint",
        component: PersonnelCVPrint,
        beforeEnter: personnelAuthGuard,
      },
    ],
  },

  //? Main layout
  {
    path: "/main",
    component: MainLayout,
    beforeEnter: intoGuard,
    children: [
      {
        path: "/about",
        name: "About",
        redirect: "/about/history",
        component: About,
        children: [
          {
            path: "/about/history",
            name: "History",
            component: History,
          },
          {
            path: "/about/importance",
            name: "Importance",
            component: Importance,
          },
          {
            path: "/about/objectivity",
            name: "Objectivity",
            component: Objectivity,
          },
          {
            path: "/about/philosophy",
            name: "Philosophy",
            component: Philosophy,
          },
          {
            path: "/about/plo",
            name: "PLO",
            component: PLO,
          },
        ],
      },
      {
        path: "/classroom",
        name: "Classroom",
        component: Classroom,
      },
      {
        path: "/teacher",
        name: "Teacher",
        component: Teacher,
      },
      {
        path: "/staff",
        name: "Staff",
        component: Staff,
      },
      {
        path: "/read/cv/:id",
        name: "ReadCV",
        component: PersonnelCVForGuest,
      },
      {
        path: "/schedule",
        name: "Schedule",
        component: Schedule,
      },
      {
        path: "/schedule/read/:id",
        name: "ScheduleExplain",
        component: ScheduleExplain,
      },
      {
        path: "/program",
        name: "Program",
        component: Program,
      },
      {
        path: "/news",
        name: "News",
        component: News,
      },
      {
        path: "/newsexplain/:id",
        name: "NewsExplain",
        component: NewsExplain,
      },
      {
        path: "/alumnus",
        name: "Alumnus",
        component: Alumnus,
      },
      {
        path: "/download",
        name: "Download",
        component: Download,
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
      },
    ],
  },

  //? Auth layout
  {
    path: "/auth",
    component: AuthLayout,
    redirect: "/auth/login",
    beforeEnter: intoGuard,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: Login,
      },
    ],
  },

  //? Student layout
  {
    path: "/student",
    redirect: "/student/service",
    component: StudentServiceLayout,
    beforeEnter: studentAuthGuard,
    children: [
      {
        path: "/student/service",
        name: "StudentService",
        component: StudentService,
      },
      {
        path: "/student/service/profile",
        name: "StudentProfile",
        component: StudentProfile,
      },
      {
        path: "/student/service/course",
        name: "Course",
        component: StudentCourseAlert,
      },
      {
        path: "/student/service/course/history",
        name: "CourseHistory",
        component: StudentCourseAlertHistory,
      },
      {
        path: "/student/service/course/edit/:id",
        name: "CourseEdit",
        component: StudentCourseAlertEdit,
      },
      {
        path: "/student/service/maintenance",
        name: "StudentMaintenance",
        component: StudentMaintenance,
      },
      {
        path: "/student/service/equipment/recovery",
        name: "StudentEquipmentRecovery",
        component: StudentEquipmentRecovery,
      },
      {
        path: "/student/service/equipment/recovery/history",
        name: "StudentRecoveryHistory",
        component: StudentRecoveryHistory,
      },
      {
        path: "/student/service/project-library",
        name: "StudentProjectLibrary",
        component: StudentProjectLibrary,
      },
      {
        path: "/student/service/project-library/:id",
        name: "StudentProjectSeeMore",
        component: StudentProjectSeeMore,
      },
    ],
  },

  //? Personnel layout
  {
    path: "/personnel",
    redirect: "/personnel/service",
    component: PersonnelServiceLayout,
    beforeEnter: personnelAuthGuard,
    children: [
      {
        path: "/personnel/service",
        name: "PersonnelService",
        component: PersonnelService,
      },
      {
        path: "/personnel/service/profile",
        name: "PersonnelProfile",
        component: PersonnelProfile,
      },
      {
        path: "/personnel/service/cv",
        name: "CV",
        component: PersonnelCV,
      },
      {
        path: "/personnel/service/maintenance",
        name: "PersonnelMaintenance",
        component: PersonnelMaintain,
      },
      {
        path: "/personnel/service/material",
        name: "PersonnelMaterial",
        component: PersonnelMaterial,
      },
      {
        path: "/personnel/service/material/disbursement/:id",
        name: "PersonnelMaterialDisbursement",
        component: PersonnelMaterialDisbursement,
      },
      {
        path: "/personnel/service/equipment/recovery",
        name: "PersonnelEquipmentRecovery",
        component: PersonnelEquipmentRecovery,
      },
      {
        path: "/personnel/service/equipment/recovery/history",
        name: "PersonnelRecoveryHistory",
        component: PersonnelRecoveryHistory,
      },
    ],
  },

  //? Admin layout
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: AdminLayout,
    beforeEnter: adminAuthGuard,
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/permission",
        name: "AdminPermission",
        component: AdminPermission,
      },
      {
        path: "/admin/banner",
        name: "Banner",
        component: Banner,
      },
      {
        path: "/admin/banneradd",
        name: "BannerAdd",
        component: BannerAdd,
      },
      {
        path: "/admin/banneredit/:id",
        name: "BannerEdit",
        component: BannerEdit,
      },
      {
        path: "/admin/subjectshow",
        name: "SubjectShow",
        component: SubjectShow,
      },
      {
        path: "/admin/subjectadd",
        name: "SubjectAdd",
        component: SubjectAdd,
      },
      {
        path: "/admin/subjectedit/:id",
        name: "SubjectEdit",
        component: SubjectEdit,
      },
      {
        path: "/admin/roomshow",
        name: "RoomShow",
        component: RoomShow,
      },
      {
        path: "/admin/roomadd",
        name: "RoomAdd",
        component: RoomAdd,
      },
      {
        path: "/admin/roomedit/:id",
        name: "RoomEdit",
        component: RoomEdit,
      },
      {
        path: "/admin/studentshow",
        name: "StudentShow",
        component: StudentShow,
      },
      {
        path: "/admin/studentadd",
        name: "StudentAdd",
        component: StudentAdd,
      },
      {
        path: "/admin/studentedit/:id",
        name: "StudentEdit",
        component: StudentEdit,
      },
      {
        path: "/admin/personnelshow",
        name: "PersonnelShow",
        component: PersonnelShow,
      },
      {
        path: "/admin/personneladd",
        name: "PersonnelAdd",
        component: PersonnelAdd,
      },
      {
        path: "/admin/personneledit/:id",
        name: "PersonnelEdit",
        component: PersonnelEdit,
      },
      {
        path: "/admin/feed",
        name: "Feed",
        component: FeedShow,
      },
      {
        path: "/admin/feedadd",
        name: "AddFeed",
        component: FeedAdd,
      },
      {
        path: "/admin/feededit/:id",
        name: "EditFeed",
        component: FeedEdit,
      },
      {
        path: "/admin/alumnusshow",
        name: "AlumnusShow",
        component: AlumnusShow,
      },
      {
        path: "/admin/alumnusadd",
        name: "AlumnusAdd",
        component: AlumnusAdd,
      },
      {
        path: "/admin/alumnusedit/:id",
        name: "AlumnusEdit",
        component: AlumnusEdit,
      },
      {
        path: "/admin/equipmentshow",
        name: "EquipmentShow",
        component: EquipmentShow,
      },
      {
        path: "/admin/equipmentadd",
        name: "EquipmentAdd",
        component: EquipmentAdd,
      },
      {
        path: "/admin/equipmentedit/:id",
        name: "EquipmentEdit",
        component: EquipmentEdit,
      },
      {
        path: "/admin/equipment/recovery",
        name: "EquipmentRecoveryShow",
        component: EquipmentRecoveryShow,
      },
      {
        path: "/admin/equipment/recovery/add",
        name: "EquipmentRecoveryAdd",
        component: EquipmentRecoveryAdd,
      },
      {
        path: "/admin/equipment/recovery/edit/:id",
        name: "EquipmentRecoveryEdit",
        component: EquipmentRecoveryEdit,
      },
      {
        path: "/admin/activityshow",
        name: "ActivityShow",
        component: ActivityShow,
      },
      {
        path: "/admin/activityadd",
        name: "ActivityAdd",
        component: ActivityAdd,
      },
      {
        path: "/admin/activityedit/:id",
        name: "ActivityEdit",
        component: ActivityEdit,
      },
      {
        path: "/admin/activitydoc/show",
        name: "ActivityDocShow",
        component: ActivityDocShow,
      },
      {
        path: "/admin/activitydoc/add",
        name: "ActivityDocAdd",
        component: ActivityDocAdd,
      },
      {
        path: "/admin/activitydoc/edit/:id",
        name: "ActivityDocEdit",
        component: ActivityDocEdit,
      },
      {
        path: "/admin/repairshow",
        name: "RepairShow",
        component: RepairShow,
        redirect: "/admin/repairshow/logs",
        children: [
          {
            path: "/admin/repairshow/logs",
            name: "RepairLogs",
            component: RepairLogs,
          },
          {
            path: "/admin/repairshow/history",
            name: "RepairHistory",
            component: RepairHistory,
          },
          {
            path: "/admin/repairshow/history/:id",
            name: "RepairHistoryDetail",
            component: RepairHistoryDetail,
          },
          {
            path: "/admin/repairshow/chart",
            name: "RepairChart",
            component: RepairChart,
          },
        ],
      },
      {
        path: "/admin/repairadd",
        name: "RepairAdd",
        component: RepairAdd,
      },
      {
        path: "/admin/repairedit/:id",
        name: "RepairEdit",
        component: RepairEdit,
      },
      {
        path: "/admin/coursealertshow",
        name: "CourseAlertShow",
        component: CourseAlertShow,
      },
      {
        path: "/admin/coursealert/saveexcel",
        name: "CourseAlertSaveExcel",
        component: CourseAlertSaveExcel,
      },
      {
        path: "/admin/complaining",
        name: "Complaining",
        component: ComplainingShow,
      },
      {
        path: "/admin/complainingread/:id",
        name: "ComplainingRead",
        component: ComplainingRead,
      },
      {
        path: "/admin/projectshow",
        name: "ProjectShow",
        component: ProjectShow,
      },
      {
        path: "/admin/projectadd",
        name: "ProjectAdd",
        component: ProjectAdd,
      },
      {
        path: "/admin/projectedit/:id",
        name: "ProjectEdit",
        component: ProjectEdit,
      },
      {
        path: "/admin/documentshow",
        name: "DocumentShow",
        component: DocumentShow,
      },
      {
        path: "/admin/documentadd",
        name: "DocumentAdd",
        component: DocumentAdd,
      },
      {
        path: "/admin/documentedit/:id",
        name: "DocumentEdit",
        component: DocumentEdit,
      },
      {
        path: "/admin/materialshow",
        name: "MaterialShow",
        component: MaterialShow,
      },
      {
        path: "/admin/materialadd",
        name: "MaterialAdd",
        component: MaterialAdd,
      },
      {
        path: "/admin/materialedit/:id",
        name: "MaterialEdit",
        component: MaterialEdit,
      },
      {
        path: "/admin/material-disbursement",
        name: "MaterialDisbursementShow",
        component: MaterialDisbursementShow,
      },
      {
        path: "/admin/linetokenshow",
        name: "LineTokenShow",
        component: LineTokenShow,
      },
      {
        path: "/admin/linetokenadd",
        name: "LineTokenAdd",
        component: LineTokenAdd,
      },
      {
        path: "/admin/linetokenedit/:id",
        name: "LineTokenEdit",
        component: LineTokenEdit,
      },
    ],
  },

  //? 404
  {
    path: "/:pathMatch(.*)*",
    component: Page404,
    meta: {
      title: "Not Found This Page",
      description: "ไม่พบหน้า",
    },
  },
];

//? Authentication Home
function intoGuard(to, from, next) {
  if (localStorage.getItem("into")) {
    next();
  } else {
    next({ name: "Home" });
  }
}

//? Student Page Guard
function studentAuthGuard(to, from, next) {
  let permission = JSON.parse(window.localStorage.getItem("permission"));
  let local_user = JSON.parse(window.localStorage.getItem("user"));

  if (local_user != null && permission != null) {
    let user_role = permission.role;
    let status = local_user.status;
    let token = local_user.access_token;

    //? Check user role
    if (token && user_role == 2 && status == "success") {
      next();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("permission");
      alert(
        "Warning : You are not authorized to access this page! \n\n คำเตือน : ผู้ใช้งานไม่มีสิทธิ์เข้าถึงหน้านี้...โปรดตรวจสอบข้อมูล!"
      );
      next({ name: "Login" });
    }
  } else {
    next({ name: "Login" });
  }
}

//? Personnel Page Guard
function personnelAuthGuard(to, from, next) {
  let permission = JSON.parse(window.localStorage.getItem("permission"));
  let personnel_user = JSON.parse(window.localStorage.getItem("user"));

  if (personnel_user != null && permission != null) {
    let status = personnel_user.status;
    let user_role = permission.role;
    let token = personnel_user.access_token;

    if (token && user_role == 1 && status == "success") {
      next();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("permission");
      alert(
        "Warning : You are not authorized to access this page! \n\n คำเตือน : ผู้ใช้งานไม่มีสิทธิ์เข้าถึงหน้านี้...โปรดตรวจสอบข้อมูล!"
      );
      next({ name: "Login" });
    }
  } else {
    next({ name: "Login" });
  }
}

//? Admin Page Guard
function adminAuthGuard(to, from, next) {
  let local_user = JSON.parse(window.localStorage.getItem("user"));

  if (local_user != null) {
    let user_role = local_user.data.role;
    let token = local_user.token;

    if (token && user_role == "admin") {
      next();
    } else {
      localStorage.removeItem("user");
      alert(
        "Warning : You are not authorized to access this page! \n\n คำเตือน : ผู้ใช้งานไม่มีสิทธิ์เข้าถึงหน้านี้...โปรดตรวจสอบข้อมูล!"
      );
      next({ name: "Login" });
    }
  } else {
    next({ name: "Login" });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
