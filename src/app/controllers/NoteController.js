import Evaluation from '../models/Evaluation';
import Note from '../models/Note';

class NoteController {
  async index(req, res) {
    try {
      const notes = await Note.findAll({
        attributes: ['uid', 'description', 'note'],
      });
      return res.json({ notes });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const note = await Note.findByPk(uid, {
        attributes: ['uid', 'user_uid', 'description', 'note'],
        include: [
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['uid', 'matter', 'description'],
          },
        ],
      });
      return res.json({ note });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const note = await Note.create(req.body);
      return res.json({ note });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new NoteController();
