import {Router} from 'express';
import {create, findAll, destroy, save, findOne} from '../services/toDo-services.js';

const TodoRouter = Router();

TodoRouter.get('/', async (req, res) => {
  const todosList = await findAll();
  res.send(todosList);
})
  .post('/create', async (req, res) => {
    await create(req.body);
    res.send('Values inserted successfully');
  })
  .delete('/:id', async (req, res) => {
    const todo = await findOne(req.params.id);
    await destroy(todo);
  })
  .put('/update/:id', async (req, res) => {
    const todo = await findOne(req.params.id);
    todo.text = req.body.todo;
    await save(todo);
  });

export default TodoRouter;
