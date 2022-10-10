import {
  FC,
} from 'react';
import {
  Helmet,
} from 'react-helmet';
import {
  isDev,
} from '../../utils/isDev';

export const Settings :FC = () => (
  <>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <div>
      <h1>Settings</h1>
      {isDev && <pre>{`${window.location}`}</pre>}
    </div>
  </>
);

export default Settings;
