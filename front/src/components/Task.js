import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom';

const style = {
  padding: "0.8em",
  margin: "0.4em 0",
  border: "1px dashed"
}
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

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

    const justView = (
      <div>
        <input type="checkbox" checked={done} onChange={toggle} />
        <span>{text}</span>
        <span style={{color: 'red', marginLeft: '1em', cursor: 'pointer'}}
              onClick={remove}>X</span>
      </div>
    );
    const editor = (
        <input ref="editField" type="text" value={this.state.text}
               onBlur={::this.handleSubmit}
               onChange={::this.handleChange}
               onKeyDown={::this.handleKeyDown} />
    )
    return (
      <li style={style} onDoubleClick={() => this.setState({ editing: true })}>
        { editing ? editor : justView }
      </li>
    )
  }
}
