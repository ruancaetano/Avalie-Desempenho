import * as Yup from 'yup';

import Evaluation from '../models/Evaluation';
import User from '../models/User';

class EvaluationsController {
  async index(req, res) {
    const { appraisedId, appraiserId } = req.query;

    let where = {};
    if (appraisedId) {
      where = { appraisedId };
    }
    if (appraiserId) {
      where = { appraiserId };
    }
    const evaluations = await Evaluation.findAll({
      where,
      include: [
        {
          model: User,
          as: 'appraiser',
        },
        {
          model: User,
          as: 'appraised',
        },
      ],
      order: [
        appraisedId
          ? ['appraiser', 'name', 'ASC']
          : ['appraised', 'name', 'ASC'],
      ],
    });

    return res.json(evaluations || []);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      technicalKnowledge: Yup.number().required(),
      teamWork: Yup.number().required(),
      commitment: Yup.number().required(),
      organization: Yup.number().required(),
      proactivity: Yup.number().required(),
      appraiserId: Yup.number().required(),
      appraisedId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid values',
      });
    }

    const { appraiserId, appraisedId } = req.body;
    const alreadyRegistred = await Evaluation.findOne({
      where: {
        appraiserId,
        appraisedId,
      },
    });

    if (alreadyRegistred) {
      return res.status(400).json({
        message: 'This relationship already exists',
      });
    }

    const evaluation = await Evaluation.create(req.body);
    return res.json(evaluation);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      technicalKnowledge: Yup.number().required(),
      teamWork: Yup.number().required(),
      commitment: Yup.number().required(),
      organization: Yup.number().required(),
      proactivity: Yup.number().required(),
    });

    const evaluation = await Evaluation.findByPk(id);

    if (!evaluation) {
      return res.status(400).json({
        message: 'Evaluation not found!',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid values',
      });
    }

    const {
      technicalKnowledge,
      teamWork,
      commitment,
      organization,
      proactivity,
      appraiserId,
      appraisedId,
    } = await evaluation.update(req.body);

    return res.json({
      id,
      technicalKnowledge,
      teamWork,
      commitment,
      organization,
      proactivity,
      appraiserId,
      appraisedId,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    // Check if user exists
    const evaluation = await Evaluation.findByPk(id);

    if (!evaluation) {
      return res.status(400).json({
        message: 'Evaluation not found!',
      });
    }

    await evaluation.destroy();

    return res.status(202).json();
  }
}

export default new EvaluationsController();
