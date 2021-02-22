import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/apiBS',
})

export const login = (email, password) => api.get(`/login/${email}/${password}`)
export const new_user = user => api.post(`/new-user`,user)
export const get_tasks = (id_user) => api.get(`/get-task/${id_user}`)
export const create_task = task => api.post(`/new-task`,task)
export const done_task = task => api.put(`/update-task`,task)
// export const ping = () => api.get(`/ping`)
// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    login,
    new_user,
    get_tasks,
    create_task,
    done_task
    // ping,
    // insertMovie,
    // getAllMovies,
    // updateMovieById,
    // deleteMovieById,
    // getMovieById,
}

export default apis