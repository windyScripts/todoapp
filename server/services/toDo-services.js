import ToDos from '../models/expenses-model';

// export const findOne = function(params, values = null, sortParams = null) {
//   return   ToDos.findOne(params, values, sortParams);
// };

export const findAll = function(findParams, sortParams = null, limit = null) {
  return   ToDos.find(findParams).sort(sortParams).limit(limit);
};

export const count = function(params) {
  return ToDos.countDocuments(params);
};

export const save = function(toDo, session = null) {
  return   toDo.save({ session });
};

export const create = function(params, session = null) {
  const toDo = new ToDos(params);
  return toDo.save({ session });
};

export const destroy = function(params, session = null) {
  return ToDos.deleteOne(params, { session });
};
