import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Header } from '../components/Header';
import { HomePage } from '../pages/Home';
import { JobsLikedPage } from '../pages/JobsLiked';
import { ProfilePage } from '../pages/Profile';
import { JobDetailsPage } from '../pages/JobDetails';
import { RegisterPage } from '../pages/Register';
import { LoginPage } from '../pages/Login';
import FinalizeProfilePage from '../pages/FinalizeProfile';

export function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Header />}>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/jobs-liked" element={<PrivateRoute />}>
            <Route path="/jobs-liked" element={<JobsLikedPage />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/job-details" element={<PrivateRoute />}>
            <Route path="/job-details" element={<JobDetailsPage />} />
          </Route>
          <Route path="/register-profile" element={<PrivateRoute />}>
            <Route path="/register-profile" element={<FinalizeProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
