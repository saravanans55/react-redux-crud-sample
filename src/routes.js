import { lazy } from 'react'
// use lazy for better code splitting, a.k.a. load faster
const HomeComponent = lazy(() => import('./views/home/HomeComponent.jsx'));
const BooksComponent = lazy(() => import('./views/books/BooksComponent.jsx'));
const EmployeesComponent = lazy(() => import('./views/employees/EmployeesComponent.jsx'));
const ExpensesComponent = lazy(() => import('./views/expense/ExpensesComponent.jsx'));
const StudentsComponent = lazy(() => import('./views/students/StudentsComponent.jsx'));
const PageNotFoundComponent = lazy(() => import('./views/page-not-found/PageNotFoundComponent.jsx'));

const routes = [
  {
    path: '/', // the url
    component: HomeComponent, // view rendered
  },
  {
    path: '/books',
    component: BooksComponent,
  },
  {
    path: '/employees',
    component: EmployeesComponent,
  },
  {
    path: '/expenses',
    component: ExpensesComponent,
  },
  {
    path: '/students',
    component: StudentsComponent,
  },
  {
    path: '/404',
    component: PageNotFoundComponent,
  }
]
export default routes