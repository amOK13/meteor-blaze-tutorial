import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../db/ExportsCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find();
});
