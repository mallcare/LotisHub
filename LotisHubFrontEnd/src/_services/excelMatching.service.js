import apiServer from './api.endpoint'

const getAll = async () => {
    return await apiServer.get("/clients")
                .then(response => response.data)
                .catch((error) => { throw error})
}

const upsert = async (payload) => {
    return await apiServer.post("/excel-match", payload)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const getById = async (id) => {
    return await apiServer.get(`/clients/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const delExcel = async (id) => {
    return await apiServer.delete(`/clients/${id}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

const getByName = async (name) => {
    return await apiServer.get(`/excel-match/name/${name}`)
                .then(response => response.data)
                .catch((error) => { throw error})
}

export const excelMatchService = {
    upsert,
    getAll,
    getById,
    delete: delExcel,
    getByName
};
