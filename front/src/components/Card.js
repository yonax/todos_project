import React, { Component, PropTypes } from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'

export default class Card extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }))
  }
  render() {
    const { name, addTask, removeTask, toggleTask, tasks } = this.props;
    const style = {
      backgroundColor: '#eff0f5',
      padding: '0.4em',
      margin: '1em 0'
    }
    return (
      <div style={style}>
        <h3>{name}</h3>
        <AddTask addTask={addTask} />
        <TaskList tasks={tasks}
                  toggleTask={toggleTask}
                  removeTask={removeTask} />
      </div>
    );
  }
}
