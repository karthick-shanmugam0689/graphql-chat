import React from 'react'
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks'
import { getClient } from './utilities/graphqlConfig'
import {
  Switch,
  Route,
} from "react-router-dom"
import Home from './container/Home/Home'
import ChatList from './container/ChatList/ChatList';

const App: React.FC = () => {
  const client = getClient()
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/chat/:id">
            <ChatList/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </ApolloProvider>
    </div>
  );
}

export default App;
