import request from 'supertest';

import factories from '../../factories';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import generateToken from '../../util/token';

describe('Evaluations Controller', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();

    token = await generateToken();
  });

  // GET - /evaluations
  describe('Listing evaluations', () => {
    it('should not bet able to list evaluations with invalid token', async () => {
      const response = await request(app)
        .get('/evaluations')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should be able to list evaluations', async () => {
      // Create user
      await factories.create('Evaluation');

      // list users
      const response = await request(app)
        .get(`/evaluations`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
    });
  });

  // POST - /evaluations
  describe('Creating evaluations', () => {
    it('should not bet able to create new evaluation with invalid token', async () => {
      const response = await request(app)
        .post('/evaluations')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should not be able to create evaluation with invalid values', async () => {
      const evaluation = await factories.attrs('Evaluation', {
        technicalKnowledge: null,
        teamWork: null,
        commitment: null,
        organization: null,
        proactivity: null,
        appraiserId: null,
        appraisedId: null,
      });

      const response = await request(app)
        .post('/evaluations')
        .set('Authorization', `Bearer ${token}`)
        .send(evaluation);

      expect(response.status).toBe(400);
    });

    it('should not be able to register with already registred values', async () => {
      const evaluation = await factories.create('Evaluation');
      const { appraisedId, appraiserId } = evaluation;
      const duplicatedEvaluation = await factories.attrs('Evaluation', {
        appraisedId,
        appraiserId,
      });

      const response = await request(app)
        .post('/evaluations')
        .set('Authorization', `Bearer ${token}`)
        .send(duplicatedEvaluation);

      expect(response.status).toBe(400);
    });

    it('should be able to register new evaluation', async () => {
      const evaluation = await factories.attrs('Evaluation');
      const response = await request(app)
        .post('/evaluations')
        .set('Authorization', `Bearer ${token}`)
        .send(evaluation);

      expect(response.body).toHaveProperty('id');
    });
  });

  // PUT - /evaluations/:id
  describe('Updating evaluations', () => {
    it('should not bet able to update evaluation with invalid token', async () => {
      const response = await request(app)
        .put('/evaluations/null')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should not bet able to update evaluation with invalid id', async () => {
      const response = await request(app)
        .put('/evaluations/null')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(400);
    });

    it('should not be able to update evaluation with invalid values', async () => {
      const evaluation = await factories.create('Evaluation');

      const response = await request(app)
        .put(`/evaluations/${evaluation.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          technicalKnowledge: null,
          teamWork: null,
          commitment: null,
          organization: null,
          proactivity: null,
        });

      expect(response.status).toBe(400);
    });

    it('should be able to update evaluation', async () => {
      const { id } = await factories.create('Evaluation');

      const response = await request(app)
        .put(`/evaluations/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          technicalKnowledge: 0,
          teamWork: 0,
          commitment: 0,
          organization: 0,
          proactivity: 0,
        });

      expect(response.body.technicalKnowledge).toBe(0);
      expect(response.body.teamWork).toBe(0);
      expect(response.body.commitment).toBe(0);
      expect(response.body.proactivity).toBe(0);
    });
  });

  // DELETE - /evaluations/:id
  describe('Deleting evaluation', () => {
    it('should not bet able to delete evaluations with invalid token', async () => {
      const response = await request(app)
        .delete('/evaluations/null')
        .set('Authorization', 'invalid token')
        .send();

      expect(response.status).toBe(401);
    });

    it('should not bet able to delete with invalid id', async () => {
      const response = await request(app)
        .delete('/evaluations/null')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(400);
    });

    it('should be able to delete evaluation', async () => {
      // Create evaluation
      const evaluation = await factories.create('Evaluation');
      const response = await request(app)
        .delete(`/evaluations/${evaluation.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(202);
    });
  });
});
