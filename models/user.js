import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../config/database.js';
import bcrypt from 'bcrypt'
class User extends Model {
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
  async confirmPassword(password) {    
    return await bcrypt.compare(password, this.dataValues.password)
  }
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userType: {
    type: Sequelize.ENUM('instructor', 'student'),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.dataValues.password, 10);
  user.dataValues.password = hashedPassword;
});

export default User;