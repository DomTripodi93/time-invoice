import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';
import Header from './shared/header/header';
import Loading from './shared/elements/loading/loading';
import InvoiceContainer from './containers/invoice/invoice.container';


const Home = lazy(() => import('./containers/home/home'));

const Register = lazy(() => import('./containers/registration/registration'));
const Signin = lazy(() => import('./containers/registration/signin'));
const Signout = lazy(() => import('./containers/registration/signout'));
const CalendarContainer = lazy(() => import('./containers/calendar/calendar.container'));
const ClockItemContainer = lazy(() => import('./containers/clock-item/clockItem.container'));
const SettingsContainer = lazy(() => import('./containers/settings/settings.container'));
const CustomerContainer = lazy(() => import('./containers/customer/customer.container'));


const App = (props) => {
  const [authValue, setAuthValue] = useState(props.isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    if (!props.isAuthenticated) {
      props.checkUser(userId, token);
    }
    setAuthValue(props.isAuthenticated);
  }, [props]);


  return (
    <div id="page">
      <Header />
      {authValue ?
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={ClockItemContainer} />
            <Route exact path='/calendar' component={CalendarContainer} />
            <Route exact path='/invoice' component={InvoiceContainer} />
            <Route exact path='/settings' component={SettingsContainer} />
            <Route exact path='/customer' component={CustomerContainer} />
            <Route exact path='/signout' component={Signout} />
          </Switch>
        </Suspense>
        :
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={Signin} />
          </Switch>
        </Suspense>
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: (userId, token) => dispatch(checkUser(userId, token)),
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
