import { useState, useCallback } from 'react';

import Form from './Form';
import List from './List';
import { Todo, NavAction } from '../types';
import { updateTodo } from '../services';

interface MainPropsType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  dispatchCurrentNav: React.Dispatch<NavAction>
}

const Main = ({ todos, setTodos, dispatchCurrentNav }: MainPropsType) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  
  
  let editTodo: Todo | undefined;
  if (editId !== null) {
    editTodo = todos.find((todo) => todo.id === editId);
  }
  
  
  const toggleModal = useCallback(() => {
    setModalShow((prev) => !prev);
  }, [setModalShow]);
  
  //function reference stay the same
  const handleComplete = useCallback(async(id: number, isCompleted: boolean) => {
    const data = await updateTodo({ id, completed: !isCompleted });
    console.log(data);
    
    setTodos((prevTodos) => prevTodos.map(todo => {
      if (todo.id === data.id) {
        return {...data};
      } else {
        return todo;
      }
    }));
  }, [setTodos]);
  
  return (
    <main>
      <label htmlFor="new_item" onClick={() => {
        setEditId(null);
        toggleModal();}}>
        <img src="images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
      <table cellSpacing="0">
        <tbody>
          <List todos={todos} 
                onComplete={handleComplete} 
                onToggleModal={toggleModal} 
                setEditId={setEditId}
                setTodos={setTodos}
          />
        </tbody>
      </table>
        { modalShow &&
        (
        <>
        <div className="modal" id="modal_layer" onClick={toggleModal}></div>
        <div className="modal" id="form_modal">
          <Form onToggleModal={toggleModal} 
                onComplete={handleComplete} 
                editTodo={editTodo}
                setTodos={setTodos}
                dispatchCurrentNav={dispatchCurrentNav}
          />
        </div>
        </>
        )}
    </main>    
    
  );
}

export default Main;