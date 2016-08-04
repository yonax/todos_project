import React, { Component, PropTypes } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import AddTask from './AddTask'
import TaskList from './TaskList'

const cardTaskTarget = {
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

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();

    if (props.id === item.id) {
      return;
    }

    props.moveCard(item.id, props.id);
    item.index = props.id;
  }
};

@DragSource('Card', cardSource, (connect, monitor) => ({
  connectCardSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget('Card', cardTarget, (connect, monitor) => ({
  connectCardTarget: connect.dropTarget()
}))
@DropTarget('Task', cardTaskTarget, (connect, monitor) => ({
  connectTaskTarget: connect.dropTarget()
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
      name,
      connectCardSource,
      connectCardTarget,
      connectTaskTarget,
      isDragging
    } = this.props;

    return connectCardSource(connectCardTarget(connectTaskTarget(
      <div className={"card" + (isDragging ? ' dragged' : '')}>
        <div className="card-header">
          <h3>{name}</h3>
          <span className="remove-btn" onClick={::this.confirmRemove}>
              ✖
          </span>
        </div>
        <AddTask addTask={this.props.addTask} />
        <TaskList tasks={this.props.tasks}
                  toggleTask={this.props.toggleTask}
                  removeTask={this.props.removeTask}
                  editTask={this.props.editTask}
                  savePosition={this.props.savePosition}
                  moveTask={this.props.moveTask} />
      </div>
    )));
  }
}
