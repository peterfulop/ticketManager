import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navigation/navigation';
import { NavigationPath } from './enums/navigation.enum';
import { NotFound } from './pages/404/not-found';
import Home from './pages/home';
import Profile from './pages/profile';
import Project from './pages/project';
import Projects from './pages/projects';
import Signin from './pages/signin/signin';
import Ticket from './pages/ticket';
import Tickets from './pages/tickets';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path={NavigationPath.HOME} element={<Home />} />
          <Route path={NavigationPath.PROFILE} element={<Profile />} />
          <Route path={NavigationPath.PROJECTS} element={<Projects />} />
          <Route path={NavigationPath.PROJECT} element={<Project />} />
          <Route path={NavigationPath.TICKETS} element={<Tickets />} />
          <Route path={NavigationPath.TICKET} element={<Ticket />} />
          <Route path={NavigationPath.SIGNIN} element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
