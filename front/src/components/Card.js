import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import AddTask from './AddTask'
import TaskList from './TaskList'

const cardTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();

    if (props.id === item.card) {
      return;
    }

    const lastIdx = props.tasks.length;
    props.moveTask(item.card, props.id, item.index, lastIdx);
    item.card = props.id;
    item.index = lastIdx;
  }
};

@DropTarget('Task', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Card extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    addTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })),
    removeCard: PropTypes.func.isRequired,
  }
  confirmRemove() {
    if (confirm("Are you sure?")) {
      this.props.removeCard();
    }
  }
  render() {
    const {
      name, addTask, removeTask, toggleTask, editTask, tasks,
      savePosition, moveTask, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="card">
        <div className="card-header">
          <h3>{name}</h3>
          <span className="remove-btn" onClick={::this.confirmRemove}>
              ✖
          </span>
        </div>
        <AddTask addTask={addTask} />
        <TaskList tasks={tasks}
                  toggleTask={toggleTask}
                  removeTask={removeTask}
                  editTask={editTask}
                  savePosition={savePosition}
                  moveTask={moveTask} />
      </div>
    );
  }
}
