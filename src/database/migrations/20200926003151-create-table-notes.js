module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes', {
      uid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notes');
  },
};
