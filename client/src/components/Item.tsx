import { memo } from 'react';
import { formatDate } from '../utils'
import { Todo } from '../types'
interface ItemPropsType {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onComplete: (id: number, isCompleted: boolean) => Promise<void>;
  onToggleModal: () => void;
  setEditId: (id: number | null) => void;
}

//memo helps prevent unwanted re-render 
//wrap todo item in obj
const Item = memo(({ onDelete, onComplete, onToggleModal, setEditId, todo }: ItemPropsType) => {
  const { id, title, completed, ...dueDate } = todo;
  console.log(id, completed);
  const due_date = formatDate(dueDate);
  
  
  return (
  <>
    <tr  data-id={id} >
      <td className="list_item" onClick={() => onComplete(id, completed)}>
        <input type="checkbox" name={`item_${id}`} id={`item_${id}`} checked={completed} onChange={() => {}}/>
     
        <span className="check"></span>
        <label htmlFor={`item_${id}`} 
          onClick={
            (e)=> {
              e.preventDefault();
              e.stopPropagation();
              setEditId(id);
              onToggleModal();
            }
          }
        >
          
          {`${title} - ${due_date}`}
          
        </label>
      </td>
      <td className="delete" onClick={() => onDelete(id)}><img src="images/trash.png" alt="Delete"/></td>
    </tr>    
  </>  
  )
})



export default Item;