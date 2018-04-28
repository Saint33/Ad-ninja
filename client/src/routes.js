import React from 'react';
import { Switch, Route } from 'react-router';

import Layout from './hoc/layout';

import Home from './components/Home';

const Routes = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    </Layout>
)

export default Routes;