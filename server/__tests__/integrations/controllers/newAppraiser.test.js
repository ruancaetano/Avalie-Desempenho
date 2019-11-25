import request from 'supertest';
import bcrypt from 'bcryptjs';

import factories from '../../factories';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import generateToken from '../../util/token';

describe('NewAppraiser Controller', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    token = await generateToken();
  });

  // GET - /appraisers/:appraisedId
  describe('Listing new appraisers', () => {
    it('should not bet able to list appraisers with invalid token', async () => {
      const response = await request(app)
        .get('/appraisers/1?searchTerm=name')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should not bet able to list appraisers with invalid query params', async () => {
      const response = await request(app)
        .get('/appraisers/1?searchTerm=')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(400);
    });

    it('should be able to list new appraisers', async () => {
      // Create user
      const [appraiser, appraised, anotherUser] = await factories.createMany(
        'User',
        3
      );

      // Create evaluation with appraiser, appraised users
      await factories.create('Evaluation', {
        appraisedId: appraised.id,
        appraiserId: appraiser.id,
      });
      /**
       * List available new appraisers for appraised user, searching for the first
       * letter of the username that is expected as return
       */
      const response = await request(app)
        .get(`/appraisers/${appraised.id}?searchTerm=${anotherUser.name[0]}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.body[0].id).toBe(anotherUser.id);
    });
  });

  // POST /users tests
  describe('Creating new user', () => {
    it('should not bet able to create new user with invalid token', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', 'invalid token')
        .send({});

      expect(response.status).toBe(401);
    });

    it('should not be able to create user with invalid values', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: null,
          email: null,
          password: null,
          office: null,
        });

      expect(response.status).toBe(400);
    });

    it('should not be able to create user with duplicated email', async () => {
      // Creates random user in database
      const user = await factories.attrs('User');

      await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(400);
    });

    it('should be able to create password hash', async () => {
      const user = await factories.create('User', {
        password: '123456',
      });

      const compareHash = await bcrypt.compare('123456', user.password_hash);
      expect(compareHash).toBe(true);
    });

    it('should be able to create new user', async () => {
      const user = await factories.attrs('User');
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.body).toHaveProperty('id');
    });
  });

  // PUT - /users/:id
  describe('Updating user', () => {
    it('should not bet able to update user with invalid token', async () => {
      const response = await request(app)
        .put('/users/null')
        .set('Authorization', 'invalid token')
        .send({});

      expect(response.status).toBe(401);
    });

    it('should not bet able to update with invalid id', async () => {
      const response = await request(app)
        .put('/users/null')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it('should not be able to update user with invalid values', async () => {
      // Create user
      const user = await factories.create('User');

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: null,

          office: null,
        });

      expect(response.status).toBe(400);
    });

    it('should be able to update user', async () => {
      // Create user
      const user = await factories.create('User');

      // Update user name and office
      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated name',
          office: 'Updated office',
        });

      expect(response.body.name).toBe('Updated name');
      expect(response.body.office).toBe('Updated office');
    });
  });

  // DELETE - /users/:id
  describe('Deleting user', () => {
    it('should not bet able to delete user with invalid token', async () => {
      const response = await request(app)
        .delete('/users/null')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should not bet able to delete with invalid id', async () => {
      const response = await request(app)
        .delete('/users/null')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(400);
    });

    it('should be able to delete user', async () => {
      // Create user
      const user = await factories.create('User');

      // Delete user
      const response = await request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(202);
    });
  });
});
