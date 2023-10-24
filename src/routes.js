import { Router} from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.post('/agregar-libro', libro.add);
//router.get('/mostrar-libro-por-id', libro.getOne);
router.get('/mostrar-libro-por-id/:id', libro.getOne);
router.put('/update-libro', libro.update);
router.delete('/eliminar-libro', libro.delete);