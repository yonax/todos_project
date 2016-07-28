import React, { Component, PropTypes } from 'react'
import Task from './Task'

const style = {
  margin: '0',
  padding: '0',
  listStyle: 'none'
};

export default class TaskList extends Component {
  static propTypes = {
    removeTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }))
  }
  render() {
    const { tasks, removeTask, toggleTask } = this.props;

    return (
      <ul style={style}>
        {tasks.map(({id, ...props}) =>
          <Task key={id}
                toggle={toggleTask.bind(null, id, !props.done)}
                remove={removeTask.bind(null, id)}
                {...props} />
        )}
      </ul>
    )
  }
}
