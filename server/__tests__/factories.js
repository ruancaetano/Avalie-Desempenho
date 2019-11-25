import faker from 'faker';
import factory from 'factory-girl';

import User from '../src/app/models/User';
import Evaluation from '../src/app/models/Evaluation';

factory.define('User', User, {
  name: faker.name.findName(),
  email: factory.seq('User.email', n => `user${n}@ymail.com`),
  password: faker.internet.password(),
  office: faker.name.jobTitle(),
  role: 1,
});

factory.define('Evaluation', Evaluation, {
  technicalKnowledge: 5,
  teamWork: 5,
  commitment: 5,
  organization: 5,
  proactivity: 5,
  appraiserId: factory.assoc('User', 'id'),
  appraisedId: factory.assoc('User', 'id'),
});

export default factory;
