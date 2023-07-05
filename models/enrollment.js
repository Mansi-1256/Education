import { Sequelize, Model } from 'sequelize'
import User from './user.js'
import Course from './course.js'
import { sequelize } from '../config/database.js';

class Enrollment extends Model { }

Enrollment.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    instructorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    grade: {
      type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E', 'F'),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Enrollment',
  }
);

Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Enrollment.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

export default Enrollment;
