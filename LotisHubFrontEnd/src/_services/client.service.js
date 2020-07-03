import config from 'config';
import { authHeader } from '../_helpers';

export const clientService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/clients`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/clients${id}`, requestOptions).then(handleResponse);
}

function register(client) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(client)
    };

    return fetch(`${config.apiUrl}/client/register`, requestOptions).then(handleResponse);
}

function update(client) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(client)
    };

    return fetch(`${config.apiUrl}/client/update`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/client/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}