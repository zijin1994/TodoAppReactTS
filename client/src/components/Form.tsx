import { useState } from 'react';
import { NewTodo, Todo, NavAction } from '../types';
import { createTodo, updateTodo } from '../services';
//custom hook for input
const useField = (initialVal: string) => {
  const [value, setValue] = useState(initialVal);
  
  const onChange = (
    event: React.FormEvent<
      | HTMLInputElement 
      | HTMLSelectElement 
      | HTMLTextAreaElement
    >
  ) => {
    setValue(event.currentTarget.value);
  }
  
  return {
    value,
    onChange,
  }
}

interface FromPropsType {
  onComplete: (id: number, isCompleted: boolean) => Promise<void>;
  onToggleModal: () => void;
  editTodo: Todo | undefined;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  dispatchCurrentNav: React.Dispatch<NavAction>
}

const Form = ({ onToggleModal, onComplete, editTodo, setTodos, dispatchCurrentNav }: FromPropsType) => {
  const title = useField(editTodo ? editTodo.title : "");
  const description = useField(editTodo ? editTodo.description : "");
  const day = useField(editTodo ? editTodo.day : "DD");
  const month = useField(editTodo ? editTodo.month : "MM");
  const year = useField(editTodo ? editTodo.year : "YYYY");
  
  const handleSubmit = async(event: React.SyntheticEvent) => {
    event.preventDefault();
    if (title.value.length <= 2) {
      alert("Title is too short!");
      return;
    }
    const data: NewTodo = {
      title: title.value,
      description: description.value,
      day: day.value,
      month: month.value,
      year: year.value
    }
    console.log(data);
    if (editTodo) {
      const todoData = data as Todo;
      todoData.id = editTodo.id;
      const updatedTodo = await updateTodo(todoData);
      setTodos((prevTodos) => prevTodos.map(todo => {
        if (todo.id === todoData.id) {
          return {...updatedTodo};
        } else {
          return todo;
        }
      }));
    } else {
      const newTodo = await createTodo(data);
      console.log(newTodo);
      setTodos((prevState) => prevState.concat(newTodo));
      dispatchCurrentNav({
        type: "All Todos"
      });
    }
    onToggleModal();
  }
  
  
  return (
    <form action="" method="post">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Item 1" {...title} required/>
          </li>
          <li>
            <label htmlFor="due">Due Date</label>
            <div className="date">
              <select id="due_day" name="due_day" {...day}>
                <option value="DD">Day</option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>  /
              <select id="due_month" name="due_month" {...month}>
                <option value="MM">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select> /
              <select id="due_year" name="due_year" {...year}>
                <option value="YYYY">Year</option>
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
            </div>
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <textarea 
              cols={50} 
              name="description" 
              id="description" 
              rows={7} 
              placeholder="Description" 
              {...description}
            ></textarea>
          </li>
          <li>
            <input type="submit" value="Save" onClick={handleSubmit}/>
            <button name="complete" onClick={(e) => {
              e.preventDefault();
              if (editTodo) {
                if (!editTodo.completed) onComplete(editTodo.id, editTodo.completed);
              } else {
                alert("Create todo first!");
                return;
              }
              onToggleModal();
            }}>Mark As Complete</button>
          </li>
        </ul>
      </fieldset>
    </form>
  )
}

export default Form;