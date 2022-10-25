import {
  Suspense,
} from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {
  routes,
} from './routes/index';

export const App = () => (
  <>
    <pre>{`${window.location}`}</pre>
    <Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={(
                <>
                  <Component />
                </>
              )}
            />
          ))}
        </Routes>
      </Router>
    </Suspense>
  </>
);
