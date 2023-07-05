import { DataTypes, Model } from 'sequelize';
import { default as User } from './user.js';
import { sequelize } from '../config/database.js';

class Course extends Model { }

Course.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'Course', // We need to choose the model name
  }
);

Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

export default Course;
