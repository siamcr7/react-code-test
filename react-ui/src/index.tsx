import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

// ========================================

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);

// Opt-in to Webpack hot module replacement
if ((module as any).hot) (module as any).hot.accept();