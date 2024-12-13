import { useCallback } from 'react';
import Item from './Item';
import { Todo } from '../types';
import { sortTodos } from '../utils';
import { deleteTodo } from '../services';

interface ListPropsType {
  todos: Todo[];
  onComplete: (id: number, isCompleted: boolean) => Promise<void>;
  onToggleModal: () => void;
  setEditId: (id: number | null) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const List = ( { todos, onComplete, onToggleModal, setEditId, setTodos }: ListPropsType) => {
  
  //function reference stays the same between renders.
  const handleDelete = useCallback(async(id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos: Todo[]) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos]);
  
  return (
    <>
      {sortTodos(todos).map(
        (todo) =>(
          <Item 
            key={todo.id} 
            onDelete={handleDelete} 
            onComplete={onComplete} 
            onToggleModal={onToggleModal}
            setEditId={setEditId}
            todo={todo}/
          >
        )
      )}
    </>
  );
}


export default List;