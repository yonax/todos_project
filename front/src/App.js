import React, { Component } from 'react'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import { TaskApi } from './api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }
  componentWillMount() {
    TaskApi.fetchAll().then(tasks =>
      this.setState({ tasks })
    );
  }
  addTask(text) {
    console.log(`add task with text "${text}"`);
    TaskApi.create(text).then(task =>
      this.setState(({tasks}) => ({ tasks: [...tasks, task] }))
    );
  }
  toggleTask(id, value) {
    console.log(`set task ${id} done to ${value}`);
    TaskApi.toggle(id, value).then(newTask =>
      this.setState(({tasks}) => ({ tasks: tasks.map(t => t.id === id ? newTask : t)}))
    );
  }
  removeTask(id) {
    console.log(`remove task ${id}`);
    TaskApi.remove(id).then(_ =>
      this.setState(({tasks}) => ({ tasks: tasks.filter(t => t.id !== id) }))
    );
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
