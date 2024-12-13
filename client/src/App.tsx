import { useState, useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
// import FunctionProvider from './components/FunctionProvider'

import { getTodos } from './services'
import { filterTodosByNav } from './utils'
import { Todo, NavbarState, NavAction } from './types'
import './App.css'

const navReducer = (_state: NavbarState, action: NavAction): NavbarState => {
  
  switch (action.type) {
    case "All Todos":
      return { nav: "All Todos", completed: false }
    case "Completed":
      return { nav: "Completed", completed: true }
    default:
      return { nav: action.group, completed: action.completed }
  }
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  //could be done with just useState, wanted to learn how to use useReducer.
  const [currentNav, dispatchCurrentNav] = useReducer(navReducer, { nav:"All Todos", completed: false });
  // const [currentNav, setCurrentNav] = useState({
  //   nav: "All Todos",
  //   completed: false,
  // });
  
  useEffect(() => {
    const getAllTodos = async() => {
      const allTodos = await getTodos();
     
      console.log(allTodos);
      setTodos(allTodos);
    }
    
    getAllTodos();
  }, []);
  
  const currentTodos = filterTodosByNav(currentNav.nav, todos, currentNav.completed);
  return (
  <div id="main_template">
  <input type="checkbox" id="sidebar_toggle"/>
  <Sidebar todos={todos} currentNav={currentNav} dispatchCurrentNav={dispatchCurrentNav}/>
  <div id="items" >
    <Header currentNav={currentNav} count={currentTodos.length} />
    {/* <FunctionProvider contextValue={{createTodo, updateTodo, deleteTodo, setTodos, dispatchCurrentNav}}> */}
    <Main todos={currentTodos} setTodos={setTodos} dispatchCurrentNav={dispatchCurrentNav}/>
    {/* </FunctionProvider> */}
  </div>
  </div>
  )
}

export default App
