'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      username: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      password: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      role: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      img_avatar: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      img_background: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      createDate: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal('GETDATE()') 
      },
      refreshToken: { 
        type: Sequelize.STRING, 
        allowNull: true 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
