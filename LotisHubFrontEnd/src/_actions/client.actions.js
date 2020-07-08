import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from '.';


/************************************Client API********************************************/
const register = (client) => {
    const request = (client) => { return { type: clientConstants.REGISTER_REQUEST, client } }
    const success = (client) => { return { type: clientConstants.REGISTER_SUCCESS, client } }
    const failure = (error) => { return { type: clientConstants.REGISTER_FAILURE, error } }
    const refresh = (clients) => { return { type: clientConstants.GETALL_SUCCESS, clients } }

    return dispatch => {
        dispatch(request(client));

        clientService.register(client)
            .then(
                client => { 
                    dispatch(success(client));
                    //history.push('/login');
                    alert('고객사 등록이 정상적으로 처리되었습니다');
                    dispatch(alertActions.success('Registration successful'));
                    //window.location.replace("/");
                    clientService.getAll().then(
                        clients => {
                            dispatch(refresh(clients));
                        },
                        error => {
                            alert(error);
                            dispatch(failure(error.toString()));
                            //window.location.replace("/sign-in");
                        } 
                    );
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


const getAll = () => {
    const request = () => { return { type: clientConstants.GETALL_REQUEST } }
    const success = (clients) => { return { type: clientConstants.GETALL_SUCCESS, clients } }
    const failure = (error) => { return { type: clientConstants.GETALL_FAILURE, error } }

    return dispatch => {
        dispatch(request());

        clientService.getAll()
            .then(
                clients => {
                    dispatch(success(clients));
                },
                error => {
                    alert(error);
                    dispatch(failure(error.toString()));
                    //window.location.replace("/sign-in");
                } 
            );
    };
}


const getById = (id) => {
    const request = () => { return { type: clientConstants.GETALL_REQUEST } }
    const success = (client) => { return { type: clientConstants.GETALL_SUCCESS, client } }
    const failure = (error) => { return { type: clientConstants.GETALL_FAILURE, error } }

    return dispatch => {
        dispatch(request(id));
        clientService.getClientbyId(id)
            .then(
                client => dispatch(success(client)),
                error => dispatch(failure(error.toString()))
            );
    };
}


const update = (client) => {
    const request = (client) => { return { type: clientConstants.REGISTER_REQUEST, client } }
    const success = (client) => { return { type: clientConstants.REGISTER_SUCCESS, client } }
    const failure = (error) => { return { type: clientConstants.REGISTER_FAILURE, error } }

    return dispatch => {
        dispatch(request(client));
        clientService.register(client)
            .then(
                client => { 
                    dispatch(success(client));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(client);
                    dispatch(alertActions.success('Registration successful'));
                    //window.location.replace("/");
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


const _delete = (clientid) => {
    const request = (clientid) => { return { type: clientConstants.REGISTER_REQUEST, clientid } }
    const success = (client) => { return { type: clientConstants.REGISTER_SUCCESS, client } }
    const failure = (error) => { return { type: clientConstants.REGISTER_FAILURE, error } }
    const refresh = (clients) => { return { type: clientConstants.GETALL_SUCCESS, clients } }

    return dispatch => {
        dispatch(request(clientid));

        clientService.delete(clientid)
            .then(
                client => { 
                    dispatch(success());
                    dispatch(alertActions.success(client));

                    clientService.getAll().then(
                        clients => {
                            dispatch(refresh(clients));
                        },
                        error => {
                            alert(error);
                            dispatch(failure(error.toString()));
                        } 
                    );
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


export const clientActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
