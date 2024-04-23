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
        path: '/basic/pagination',
        element: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
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
        exact: 'true',
        path: '/basic/breadcrumb',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/pagination',
        element: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
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
  }
];

export default routes;
