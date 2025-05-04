
import Dashboard from '@/components/Dashboard/Dashboard';
import { HeroSection } from '@/components/hero-section-1';
import ProfilePage from '@/components/Profile_page/ProfilePage';
import JobDetails from '@/pages/JobListings/JobDetails';
import JobView from '@/pages/JobListings/JobView';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// const Home = lazy(() => import( '../components/hero-section-1'));
// const JobBoard = lazy(() => import('../pages/JobBoard'));
// const Profile = lazy(() => import('../pages/Profile'));
// const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  { path: '/', element: <HeroSection  /> },
  { path: '/jobs', element: <JobView  /> },
  { path: '/jobs/:id', element: <JobDetails  /> },
  { path: '/profile-page', element: <ProfilePage  /> },
  { path: '/dashboard', element: <Dashboard  /> },
//   { path: '/jobs', element: <JobBoard /> },
//   { path: '/profile', element: <Profile /> },
//   { path: '*', element: <NotFound /> },
];

export default routes;
