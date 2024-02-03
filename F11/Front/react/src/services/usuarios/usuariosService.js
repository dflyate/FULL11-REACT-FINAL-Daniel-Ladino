import apiFetch from "../../utils/apiFetch"

const GetUsuarios = async () => {
    try {
        const {data} = await apiFetch().get('/usuarios');
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetUsuarioById = async (id) => {
    try {
        const {data} = await apiFetch().get('/usuarios/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PostUsuario = async (payload) => {
    try {
        const {data} = await apiFetch().post('/usuarios', payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PutUsuario = async (id, payload) => {
    try {
        const {data} = await apiFetch().put('/usuarios/'+id, payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const DeleteUsuario = async (id) => {
    try {
        const {data} = await apiFetch().delete('/usuarios/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export {
    GetUsuarios,
    GetUsuarioById,
    PostUsuario,
    PutUsuario,
    DeleteUsuario
}