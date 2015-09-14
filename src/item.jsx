import React from "react";
import {DragSource, DropTarget} from "react-dnd";
import _ from "underscore";
let PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const style={
  border: "1px solid lightgrey",
  textAlign: "center",
  marginBottom: 10
};

const cardSource = {
  beginDrag:(props)=>{
    return {
      index: props.card.index,
      id: props.id
    };
  },
  endDrag: (props, monitor, component)=>{
    console.log(monitor.didDrop(),"tetet", monitor.getDropResult());
    if(monitor.didDrop()){
      props.updatePos();
    }
  },
  isDragging: (props, monitor)=>{
    return props.card.index=== monitor.getItem().index;
    // console.log("isdragging",props.card.index, monitor.getItem());
  }
}

const cardTarget = {
  hover: (props, monitor) =>{
    const draggedId = monitor.getItem().index;
    if (draggedId !== props.card.index) {
      props.move(draggedId, props.card.index);
    }
  },
  drop: (props, monitor, component)=> {
    return {name:props.card.index};
  }
};

function collectSource(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectTarget(connect){
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class Item extends React.Component{
  move(){
    console.log("move of item");
  }
  shouldComponentUpdate(){
      // debugger
      return PureRenderMixin.shouldComponentUpdate.apply(this,arguments);
  }
  render(){
    // console.log("render ", this.props.card.index);
    const  {isDragging,  connectDragSource, connectDropTarget} = this.props;
    const opacity =  isDragging? 0: 1;

    return connectDragSource(connectDropTarget(
      <div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4"  style={{...style, opacity}}>
            <h3>
              Item <strong>{this.props.card.text}</strong>
              <span>**{this.props.card.index}**</span>
              <p>
              <span>**{this.props.id}**</span>
              </p>
            </h3>
            <div>
              <span>Item 1</span>
              <span>Item 2</span>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

Item.propTypes = {
  card: React.PropTypes.object,
  move: React.PropTypes.func,
  updatePos: React.PropTypes.func,
  pos: React.PropTypes.number
}

export default  _.compose(
  DropTarget("Card", cardTarget, collectTarget),
  DragSource("Card", cardSource, collectSource)
) (Item);
