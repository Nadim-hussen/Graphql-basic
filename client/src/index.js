import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {gql, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
const client = new ApolloClient({
  url:'http://localhost:8000/graphql',
  cache: new InMemoryCache()
})
client.query({ //languageQuery is any name just unique
  query: gql`
    query languageQuery{
      language{
        id
      }
    }
  `
}).then(result=>console.log(result+'hee0')).catch((err)=>{
  console.log(err);
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
