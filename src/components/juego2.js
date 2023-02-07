import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from 'sweetalert2';
// fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}`,
//     content: `item ${k + offset}`
//   }));
  

// }
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
//   console.log(sourceClone, destClone);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "#ddae75" : "#000000" ,
  color: "white",
  
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver, isEmpty) => ({
  background: isDraggingOver ? "#a38867" : "#a38867",
  display: "flex",
  padding: grid,
  overflow: "auto",
  minHeight: isEmpty ? "45px" : "NaN",

});

const initialTasks = [
    {
        id: "2",
        content: "+",
    },




];
const initialTasks2 = [
    {
        id: "1",
        content: "TERCERA",
      },
    {
      id: "3",
      content: "MAYOR",
    },
    {
      id: "4",
      content: "CUARTA",
    },
    {
      id: "5",
      content: "SEGUNDA",
    },
    {
      id: "6",
      content: "MENOR",
    }, 
    {
        id: "7",
        content: "DISMINUIDA",
    },
 
];
const ordenado = [
    {
        id: "1",
        content: "DO",
    },
    {
        id: "2",
        content: "RE",
    },
    {
        id: "3",
        content: "MI",
    },  
    {
        id: "4",
        content: "FA",
    },
    {
        id: "5",
        content: "SOL",
    },
    {
        id: "6",
        content: "LA",
    },
    {
        id: "7",
        content: "SI",
    },
];

class Prueba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: initialTasks,
      selected: initialTasks2,
      bottom: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addText = this.addText.bind(this);
    this.Verificar = this.Verificar.bind(this);
    
  }


  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected",
    droppable3: "bottom"
  };
  
  getList = id => this.state[this.id2List[id]];
  
  onDragEnd = result => {
    const { source, destination } = result;
     
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      if (source.droppableId === "droppable3") {
        state = { bottom: items };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      if (result.droppable) {
        this.setState({ items: result.droppable });
      }
      if (result.droppable2) {
        this.setState({ selected: result.droppable2 });
      }
      if (result.droppable3) {
        this.setState({ bottom: result.droppable3 });
      }
    }
  };

  addText() {
    const items = this.state.items.map((i, idx) => {
      if (idx % 2) {
        i.content +=
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
        return i;
      } else {
        return i;
      }
    });
    this.setState({
      items
    });
  }

  Verificar(){
    const itms = this.state.items;
    // console.log("hola",itms[0]);
    // console.log("hola",itms.length);
    // console.log("Ordenado:", ordenado[0]);
    if(itms.length<3){
      Swal.fire({
        title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
        width: 500,
        icon: 'error',
        padding: '20px',
        color: '#fff',
        background: '#8C6D46',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonColor: "#413629"
     })
    }

    else if(itms[0].id === ordenado[0].id &&
        itms[1].id === ordenado[1].id &&
        itms[2].id === ordenado[2].id 
      )
    {
      Swal.fire({
        title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
        width: 500,
        icon: 'success',
        padding: '20px',
        color: '#fff',
        background: '#8C6D46',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonColor: "#413629"
     })
    }
    else {
      Swal.fire({
        title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
        width: 500,
        icon: 'error',
        padding: '20px',
        color: '#fff',
        background: '#8C6D46',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonColor: "#413629"
     })
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} >
    <h5>Arrastra los items necesarios para formar un intervalo equivalente a <b>2 tonos</b></h5> 
        
        <Droppable droppableId="droppable" direction="horizontal" >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable3" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, true)}
            >
              {this.state.bottom.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button onClick={this.Verificar}>Verificar</button>
      </DragDropContext>
    );
  }
}
export default Prueba;