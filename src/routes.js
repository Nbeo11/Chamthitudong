import React, { Fragment, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';

import { BASE_URL } from './config/constant';
import StudentLayout from './layouts/StudentLayout';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    exact: 'true',
    path: '/auth/signin',
    element: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '/admin/*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/homepage',
        element: lazy(() => import('./views/homepage'))
      },
      {
        exact: 'true',
        path: '/app/difficults',
        element: lazy(() => import('./views/admin/difficults/Difficulty_category'))
      },
      {
        exact: 'true',
        path: '/app/difficults/difficulty_category_addnew',
        element: lazy(() => import('./views/admin/difficults/Difficulty_category_addnew'))
      },
      {
        exact: 'true',
        path: '/app/ology',
        element: lazy(() => import('./views/admin/ology/Ology_management'))
      },
      /*
      {
        exact: 'true',
        path: '/app/ology/ologybycourse',
        element: lazy(() => import('./views/admin/ology/Ology_management'))
      },*/
      {
        exact: 'true',
        path: '/app/ology/ology_addnew',
        element: lazy(() => import('./views/admin/ology/Ology_addnew'))
      },
      {
        exact: 'true',
        path: '/app/grade',
        element: lazy(() => import('./views/admin/grade/Grade_management'))
      },
      {
        exact: 'true',
        path: '/app/grade/grade_addnew',
        element: lazy(() => import('./views/admin/grade/Grade_addnew'))
      },
      {
        exact: 'true',
        path: '/app/student',
        element: lazy(() => import('./views/admin/student/Student_management'))
      },
      {
        exact: 'true',
        path: '/app/student/student_addnew',
        element: lazy(() => import('./views/admin/student/Student_addnew'))
      },
      {
        exact: 'true',
        path: '/app/teacher',
        element: lazy(() => import('./views/admin/teacher/Teacher_management'))
      },
      {
        exact: 'true',
        path: '/app/teacher/teacher_addnew',
        element: lazy(() => import('./views/admin/teacher/Teacher_addnew'))
      },
      {
        exact: 'true',
        path: '/app/module',
        element: lazy(() => import('./views/admin/module/Module_management'))
      },
      {
        exact: 'true',
        path: '/app/module/module_addnew',
        element: lazy(() => import('./views/admin/module/Module_addnew'))
      },
      {
        exact: 'true',
        path: '/app/teaching_group',
        element: lazy(() => import('./views/admin/teaching_group/Teaching_group'))
      },
      {
        exact: 'true',
        path: '/app/teaching_group/teaching_group_addnew',
        element: lazy(() => import('./views/admin/teaching_group/Teaching_group_addnew'))
      },
      {
        exact: 'true',
        path: '/app/exam_structure',
        element: lazy(() => import('./views/admin/exam_structure/Exam_structure'))
      },
      {
        exact: 'true',
        path: '/app/exam_structure/exam_structure_check',
        element: lazy(() => import('./views/admin/exam_structure/Exam_structure_check'))
      },
      {
        exact: 'true',
        path: '/app/contest',
        element: lazy(() => import('./views/admin/contest/Contest'))
      },
      {
        exact: 'true',
        path: '/app/contest/contest_addnew',
        element: lazy(() => import('./views/admin/contest/Contest_addnew'))
      },
      {
        exact: 'true',
        path: '/app/organize_exam',
        element: lazy(() => import('./views/admin/organize_exam/Organize_exam'))
      },
      {
        exact: 'true',
        path: '/app/organize_exam/organize_exam_addnew',
        element: lazy(() => import('./views/admin/organize_exam/Organize_exam_addnew'))
      },
      {
        exact: 'true',
        path: '/app/organize_exam/organize_exam_update/:organize_examId',
        element: lazy(() => import('./views/admin/organize_exam/Organize_exam_update'))
      },
    ]
  },
  {
    path: '/teacher/*',
    layout: TeacherLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/homepage',
        element: lazy(() => import('./views/homepage'))
      },
      {
        exact: 'true',
        path: '/app/module',
        element: lazy(() => import('./views/teacher/module/Module_management'))
      },
      {
        exact: 'true',
        path: '/app/module/module_addinfo/:moduleId',
        element: lazy(() => import('./views/teacher/module/Module_addinfo'))
      },
      {
        exact: 'true',
        path: '/app/module/module_updateinfo/:moduleId',
        element: lazy(() => import('./views/teacher/module/Module_updateinfo'))
      },
      {
        exact: 'true',
        path: '/app/exam_structure',
        element: lazy(() => import('./views/teacher/exam_structure/Exam_structure_management'))
      },
      {
        exact: 'true',
        path: '/app/exam_structure/exam_structure_addinfo/:exam_structureId',
        element: lazy(() => import('./views/teacher/exam_structure/Exam_structure_addinfo'))
      },
      {
        exact: 'true',
        path: '/app/exam_structure/exam_structure_updateinfo/:exam_structureId',
        element: lazy(() => import('./views/teacher/exam_structure/Exam_structure_updateinfo'))
      },
      {
        exact: 'true',
        path: '/app/question_bank',
        element: lazy(() => import('./views/teacher/question_bank/Question_bank'))
      },
      {
        exact: 'true',
        path: '/app/question_bank/question_bank_addnew',
        element: lazy(() => import('./views/teacher/question_bank/Question_bank_addnew'))
      },
      {
        exact: 'true',
        path: '/app/question_bank/question_bank_update/:question_bankId',
        element: lazy(() => import('./views/teacher/question_bank/Question_bank_update'))
      },
      {
        exact: 'true',
        path: '/app/exam_management',
        element: lazy(() => import('./views/teacher/exam/Exam_management'))
      },
      {
        exact: 'true',
        path: '/app/exam_management/exam_management_addnew',
        element: lazy(() => import('./views/teacher/exam/Exam_management_addnew'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  },
  {
    path: '/student/*',
    layout: StudentLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/homepage',
        element: lazy(() => import('./views/homepage'))
      },
      {
        exact: 'true',
        path: '/huong-dan-su-dung',
        element: lazy(() => import('./views/student/Student_exam'))
      },
      {
        exact: 'true',
        path: '/student_exam',
        element: lazy(() => import('./views/student/module/Module_view'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  },
  {
    path: '/studentexam/*',
    routes: [
      {
        exact: 'true',
        path: '/exam',
        element: lazy(() => import('./views/student/Exam/Exam'))
      },
    ]
  }
];

export default routes;
