import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    update,
    delete: _delete,
    resetPassword,
    resetUpdatePassword
};


/************************************Login API********************************************/

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        

        userService.login(username, password)
            .then(
                user => { 
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // Set token to Auth header
                    //setAuthToken(user);
                    try{
                        const decoded = jwt_decode( user );
                        //dispatch(setCurrentUser(decoded));
                        dispatch(success(user));
                        localStorage.setItem('user', JSON.stringify(decoded));
                        //localStorage.setItem('user', user);
                        window.location.replace("/");
                        //history.push('/');
                    } catch(error){
                        alert(error.toString());
                        console.log(error)
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

/************************************User API********************************************/

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/login');
                    alert('회원가입이 정상적으로 처리되었습니다');
                    dispatch(alertActions.success('Registration successful'));
                    window.location.replace("/");
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/login');
                    alert('회원가입이 정상적으로 처리되었습니다');
                    alert(user);
                    dispatch(alertActions.success('Registration successful'));
                    window.location.replace("/");
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function resetPassword(email) {
    return dispatch => {
        dispatch(request({ email }));
        

        userService.resetPassword(email)
            .then(
                user => { 
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // Set token to Auth header
                    try{
                        //const decoded = jwt_decode( user );
                        //dispatch(setCurrentUser(decoded));
                        dispatch(success(user));
                        alert(user+"로 패스워드 설정링크가 보내졌습니다.");
                        //localStorage.setItem('user', JSON.stringify(decoded));
                        window.location.replace("/");
                        //history.push('/');
                    } catch(error){
                        alert(error.toString());
                        console.log(error)
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function resetUpdatePassword(userid, token, password) {
    return dispatch => {
        dispatch(request(password));

        userService.resetUpdatePassword(userid, token, password)
            .then(
                password => { 
                    dispatch(success(password));
                    //history.push('/login');
                    const messages = '새로운 패스워드로 등록되었습니다.';
                    alert(password);
                    dispatch(alertActions.success(messages));
                    window.location.replace("/");
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(password) { return { type: userConstants.REGISTER_REQUEST, password } }
    function success(password) { return { type: userConstants.REGISTER_SUCCESS, password } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


