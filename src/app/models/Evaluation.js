import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        matter: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_uid: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'uid',
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uid',
    });
    this.hasMany(models.Note, {
      as: 'notes',
      foreignKey: 'evaluation_uid',
    });
  }
}

export default Evaluation;
