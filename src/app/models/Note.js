import Sequelize, { Model } from 'sequelize';

class Note extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        user_uid: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        evaluation_uid: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'evaluations',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        note: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Evaluation, {
      as: 'evaluation',
      foreignKey: 'evaluation_uid',
    });
  }
}

export default Note;
