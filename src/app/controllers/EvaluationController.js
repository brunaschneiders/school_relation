import Evaluation from '../models/Evaluation';
import Note from '../models/Note';
import User from '../models/User';

class EvaluationController {
  async index(req, res) {
    try {
      const evaluations = await Evaluation.findAll({
        attributes: ['uid', 'matter', 'description'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'age', 'email'],
          },
          {
            model: Note,
            as: 'notes',
            attributes: ['uid', 'description', 'note'],
          },
        ],
      });
      return res.json({ evaluations });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const evaluation = await Evaluation.findByPk(uid, {
        attributes: ['uid', 'matter', 'description'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'age', 'email'],
          },
          {
            model: Note,
            as: 'notes',
            attributes: ['uid', 'description', 'note'],
          },
        ],
      });
      return res.json({ evaluation });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const evaluation = await Evaluation.create(req.body);
      return res.json({ evaluation });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new EvaluationController();
