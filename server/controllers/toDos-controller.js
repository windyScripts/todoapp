import mongoose from 'mongoose';

import {findOne as findOneToDo, findAll as findAllToDos, count as countToDos} from'../services/toDo-services.js';
import {findById as findUserById, save as saveUser, findAll as findAllUsers} from'../services/user-services.js';








// export const getPageOfExpenses = async (req, res) => {
//   try {
//     const relativePagePosition = req.query.relativePagePosition;
//     const numberOfExpenses = await count({ userId: req.user.id });

//     const expensesPerPage = parseInt(req.query.items);

//     const numberOfPages = Math.ceil(numberOfExpenses / expensesPerPage);
//     const targetId = req.query.id;
//     const target = await findOneToDo({ _id: targetId });
//     const targetDate = target.date;

//     let order;
//     let dateParams;

//     if (relativePagePosition === 'expensesBack') {
//       order = { date: -1 }; // DESC
//       dateParams = {
//         $lt: targetDate,
//       };
//     } else if (relativePagePosition === 'expensesForward') {
//       order = { date: -1 }; //ASC
//       dateParams = {
//         $gt: targetDate,
//       };
//     } else {
//       return res.status(400).json({ message: 'invalid request' });
//     }

//     const currentPageExpenses = await findAllToDos(
//       {
//         userId: req.user.id,
//         date: dateParams,
//       },
//       order,
//       expensesPerPage,
//       targetDate,
//     );
//     res.status(200).json({
//       currentPageExpenses,
//       numberOfPages,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getButtonsAndLastPage = async (req, res) => {
//   try {
//     const promiseOne = countToDos({ userId: req.user.id });

//     const expensesPerPage = parseInt(req.query.items);

//     const promiseTwo = findAllToDos({
//       userId: req.user.id,
//     }, { date: -1 }, expensesPerPage);

//     const promiseThree = findUserById(req.user.id);

//     const [numberOfExpenses, currentPageExpensesReversed, user] = await Promise.all([promiseOne, promiseTwo, promiseThree]);

//     const premiumStatus = user.isPremiumUser;

//     const numberOfPages = Math.ceil(numberOfExpenses / expensesPerPage);

//     const currentPageExpenses = currentPageExpensesReversed;
//     res.status(200).json({
//       premiumStatus,
//       currentPageExpenses,
//       numberOfPages,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addOrUpdateExpense = async (req, res) => {
//   if (req.body._id) {
//     patchExpense(req, res);
//   } else {
//     addExpense(req, res);
//   }
// };

// async function addExpense(req, res) {
//   if (req.body.name.length === 0 || !Number(req.body.price)) {
//     res.status(400).json({ message: 'invalid data' });
//   }
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const expenseCreationPromise = ToDo.create({
//       name: req.body.name,
//       price: req.body.price,
//       category: req.body.category,
//       userId: req.user._id,
//     }, session);
//     const updatedExpense = Number(req.user.totalExpense) + Number(req.body.price);
//     req.user.totalExpense = updatedExpense;
//     const userSavePromise = saveUser(req.user, session);
//     const message = await Promise.all([expenseCreationPromise, userSavePromise]);
//     console.log(message);
//     await session.commitTransaction();
//     await session.endSession();
//     res.status(200).json(message);
//   } catch (err) {
//     console.log(err);
//     await session.abortTransaction();
//     await session.endSession();
//   }
// }

// export const deleteExpense = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const _id = req.params.eId;
//     const expense = await findOneToDo({ _id, userId: req.user.id });
//     const updatedExpense = Number(req.user.totalExpense) - Number(expense.price);
//     req.user.totalExpense = updatedExpense;
//     const userSavePromise = saveUser(req.user, session);
//     const expenseDeletionPromise = ToDo.destroy({  _id, userId: req.user.id }, session);
//     const message = await Promise.all([userSavePromise, expenseDeletionPromise]);
//     await session.commitTransaction();
//     await session.endSession();
//     res.status(200).json(message);
//   } catch (err) {
//     console.log(err);
//     await session.abortTransaction();
//     await session.endSession();
//   }
// };

// async function patchExpense(req, res) {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   if (req.body.name.length === 0 || !Number(req.body.price)) {
//     res.status(400).json({ message: 'invalid data' });
//   }
//   try {
//     const _id = req.body._id;
//     const expense = await findOneToDo({ _id, userId: req.user.id });
//     const updatedExpense = Number(req.user.totalExpense) - Number(expense.price) + Number(req.body.price);
//     req.user.totalExpense = updatedExpense;
//     const userSavePromise = saveUser(req.user, session);
//     expense.category = req.body.category;
//     expense.price = parseInt(req.body.price);
//     expense.name = req.body.name;
//     console.log(expense);
//     const expenseChangePromise = ToDo.save(expense, session);
//     const message = await Promise.all([expenseChangePromise, userSavePromise]);
//     await session.commitTransaction();
//     await session.endSession();
//     res.status(200).json(message);
//   } catch (err) {
//     console.log(err);
//     await session.abortTransaction();
//     await session.endSession();
//   }
// }

// exports.showLeaderboards = async (req, res) => {
//   try {
//     const userLeaderBoard = await findAllUsers(
//       {}, { totalExpense: 1 });

//     res.status(200).json(userLeaderBoard);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getOldestAndNewestExpenseDates = async function(req, res) {
//   try {
//     const p1 = findOneToDo({

//       userId: req.user.id,

//     }, 'date', { sort: { date: 1 }});
//     const p2 = findOneToDo({

//       userId: req.user.id,

//     }, 'date', { sort: { date: -1 }});
//     const [beforeDate, afterDate] = await Promise.all([p1, p2]);
//     return res.status(200).json({ beforeDate, afterDate });
//   } catch (err) {
//     console.log(err);
//   }
// };
