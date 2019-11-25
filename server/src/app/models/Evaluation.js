import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
  static init(sequelize) {
    super.init(
      {
        technicalKnowledge: Sequelize.INTEGER,
        teamWork: Sequelize.INTEGER,
        commitment: Sequelize.INTEGER,
        organization: Sequelize.INTEGER,
        proactivity: Sequelize.INTEGER,
        wasEvaluationPerformed: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              this.technicalKnowledge !== 0 ||
              this.teamWork !== 0 ||
              this.commitment !== 0 ||
              this.organization !== 0 ||
              this.proactivity !== 0
            );
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
    this.belongsTo(models.User, { foreignKey: 'appraiserId', as: 'appraiser' });
    this.belongsTo(models.User, { foreignKey: 'appraisedId', as: 'appraised' });
  }
}

export default Evaluation;
