import React, { Component, PropTypes } from 'react'

export default class AddCard extends Component {
  static propTypes = {
    addCard: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }
  onChange(e) {
    this.setState({ name: e.target.value });
  }
  submit(e) {
    e.preventDefault();

    const { name } = this.state;
    if (name) {
      this.props.addCard(name);
      this.setState({ name: '' });
    }
  }
  render() {
    const { name } = this.state;
    return (
      <form onSubmit={::this.submit}>
        <input type="text" value={name} onChange={::this.onChange} />
        <button type="submit">Add card</button>
      </form>
    );
  }
}
