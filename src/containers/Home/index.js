/* @flow */

import loadable from 'loadable-components';

import { ErrorDisplay, Loading } from '../../components/index';

export default loadable(() => import('./Home'), {
  ErrorComponent: ErrorDisplay,
  LoadingComponent: Loading
});
