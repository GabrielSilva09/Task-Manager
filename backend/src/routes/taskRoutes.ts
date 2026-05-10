import { Router } from 'express';
import * as TaskController from '../controllers/taskController';

const router = Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;