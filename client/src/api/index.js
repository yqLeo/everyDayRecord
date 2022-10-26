import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://47.99.62.122:3000/api',
     baseURL: 'http://localhost:3000/api',
})

export const insertRecord = payload => api.post(`/record`, payload)
export const getAllRecords = () => api.get(`/records`)
export const updateRecordById = (id, payload) => api.put(`/record/${id}`, payload)
export const deleteRecordById = id => api.delete(`/record/${id}`)
export const getRecordById = id => api.get(`/record/${id}`)

const apis = {
    insertRecord,
    getAllRecords,
    updateRecordById,
    deleteRecordById,
    getRecordById,
}

export default apis
