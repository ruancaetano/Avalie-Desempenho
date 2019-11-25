module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      appraiser_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      appraised_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      technical_knowledge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team_work: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      commitment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      organization: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      proactivity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('evaluations');
  },
};
