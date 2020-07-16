import apiServer from './api.endpoint'

const getAll = async () => {
    return await apiServer.get("/clients")
                .then(response => response.data)
                .catch((error) => { throw error})
}

const register = async (payload) => {
    return await apiServer.post("/clients", payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const getById = async (id) => {
    return await apiServer.get(`/clients/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const update = async (id, payload) => {
    return await apiServer.put(`/clients/${id}`, payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const delClient = async (id) => {
    return await apiServer.delete(`/clients/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

export const clientService = {
    register,
    getAll,
    getById,
    update,
    delete: delClient
};
