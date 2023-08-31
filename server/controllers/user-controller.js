import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {findOne as findOneUser,create as createUser} from '../services/user-services.js';

function generateAccessToken(id) {
  const iat = new Date;
  return jwt.sign({ userId: id, date: iat.getTime() }, process.env.JWT_SIGN);
}

function invalid(...params) {
  for (let i = 0; i < params.length; i++) {
    if (params[i].length < 1 || params[i] == undefined) return true;
  }
  return false;
}

// New user registration

export const addUser = async (req, res) => {
  try {
    const checkInvalid = invalid(req.body.userName, req.body.email, req.body.password);
    const existingUser = Boolean(await findOneUser({ email: req.body.email }));
    if (checkInvalid === true) {
      return res.status(401).json({ message: 'Invalid details.' });
    } else if (existingUser === true) {
      return res.status(401).json({ message: 'User already exists.' });
    }
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const response = await createUser({ name: req.body.userName, email: req.body.email, password: hash });
      return res.status(200).json(response);
    });
  } catch (err) {
    console.log(err);
  }
};

// login

export const login = async (req, res) => {
  try {
    const user = await findOneUser({ email: req.body.email });
    if (user !== null) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result === true) {
          res.status(200).json({ message: 'Login successful', token: generateAccessToken(user.id) });
        } else if (err) {
          throw new Error('Something went wrong');
        } else res.status(401).json({ message: 'Invalid password' });
      });
    } else res.status(404).json({ message: 'No such user exists' });
  } catch (err) {
    console.log(err);
  }
};

