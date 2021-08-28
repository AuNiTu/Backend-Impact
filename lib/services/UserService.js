import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {

  static async create({ username, password, longitude, latitude }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({ username, passwordHash, longitude, latitude });

    return user;
  }

  static async authorize({ username, password }) {

    const user = await User.findByUsername(username);
    
    if(!user) {
      throw new Error('Bad username you baddy');
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if(!passwordMatch) {
      throw new Error('Bad password you baddy');
    }

    return user;
  }

}


