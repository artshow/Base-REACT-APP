const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');

var store = require('configureStore').configure();

import router from './router/index.jsx';

// App css
import './styles/app.scss';

ReactDOM.render(
  <div>
    <section className="main">
      <Provider store={store}>
        {router}
      </Provider>
    </section>
  </div>,
  document.getElementById('app')
);
