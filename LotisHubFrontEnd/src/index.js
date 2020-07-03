import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';

//import ReactDOM from 'react-dom';

//import * as serviceWorker from './serviceWorker';
import { App } from './App';

//ReactDOM.render(<App />, document.getElementById('root'));
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

//serviceWorker.unregister();
