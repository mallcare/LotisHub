import { clientConstants } from '../_constants';

export function clients(state = {}, action) {
  switch (action.type) {
    case clientConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case clientConstants.GETALL_SUCCESS:
      return {
        clients: action.clients
      };
    case clientConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case clientConstants.UPDATE_SUCCESS:
      return {
        ...state,
        clients: state.clients.map(client =>
          client.client_id === action.client.client_id
          ? action.client : client
        )
      };
    case clientConstants.DELETE_REQUEST:
      // add 'deleting:true' property to client being deleted
      return {
        ...state,
        clients: state.clients.map(client =>
            client.id === action.id
            ? { ...client, deleting: true }
            : client
        )
      };
    case clientConstants.DELETE_SUCCESS:
      // remove deleted client from state
      return {
        clients: state.clients.filter(client => client.id !== action.id)
      };
    case clientConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id === action.id) {
            // make copy of client without 'deleting:true' property
            const { deleting, ...clientCopy } = client;
            // return copy of client with 'deleteError:[error]' property
            return { ...clientCopy, deleteError: action.error };
          }

          return client;
        })
      };
    default:
      return state
  }
}