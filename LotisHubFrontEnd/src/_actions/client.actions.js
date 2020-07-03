import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from '.';

export const clientActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

/************************************Client API********************************************/
function register(client) {
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

    function request(client) { return { type: clientConstants.REGISTER_REQUEST, client } }
    function success(client) { return { type: clientConstants.REGISTER_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.REGISTER_FAILURE, error } }
}


function getAll() {
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

    function request() { return { type: clientConstants.GETALL_REQUEST } }
    function success(clients) { return { type: clientConstants.GETALL_SUCCESS, clients } }
    function failure(error) { return { type: clientConstants.GETALL_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request(id));

        clientService.getClientbyId(id)
            .then(
                client => dispatch(success(client)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: clientConstants.GETALL_REQUEST } }
    function success(client) { return { type: clientConstants.GETALL_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.GETALL_FAILURE, error } }
}

function update(client) {
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

    function request(client) { return { type: clientConstants.REGISTER_REQUEST, client } }
    function success(client) { return { type: clientConstants.REGISTER_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.REGISTER_FAILURE, error } }
}


function _delete(clientid) {
    return dispatch => {
        dispatch(request(clientid));

        clientService.deleteClient(clientid)
            .then(
                client => { 
                    dispatch(success());
                    dispatch(alertActions.success(client));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(clientid) { return { type: clientConstants.REGISTER_REQUEST, clientid } }
    function success(client) { return { type: clientConstants.REGISTER_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.REGISTER_FAILURE, error } }
}

