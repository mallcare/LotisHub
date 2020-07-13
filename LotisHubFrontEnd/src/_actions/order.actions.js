import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from '.';



/************************************Order API********************************************/
const register = (order) => {
    const request = (order) => { return { type: orderConstants.REGISTER_REQUEST, order } }
    const success = (order) => { return { type: orderConstants.REGISTER_SUCCESS, order } }
    const failure = (error) => { return { type: orderConstants.REGISTER_FAILURE, error } }
    const refresh = (orders) => { return { type: orderConstants.GETALL_SUCCESS, orders } }

    return dispatch => {
        dispatch(request(order));

        orderService.register(order)
            .then(
                order => { 
                    dispatch(success(order));
                    //history.push('/login');
                    alert('주문 등록이 정상적으로 처리되었습니다');
                    dispatch(alertActions.success('Registration successful'));
                    //window.location.replace("/");
                    orderService.getAll().then(
                        orders => {
                            dispatch(refresh(orders));
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
    const request = () => { return { type: orderConstants.GETALL_REQUEST } }
    const success = (orders) => { return { type: orderConstants.GETALL_SUCCESS, orders } }
    const failure = (error) => { return { type: orderConstants.GETALL_FAILURE, error } }

    return dispatch => {
        dispatch(request());

        orderService.getAll()
            .then(
                orders => {
                    dispatch(success(orders));
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
    const request = () => { return { type: orderConstants.GETALL_REQUEST } }
    const success = (order) => { return { type: orderConstants.GETALL_SUCCESS, order } }
    const failure = (error) => { return { type: orderConstants.GETALL_FAILURE, error } }

    return dispatch => {
        dispatch(request(id));
        orderService.getOrderbyId(id)
            .then(
                order => dispatch(success(order)),
                error => dispatch(failure(error.toString()))
            );
    };
}

const update = (order) => {
    const request = (order) => { return { type: orderConstants.REGISTER_REQUEST, order } }
    const success = (order) => { return { type: orderConstants.REGISTER_SUCCESS, order } }
    const failure = (error) => { return { type: orderConstants.REGISTER_FAILURE, error } }

    return dispatch => {
        dispatch(request(order));
        orderService.register(order)
            .then(
                order => { 
                    dispatch(success(order));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(order);
                    dispatch(alertActions.success('Update successful'));
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


const _delete = (order_number) => {
    const request = (order_number) => { return { type: orderConstants.REGISTER_REQUEST, order_number } }
    const success = (order) => { return { type: orderConstants.REGISTER_SUCCESS, order } }
    const failure = (error) => { return { type: orderConstants.REGISTER_FAILURE, error } }
    const refresh = (orders) => { return { type: orderConstants.GETALL_SUCCESS, orders } }

    return dispatch => {
        dispatch(request(order_number));

        orderService.delete(order_number)
            .then(
                order => { 
                    dispatch(success());
                    dispatch(alertActions.success(order));

                    orderService.getAll().then(
                        orders => {
                            dispatch(refresh(orders));
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


export const orderActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
