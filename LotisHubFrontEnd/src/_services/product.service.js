import config from 'config';
import { authHeader } from '../_helpers';
import apiServer from './api.endpoint'

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/items`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/items${id}`, requestOptions).then(handleResponse);
}

const register = async (payload) => {
    return await apiServer.post("/items", payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

function update(product) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(product)
    };

    return fetch(`${config.apiUrl}/items/update`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/items/delete/${id}`, requestOptions).then(handleResponse);
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

export const productService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};