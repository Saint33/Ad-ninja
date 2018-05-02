import React from 'react';
import { Switch, Route } from 'react-router';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';
import Ad from './components/Ad/Ad';
import AddAd from './components/Ad/AddAd';
import UserProfile from './components/User/UserProfile';
import login from './components/auth/login';
import UserPublicProfile from './components/User/UserPublicProfile';

const Routes = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Auth(Home, null)} />
            <Route path="/ad/:id" component={Auth(Ad, null)}/>
            <Route path="/additem" component={Auth(AddAd, true)} />
            <Route path="/user/profile" component={Auth(UserProfile, true)} />
            <Route path="/login" component={Auth(login, false)} />
            <Route path="/user/:id" component={Auth(UserPublicProfile, null)} />
        </Switch>
    </Layout>
)

export default Routes;