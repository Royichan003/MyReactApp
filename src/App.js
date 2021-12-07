import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Private from './Private';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import BookList from './BookList';
import AddBook from './AddBook';
import ModifyBook from './ModifyBook';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-57457376.okta.com/oauth2/default',
  clientId: '0oa28z0y8jJB13x8o5d7',
  redirectUri: window.location.origin + '/callback'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function() {
    history.push('/login')
  }
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Header/>
        <Route path='/' exact={true} component={Home}/>
        <SecureRoute path='/private' exact={true} component={Private}/>
        <Route path='/callback' component={LoginCallback}/>
        <Route path='/books' component={BookList}/>
        <Route path='/add' component={AddBook}/>
        <Route path='/editbooks/:id' component={ModifyBook}/>
      </Security>
        </div>
      </div>
    </div>
  );
}

export default App;