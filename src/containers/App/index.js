/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import SideNavigationBar from '../../components/utils/SideNavigationBar';
import NavigationBar from '../../components/utils/NavigationBar';
import styles from '../../styles/main.scss';

type Props = { route: Object };


const App = ({ route }: Props) => (
  <React.Fragment>
    <Helmet {...config.app} />
    <div className={styles.siteContainer}>
      <NavigationBar />
      <div className={styles.sitePusher}>
        <SideNavigationBar />
        <div className={styles.clear} />
        {/* child routes won't render without this */}
        {renderRoutes(route.routes)}
      </div>
    </div>
  </React.Fragment>
);

export default compose(hot(module), withRouter)(App);
