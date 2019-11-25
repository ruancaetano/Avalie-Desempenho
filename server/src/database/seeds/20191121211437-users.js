const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          password_hash: await bcrypt.hash('teste123', 8),
          office: 'Admin',
          role: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
