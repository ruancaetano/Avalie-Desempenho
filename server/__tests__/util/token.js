import jwt from 'jsonwebtoken';

import authConfig from '../../src/config/auth';
import factories from '../factories';

export default async function generateToken() {
  const admin = await factories.create('User', {
    email: 'admin@admin.com',
    password: 'teste123',
    role: 0,
  });

  return jwt.sign(
    {
      id: admin.id,
      role: admin.role,
    },
    authConfig.secret
  );
}
