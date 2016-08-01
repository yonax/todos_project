import React, { Component, PropTypes } from 'react'
import Task from './Task'

export default class TaskList extends Component {
  static propTypes = {
    removeTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }))
  }
  render() {
    const { tasks, removeTask, toggleTask, editTask } = this.props;

    return (
      <div>
        {tasks.map(({id, ...props}) =>
          <Task key={id}
                toggle={toggleTask.bind(null, id, !props.done)}
                remove={removeTask.bind(null, id)}
                edit={editTask.bind(null, id)}
                {...props} />
        )}
      </div>
    )
  }
}
