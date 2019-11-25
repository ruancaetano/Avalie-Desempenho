import { Op } from 'sequelize';

import Evaluation from '../models/Evaluation';
import User from '../models/User';

class NewAppraisersController {
  async index(req, res) {
    const { searchTerm } = req.query;
    const { appraisedId } = req.params;

    if (!searchTerm) {
      return res.status(400).json({
        message: 'Invalid search!',
      });
    }

    // Search all named users who have the search term
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
        id: {
          [Op.not]: appraisedId,
        },
        role: 1,
      },
      order: [['name', 'ASC']],
    });

    // Searches all users who have already rated the user you want to add a new reviewer to.
    const evaluations = await Evaluation.findAll({
      where: {
        appraisedId,
      },
    });

    return res.json(
      users.filter(user => {
        const alreadyAnAppraiser = evaluations.find(
          evaluation => evaluation.appraiserId === user.id
        );

        if (alreadyAnAppraiser) return false;
        return true;
      })
    );
  }
}

export default new NewAppraisersController();
