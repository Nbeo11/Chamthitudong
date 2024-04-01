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
        element: lazy(() => import('./views/admin/ology/Chosecourse'))
      },
      {
        exact: 'true',
        path: '/app/ology/ologybycourse',
        element: lazy(() => import('./views/admin/ology/Ology_management'))
      },
      {
        exact: 'true',
        path: '/app/ology/ology_addnew',
        element: lazy(() => import('./views/admin/ology/Ology_addnew'))
      },
      {
        exact: 'true',
        path: '/app/grade',
        element: lazy(() => import('./views/admin/grade/Chosecourse'))
      },
      {
        exact: 'true',
        path: '/app/grade/ologybycourse',
        element: lazy(() => import('./views/admin/grade/Choseology'))
      },
      {
        exact: 'true',
        path: '/app/grade/gradebyology',
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
        path: '/app/module',
        element: lazy(() => import('./views/admin/module/Module_management'))
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
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
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
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
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
