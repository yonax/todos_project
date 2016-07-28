import React, { Component } from 'react'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], nextId: 0 };
  }
  addTask(text) {
    console.log(`add task with text "${text}"`);
    this.setState(({tasks, nextId}) => ({
      tasks: [...tasks, {text, done: false, id: nextId}],
      nextId: nextId + 1
    }));
  }
  toggleTask(id, value) {
    console.log(`set task ${id} done to ${value}`);
    this.setState(({tasks}) => ({
      tasks: tasks.map(t => t.id === id ? {...t, done: value} : t),
    }));
  }
  removeTask(id) {
    console.log(`remove task ${id}`);
    this.setState(({tasks}) => ({
      tasks: tasks.filter(t => t.id !== id)
    }));
  }
  render() {
    return (
      <div>
        <AddTask addTask={::this.addTask} />
        <TaskList tasks={this.state.tasks}
                  toggleTask={::this.toggleTask}
                  removeTask={::this.removeTask} />
      </div>
    );
  }
}
