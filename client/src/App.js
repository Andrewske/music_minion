import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AudioFeatures from './components/library/AudioFeatures';
import Explore from './components/layout/Explore';
import TableView from './components/layout/TableView';
import ImportLibrary from './components/layout/ImportLibrary';
import Settings from './components/layout/Settings';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateComponent from './components/routing/PrivateComponent';
import SpotifyAccess from './components/auth/SpotifyAccess';
import SpotifyPlayer from './components/player/SpotifyPlayer';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import Player from './components/player/Player';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar hidden={false} />
          <Route exact path='/' component={Landing} />
          <section className='container-fluid'>
            <Alert />
            <ImportLibrary />
            {/* <PrivateComponent component={SpotifyAccess} />
            <PrivateComponent component={Sidebar} /> */}
            <Sidebar />
            <SpotifyAccess />
            <SpotifyPlayer />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/audio' component={AudioFeatures} />
              <PrivateRoute exact path='/player' component={Player} />
              <PrivateRoute exact path='/explore' component={Explore} />
              <PrivateRoute exact path='/table' component={TableView} />
              <PrivateRoute exact path='/settings' component={Settings} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
