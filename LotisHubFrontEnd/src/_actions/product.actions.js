import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from '.';

/************************************Product API********************************************/
const register = (product) => {
    const request = (product) => { return { type: productConstants.REGISTER_REQUEST, product } }
    const success = (product) => { return { type: productConstants.REGISTER_SUCCESS, product } }
    const failure = (error) => { return { type: productConstants.REGISTER_FAILURE, error } }
    const refresh = (products) => { return { type: productConstants.GETALL_SUCCESS, products } }

    return dispatch => {
        dispatch(request(product));

        productService.register(product)
            .then(
                product => { 
                    dispatch(success(product));

                    alert("물품 등록이 정상적으로 되었습니다.");
                    dispatch(alertActions.success('Registration successful'));
                    productService.getAll().then(
                        products => {
                            dispatch(refresh(products));
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
    
    const request = () => { return { type: productConstants.GETALL_REQUEST } }
    const success = (products) => { return { type: productConstants.GETALL_SUCCESS, products } }
    const failure = (error) => { return { type: productConstants.GETALL_FAILURE, error } }

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
}


const getById = (id) => {
    
    const request = () => { return { type: productConstants.GETALL_REQUEST } }
    const success = (product) => { return { type: productConstants.GETALL_SUCCESS, product } }
    const failure = (error) => { return { type: productConstants.GETALL_FAILURE, error } }

    return dispatch => {
        dispatch(request(id));

        productService.getById(id)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error.toString()))
            );
    };
}

const update = (product) => {
    const request = (product) => { return { type: productConstants.REGISTER_REQUEST, product } }
    const success = (product) => { return { type: productConstants.UPDATE_SUCCESS, product } }
    const failure = (error) => { return { type: productConstants.REGISTER_FAILURE, error } }

    return dispatch => {
        dispatch(request(product));

        productService.update(product.item_id, product)
            .then(
                product => { 
                    dispatch(success(product));
                    //history.push('/login');
                    //alert('고객사 등록이 정상적으로 처리되었습니다');
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

const _delete = (productid) => {
    const request = (productid) => { return { type: productConstants.REGISTER_REQUEST, productid } }
    const success = (product) => { return { type: productConstants.REGISTER_SUCCESS, product } }
    const failure = (error) => { return { type: productConstants.REGISTER_FAILURE, error } }
    const refresh = (products) => { return { type: productConstants.GETALL_SUCCESS, products } }
    
    return dispatch => {
        dispatch(request(productid));

        productService.delete(productid)
            .then(
                product => { 
                    dispatch(success());
                    dispatch(alertActions.success(product));
                    productService.getAll().then(
                        products => {
                            dispatch(refresh(products));
                        },
                        error => {
                            alert(error);
                            dispatch(failure(error.toString()));
                            //window.location.replace("/sign-in");
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

export const productActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};