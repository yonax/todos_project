import React, { Component } from 'react'
import update from 'react-addons-update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Card from './components/Card'
import AddCard from './components/AddCard'
import { TaskApi, CardApi } from './api'
import '../styles/style.css';

@DragDropContext(HTML5Backend)
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
  editTask(cardId, id, text) {
    const { cards } = this.state;
    const cardIdx = cards.findIndex(c => c.id === cardId);
    const taskIdx = cards[cardIdx].tasks.findIndex(t => t.id === id);

    TaskApi.edit(id, text).then(newTask =>
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
  removeCard(id) {
    const cardIdx = this.state.cards.findIndex(c => c.id === id);
    CardApi.remove(id).then(_ =>
      this.setState(update(this.state, {
        cards: {
          $splice: [[cardIdx, 1]]
        }
      }))
    );
  }
  addCard(name) {
    CardApi.create(name).then(card => {
      this.setState(update(this.state, {
        cards: {
          $push: [card]
        }
      }))
    });
  }

  savePosition(item) {
    TaskApi
      .move(item.id, item.card, item.index)
      .then(newTask => console.log('saved: ', newTask));
  }

  moveTask(fromCard, toCard, dragIndex, hoverIndex) {
    const cards = this.state.cards;

    const fromIdx = cards.findIndex(c => c.id === fromCard);
    const toIdx = cards.findIndex(c => c.id === toCard);

    const dragTask = cards[fromIdx].tasks[dragIndex];
    dragTask.card = toCard;

    const updater =
      fromIdx === toIdx
      ? {
          cards: {
            [fromIdx]: {
              tasks: {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragTask]
                ]
              }
            }
          }
        }
      : {
          cards: {
            [fromIdx]: {
              tasks: {
                $splice: [[dragIndex, 1]]
              }
            },
            [toIdx]: {
              tasks: {
                $splice: [[hoverIndex, 0, dragTask]]
              }
            }
          }
        }

    this.setState(update(this.state, updater));
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="app">
        <AddCard addCard={::this.addCard} />
        <div className="cards">
        {cards.map(props =>
          <Card key={props.id}
                {...props}
                addTask={this.addTask.bind(this, props.id)}
                removeTask={this.removeTask.bind(this, props.id)}
                toggleTask={this.toggleTask.bind(this, props.id)}
                editTask={this.editTask.bind(this, props.id)}
                savePosition={::this.savePosition}
                removeCard={this.removeCard.bind(this, props.id)}
                moveTask={::this.moveTask} />
        )}
        </div>
      </div>
    );
  }
}
