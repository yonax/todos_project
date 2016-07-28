import React, { Component, PropTypes } from 'react'

export default class AddTask extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  onChange(e) {
    this.setState({ text: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    
    const { text } = this.state;
    const { addTask } = this.props;

    if (text) {
      addTask(text);
      this.setState({ text: '' });
    }
  }
  render() {
    const { text } = this.state;
    return (
      <form onSubmit={::this.submit}>
        <input type="input" onChange={::this.onChange} value={text} />
        <button type="submit">Add task</button>
      </form>
    );
  }
}
