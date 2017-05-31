
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Router from './router';

ReactDOM.render(
  Router,
  document.getElementById('root')
  );
registerServiceWorker();
