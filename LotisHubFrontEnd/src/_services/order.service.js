import apiServer from './api.endpoint'

const getAll = async () => {
    return await apiServer.get("/orders")
                .then(response => response.data)
                .catch((error) => { throw error})
}

const register = async (payload) => {
    return await apiServer.post("/orders", payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const getById = async (id) => {
    return await apiServer.get(`/orders/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const update = async (id, payload) => {
    return await apiServer.put(`/orders/${id}`, payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const delOrder = async (id) => {
    return await apiServer.delete(`/orders/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

export const orderService = {
    register,
    getAll,
    getById,
    update,
    delete: delOrder
};