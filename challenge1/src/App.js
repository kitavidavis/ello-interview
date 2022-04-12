import React from "react";
import './App.css';
import { client }  from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import TokensView from "./PageContent";

function App() {
const [data, setData] = React.useState({});
return (
    <ApolloProvider client={client}>
      <div className="App">
        <TokensView />
      </div>
    </ApolloProvider>
  );
}

export default App;
