import apiFetch from "../../utils/apiFetch"

const GetClientes = async () => {
    try {
        const {data} = await apiFetch().get('/clientes');
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetClienteById = async (id) => {
    try {
        const {data} = await apiFetch().get('/clientes/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PostCliente = async (payload) => {
    try {
        console.log(payload)
        const {data} = await apiFetch().post('/clientes', payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PutCliente = async (id, payload) => {
    try {
        console.log(payload)
        const {data} = await apiFetch().put('/clientes/'+id, payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const DeleteCliente = async (id) => {
    try {
        const {data} = await apiFetch().delete('/clientes/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export {
    GetClientes,
    GetClienteById,
    PostCliente,
    PutCliente,
    DeleteCliente
}