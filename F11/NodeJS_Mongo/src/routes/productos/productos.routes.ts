import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod,
    getMethodByCategoriaId
} from '../../controllers/productos/productos.controller'
const router = express.Router();

// /api/productos

router.get('/',getMethod); //api/productos -> obtiene todas las productos
router.get('/:id',getMethodById); //api/productos/1 -> obtiene una categoria en especifico
router.get('/categoria/:categoriaId',getMethodByCategoriaId); //api/productos/1 -> obtiene un producto por categoría
router.post('/', postMethod); //api/productos -> crea una nueva categoria
router.put('/:id', putMethod); //api/productos/1 -> actualiza una categoria
router.delete('/:id', deleteMethod); //api/productos -> elimina una categoria

export default router;