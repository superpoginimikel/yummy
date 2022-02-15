import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Web3Provider } from '../components';
import './App.css';
import { Header, Home, Footer } from '../components';

function App() {
  return (
    <div id="App">
      <Web3Provider>
        <Router>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Suspense>
          <Footer />
        </Router>
      </Web3Provider>
    </div>
  );
}

export default App;
