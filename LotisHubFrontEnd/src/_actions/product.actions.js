import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from '.';

export const productActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

/************************************Product API********************************************/
function register(product) {
    return dispatch => {
        dispatch(request(product));

        productService.register(product)
            .then(
                product => { 
                    dispatch(success(product));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(product);
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

    function request(product) { return { type: productConstants.REGISTER_REQUEST, product } }
    function success(product) { return { type: productConstants.REGISTER_SUCCESS, product } }
    function failure(error) { return { type: productConstants.REGISTER_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                product => {
                    dispatch(success(product));
                },
                error => {
                    alert(error);
                    dispatch(failure(error.toString()));
                    //window.location.replace("/sign-in");
                } 
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request(id));

        productService.getProductbyId(id)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(product) { return { type: productConstants.GETALL_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function update(product) {
    return dispatch => {
        dispatch(request(product));

        productService.register(product)
            .then(
                product => { 
                    dispatch(success(product));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
                    alert(product);
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

    function request(product) { return { type: productConstants.REGISTER_REQUEST, product } }
    function success(product) { return { type: productConstants.REGISTER_SUCCESS, product } }
    function failure(error) { return { type: productConstants.REGISTER_FAILURE, error } }
}


function _delete(productid) {
    return dispatch => {
        dispatch(request(productid));

        productService.deleteProduct(productid)
            .then(
                product => { 
                    dispatch(success());
                    dispatch(alertActions.success(product));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(productid) { return { type: productConstants.REGISTER_REQUEST, productid } }
    function success(product) { return { type: productConstants.REGISTER_SUCCESS, product } }
    function failure(error) { return { type: productConstants.REGISTER_FAILURE, error } }
}

