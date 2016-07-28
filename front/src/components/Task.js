import React, { Component, PropTypes } from 'react'

const style = {
  padding: "0.8em",
  margin: "0.4em 0",
  border: "1px dashed"
}

export default class Task extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
  }
  render() {
    const { text, done, remove, toggle } = this.props;

    return (
      <li style={style}>
        <input type="checkbox" checked={done} onChange={toggle} />
        <span>{text}</span>
        <span style={{color: 'red', marginLeft: '1em', cursor: 'pointer'}}
              onClick={remove}>X</span>
      </li>
    )
  }
}
