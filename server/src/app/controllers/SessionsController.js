import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionsController {
  async store(req, res) {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().min(6),
    });

    // Check if request body is valid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid values',
      });
    }

    // Veriffy if user exists in database
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'role', 'password_hash'],
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid E-mail/Password!',
      });
    }

    // Check if password is valid
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid E-mail/Password!',
      });
    }

    return res.json({
      token: jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        authConfig.secret
      ),
      user,
    });
  }
}

export default new SessionsController();
