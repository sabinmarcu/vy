import {
  FC,
} from 'react';
import {
  Helmet,
} from 'react-helmet';
import {
  isDev,
} from '../../utils/platform';

export const Dashboard :FC = () => (
  <>
    <Helmet>
      {/* <title>Dashboard</title> */}
    </Helmet>
    <div>
      <h1>Dashboard</h1>
      {isDev && <pre>{`${window.location}`}</pre>}
    </div>
  </>
);

export default Dashboard;
