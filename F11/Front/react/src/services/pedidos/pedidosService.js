import apiFetch from "../../utils/apiFetch"

const GetPedidos = async () => {
    try {
        const {data} = await apiFetch().get('/pedidos');
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetPedidoById = async (id) => {
    try {
        const {data} = await apiFetch().get('/pedidos/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PostPedido = async (payload) => {
    try {
        const {data} = await apiFetch().post('/pedidos', payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PutPedido = async (id, payload) => {
    try {
        const {data} = await apiFetch().put('/pedidos/'+id, payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const DeletePedido = async (id) => {
    try {
        const {data} = await apiFetch().delete('/pedidos/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export {
    GetPedidos,
    GetPedidoById,
    PostPedido,
    PutPedido,
    DeletePedido
}