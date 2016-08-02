import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd'

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

const taskSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.id,
      card: props.card
    };
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    props.savePosition(item, props.index);
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const dragIndex = item.index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveTask(item.card, props.card, dragIndex, hoverIndex);
    item.index = hoverIndex;
    item.card = props.card;
  }
};

@DropTarget('Task', taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@DragSource('Task', taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Task extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { text: props.text, editing: false };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const node = findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }
  handleSubmit() {
    const { text } = this.state;
    if (text) {
      this.props.edit(text);
      this.setState({ editing: false });
    } else {
      this.props.remove();
    }
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleKeyDown(e) {
    switch(e.which) {
      case ESCAPE_KEY:
        this.setState({ text: this.props.text, editing: false });
        break;
      case ENTER_KEY:
        this.handleSubmit(event);
        break;
    }
  }
  render() {
    const { editing } = this.state;
    const { text, done, remove, toggle } = this.props;
    const { isOver, isDragging, connectDropTarget, connectDragSource } = this.props;

    const justView = (
      <div>
        <input type="checkbox" checked={done} onChange={toggle} />
        <span className="task-text">{text}</span>
        <span className="remove-btn" onClick={remove}>✖</span>
      </div>
    );
    const editor = (
      <div>
        <input ref="editField" type="text" value={this.state.text}
               onBlur={::this.handleSubmit}
               onChange={::this.handleChange}
               onKeyDown={::this.handleKeyDown} />
      </div>
    )
    return connectDragSource(connectDropTarget(
      <div className={"task-item" + (isDragging ? ' dragged' : '')}
           onDoubleClick={() => this.setState({ editing: true })}>
        { editing ? editor : justView }
      </div>
    ));
  }
}
