import User from'../models/user-model';

export const findOne = function(params) {
  return   User.findOne(params);
};

export const findAll = async function(params, sortParams = null) {
  return User.find(params).sort(sortParams);
};

export const create = function(params) {
  const user = new User(params);
  return user.save();
};

export const findById = function(_id) {
  return User.findById(_id).exec();
};

export const save = function(user, session = null) {
  return user.save({ session });
};
