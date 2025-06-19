import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllStores, getStoreById, getStoreByName, createStore, updateStore, deleteStore } from "../controllers/storesController.js";


const storeRoutes = Router();

// Rutas
storeRoutes.get('/', getAllStores);
storeRoutes.get('/:tienda_id', getStoreById);
storeRoutes.get('/nombre/:tienda_nombre', getStoreByName);
storeRoutes.post('/', verifyToken, authorizeRoles(1,2), createStore);
storeRoutes.put('/:tienda_id',  verifyToken, authorizeRoles(1,2), updateStore);
storeRoutes.delete('/:tienda_id', verifyToken, authorizeRoles(1,2), deleteStore);

export default storeRoutes;