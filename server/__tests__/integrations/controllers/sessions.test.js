import request from 'supertest';

import factories from '../../factories';
import app from '../../../src/app';
import truncate from '../../util/truncate';

describe('Sessions Controller', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not be able to authenticate with wrong request body', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: null,
        password: null,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'noexists@noexists.com',
        password: 'teste123',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await factories.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'invalidPasswordToTest',
      });

    expect(response.status).toBe(401);
  });

  it('should be able to authenticate and return token', async () => {
    // Creates random user in database
    const user = await factories.create('User');

    const { email, password } = user;

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    expect(response.body).toHaveProperty('token');
  });
});
