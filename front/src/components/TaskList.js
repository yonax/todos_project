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
    const { tasks, removeTask, toggleTask, editTask,
            savePosition, moveTask, connectDropTarget } = this.props;

    return (
      <div>
        {tasks.map((props, index) =>
          <Task key={props.id}
                index={index}
                toggle={toggleTask.bind(null, props.id, !props.done)}
                remove={removeTask.bind(null, props.id)}
                edit={editTask.bind(null, props.id)}
                savePosition={savePosition}
                moveTask={moveTask}
                {...props} />
        )}
      </div>
    );
  }
}
