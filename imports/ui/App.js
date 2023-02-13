import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TasksCollection } from '../db/TasksCollection';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';
import './App.html';
import './Task.js';

const HIDE_COMPLETED_STRING = 'hideCompleted';

const getTasksFilter = () => {
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const pendingOnlyFilter = { ...hideCompletedFilter };
  return { pendingOnlyFilter };
};

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('tasks');
  Tracker.autorun(() => {
  });
});

Template.mainContainer.events({
  'click #hide-completed-button'(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  'click .user'() {
    Meteor.logout();
  },
});

Template.mainContainer.helpers({
  tasks() {
    const { pendingOnlyFilter } = getTasksFilter();

    return TasksCollection.find(
      pendingOnlyFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },
  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteCount() {
    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount = TasksCollection.find(
      pendingOnlyFilter
    ).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
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
