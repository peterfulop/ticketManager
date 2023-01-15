import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/component-library/navigation/navigation';
import { NavigationPath } from './enums/navigation.enum';
import { NotFound } from './pages/404';
import Home from './pages/home';
import Profile from './pages/profile';
import Project from './pages/project';
import Projects from './pages/projects';
import Signin from './pages/signin';
import Ticket from './pages/ticket';
import Tickets from './pages/tickets';
import Signup from './pages/signup';
import { PrivateRoute } from './components/component-library/private-route/private-route';
import UserConfirm from './pages/user-confirm';
import Signout from './pages/signout';
import { useCookies } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={NavigationPath.HOME} element={<Home />} />
            <Route path={NavigationPath.PROFILE} element={<Profile />} />
            <Route path={NavigationPath.PROJECTS} element={<Projects />} />
            <Route path={NavigationPath.PROJECT} element={<Project />} />
            <Route path={NavigationPath.TICKETS} element={<Tickets />} />
            <Route path={NavigationPath.TICKET} element={<Ticket />} />
            <Route path={NavigationPath.SIGNOUT} element={<Signout />} />
          </Route>
          <Route path={NavigationPath.SIGNIN} element={<Signin />} />
          <Route path={NavigationPath.SIGNUP} element={<Signup />} />
          <Route path={NavigationPath.USER_CONFIRM} element={<UserConfirm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
