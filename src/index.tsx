import React from 'react';
import ReactDOM from 'react-dom';
import { AppBarComponent, FooterComponent } from './components';
import { AuthProvider, SearchProvider, ApiProvider} from './context';
import { App } from './pages';
import { ToastProvider } from 'react-toast-notifications';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <ToastProvider placement={'bottom-center'} autoDismiss autoDismissTimeout={15000}>
          <ApiProvider>
            <Router>
              <AppBarComponent />
              <App />
              <FooterComponent />
            </Router>
          </ApiProvider>
        </ToastProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
