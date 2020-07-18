import apiServer from './api.endpoint'

const getAll = async () => {
    return await apiServer.get("/items")
                .then(response => response.data)
                .catch((error) => { throw error})
}

const getById = async (id) => {
    return await apiServer.get(`/items/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const register = async (payload) => {
    return await apiServer.post("/items", payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const update = async (id, payload) => {
    return await apiServer.put(`/items/${id}`, payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const _delete = async (id) => {
    return await apiServer.delete(`/items/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

export const productService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};