import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Navigation } from './enums/navigation.enum';
import { Home } from './pages/home/home';
import { NotFound } from './pages/notFound/not-found';
import { Posts } from './pages/posts/posts';
import { Profile } from './pages/profile/profile';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={Navigation.HOME} element={<Home />} />
          <Route path={Navigation.POSTS} element={<Posts />} />
          <Route path={Navigation.SIGNUP} element={<Signup />} />
          <Route path={Navigation.SIGNIN} element={<Signin />} />
          <Route path={Navigation.PROFILE} element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
