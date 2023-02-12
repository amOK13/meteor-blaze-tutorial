import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TasksCollection } from '../db/TasksCollection';
import './App.html';
import './Task.js';

Template.mainContainer.onCreated(function mainContainerOnCreated() {
});

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find(
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },
});

Template.form.events({
  'submit .task-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const { target } = event;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
});