import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText) =>
  TasksCollection.insert({
    text: taskText,
    createdAt: new Date(),
  });

Meteor.startup(() => {

  console.log('TasksCollection.find().count() = ', TasksCollection.find().count());
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText));
  }
});
