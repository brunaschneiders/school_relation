import Evaluation from '../models/Evaluation';
import Note from '../models/Note';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Evaluation,
            as: 'evaluations',
            attributes: ['uid', 'matter', 'description'],
            include: [
              {
                model: Note,
                as: 'notes',
              },
            ],
          },
        ],
      });
      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findByPk(uid, {
        include: [
          {
            model: Evaluation,
            as: 'evaluations',
            attributes: ['uid', 'matter', 'description'],
            include: [
              {
                model: Note,
                as: 'notes',
              },
            ],
          },
        ],
      });
      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const { email } = req.body;
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        throw Error('Usuário já cadastrado');
      }
      const user = await User.create(req.body);
      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.json({ error: 'usuário não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const { name } = await user.update(req.body);
      return res.json({ user: { uid, name, email } });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserController();
