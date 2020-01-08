import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { GRAPHQL_SERVER_URL, GRAPHQL_WEBSOCKET_URL } from '../constants/graphqlConstants';
import { ApolloClient, InMemoryCache } from 'apollo-boost';


export const getClient = () => {
    
    const httpLink = new HttpLink({
        uri: GRAPHQL_SERVER_URL
    })
    
    const wsLink = new WebSocketLink({
        uri: GRAPHQL_WEBSOCKET_URL,
        options: {
            reconnect: true
        }
    })

    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    )

    const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
    });

    return client
}