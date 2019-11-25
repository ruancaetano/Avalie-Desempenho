import * as Yup from 'yup';

import User from '../models/User';

class UsersController {
  async index(req, res) {
    const users = await User.findAll({
      where: {
        role: 1,
      },
      attributes: ['id', 'name', 'email', 'office', 'role'],
    });

    return res.json(users || []);
  }

  async store(req, res) {
    const { email } = req.body;

    // Body validation schema
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().min(6),
      office: Yup.string().required(),
    });

    // Check if the request body is valid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Invalid values',
      });
    }

    // Check if email is already in use
    const duplicatedEmail = await User.findOne({ where: { email } });

    if (duplicatedEmail) {
      return res.status(400).json({
        error: 'Duplicated e-mail',
      });
    }

    const { id, name, office } = await User.create(req.body);

    return res.json({ id, name, email, office });
  }

  async update(req, res) {
    const { id } = req.params;
    // Body validation schema
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      office: Yup.string().required(),
    });

    // Check if user exists
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        error: 'User not found!',
      });
    }

    // Check if the request body is valid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Invalid values',
      });
    }

    const { name, email, office } = await user.update(req.body);

    return res.json({ id, name, email, office });
  }

  async delete(req, res) {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        error: 'User not found!',
      });
    }

    await user.destroy();

    return res.status(202).json();
  }
}

export default new UsersController();
