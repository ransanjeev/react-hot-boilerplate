require("./style.less");
import React, { Component } from 'react';
import Navbar from "./navbar.jsx";
import Item from "./item";
import _ from "underscore";
import {DragDropContext} from "react-dnd";
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Immutable from "immutable";
import update from 'react/lib/update';
let Card = Immutable.Record({index:0, text:''})
class App extends Component {
  constructor(props){
    super(props);
    let cards = Immutable.Range(0,15,1).toList()
                  .map((index)=>{
                    return new Card({
                      index: index,
                      text: `${index} card`
                    });
                  });
    window.list = cards;
    this.state = {
      cards : cards
    }

    this.move = this.move.bind(this);
    this.updatePos = this.updatePos.bind(this);
  }

  move(from, to){

    let cards = this.state.cards;
    let fromIndex = cards.findIndex((card)=>{
      return card.index == from;
    });
    let toIndex = cards.findIndex((card)=>{
      return card.index == to;
    });
    let fromCard = cards.get(fromIndex);
    var newList = cards.splice(fromIndex,1);
    var updatedList = newList.splice(toIndex ,0 , fromCard);
    this.setState({cards: updatedList});

    console.log("********************************************");
    console.log("from ", from,fromIndex, to, toIndex);
  }
  updatePos(){
    console.log("updatin the position", this.state.cards.toJS());
    let newList = this.state.cards.map((card,index)=>{
      return card.set('index', index);
    });
    this.setState({cards: newList});
    console.log("updatin the position", newList.toJS());
  }
  render() {
    let items = this.state.cards.map((card,index)=>{
      return <Item key={index} card={card} move={this.move} updatePos={this.updatePos} id={index}/>
    });
    return (
      <div className="page">
        <Navbar/>
        <div className="container-fluid">
          <div className="row-fluid">
            {items.toJS()}
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
