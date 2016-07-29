import React, { Component } from 'react'
import update from 'react-addons-update';
import Card from './components/Card'
import { TaskApi, CardApi } from './api'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }
  componentWillMount() {
    CardApi.fetchAll().then(cards =>
      this.setState({ cards })
    );
  }
  addTask(cardId, text) {
    console.log(`add task with text "${text} to card ${cardId}"`);
    const cardIdx = this.state.cards.findIndex(c => c.id === cardId);

    TaskApi.create(cardId, text).then(task =>
      this.setState(update(this.state, {
        cards: {
          [cardIdx]: {
            tasks: {
              $push: [task]
            }
          }
        }
      }))
    );
  }
  toggleTask(cardId, id, value) {
    console.log(`set task ${id} done to ${value}`);
    const { cards } = this.state;
    const cardIdx = cards.findIndex(c => c.id === cardId);
    const taskIdx = cards[cardIdx].tasks.findIndex(t => t.id === id);

    TaskApi.toggle(id, value).then(newTask =>
      this.setState(update(this.state, {
        cards: {
          [cardIdx]: {
            tasks: {
              [taskIdx]: {
                $set: newTask
              }
            }
          }
        }
      }))
    );
  }
  removeTask(cardId, id) {
    console.log(`remove task ${id}`);
    const { cards } = this.state;
    const cardIdx = cards.findIndex(c => c.id === cardId);
    const taskIdx = cards[cardIdx].tasks.findIndex(t => t.id === id);

    TaskApi.remove(id).then(_ =>
      this.setState(update(this.state, {
        cards: {
          [cardIdx]: {
            tasks: {
              $splice: [[taskIdx, 1]]
            }
          }
        }
      }))
    );
  }
  render() {
    const { cards } = this.state;
    return (
      <div>
      {cards.map(({id, name, tasks}) =>
        <Card key={id}
              addTask={this.addTask.bind(this, id)}
              removeTask={this.removeTask.bind(this, id)}
              toggleTask={this.toggleTask.bind(this, id)}
              tasks={tasks}
              name={name} />
      )}
      </div>
    );
  }
}
