import apiFetch from "../../utils/apiFetch"

const GetProductos = async () => {
    try {
        const {data} = await apiFetch().get('/productos');
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetProductoById = async (id) => {
    try {
        const {data} = await apiFetch().get('/productos/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetProductoByCategoriaId = async (categoriaId) => {
    try {
        const {data} = await apiFetch().get('/productos/categoria/'+categoriaId);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PostProducto = async (payload) => {
    try {
        const {data} = await apiFetch().post('/productos', payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const PutProducto = async (id, payload) => {
    try {
        const {data} = await apiFetch().put('/productos/'+id, payload);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

const DeleteProducto = async (id) => {
    try {
        const {data} = await apiFetch().delete('/productos/'+id);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export {
    GetProductos,
    GetProductoById,
    GetProductoByCategoriaId,
    PostProducto,
    PutProducto,
    DeleteProducto
}