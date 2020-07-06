import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from '.';

export const orderActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

/************************************order API********************************************/
function register(order) {
    return dispatch => {
        dispatch(request(order));

        orderService.register(order)
            .then(
                order => { 
                    dispatch(success(order));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(order);
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

    function request(order) { return { type: orderConstants.REGISTER_REQUEST, order } }
    function success(order) { return { type: orderConstants.REGISTER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.REGISTER_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        orderService.getAll()
            .then(
                order => {
                    dispatch(success(order));
                },
                error => {
                    alert(error);
                    dispatch(failure(error.toString()));
                    //window.location.replace("/sign-in");
                } 
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(orders) { return { type: orderConstants.GETALL_SUCCESS, orders } }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request(id));

        orderService.getOrderbyId(id)
            .then(
                order => dispatch(success(order)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(order) { return { type: orderConstants.GETALL_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

function update(order) {
    return dispatch => {
        dispatch(request(order));

        orderService.register(order)
            .then(
                order => { 
                    dispatch(success(order));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(order);
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

    function request(order) { return { type: orderConstants.REGISTER_REQUEST, order } }
    function success(order) { return { type: orderConstants.REGISTER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.REGISTER_FAILURE, error } }
}


function _delete(orderid) {
    return dispatch => {
        dispatch(request(orderid));

        orderService.deleteOrder(orderid)
            .then(
                order => { 
                    dispatch(success());
                    dispatch(alertActions.success(order));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(orderid) { return { type: orderConstants.REGISTER_REQUEST, orderid } }
    function success(order) { return { type: orderConstants.REGISTER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.REGISTER_FAILURE, error } }
}

