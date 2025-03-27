import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

// import './App.css';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      // Check for null or empty string
      let todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, []);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(params));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });
    settodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    // let index = todos.findIndex((item) => {
    //   return item.id === id;
    // });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    settodo(e.target.value);
  };

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    const updatedTodos = [...todos, newTodo];
    settodos(updatedTodos);

    settodo('');
    saveToLS(updatedTodos);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container text-white bg-zinc-800  md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          i-Task Manage your todos at one place
        </h1>
        <div className="addTodo text-lg font-bold mt-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add To-Do</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full text-black px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-slate-950 hover:bg-slate-900 text-white disabled:bg-zinc-700 rounded-lg px-4 py-[1.5px] font-bold"
          >
            SAVE
          </button>
        </div>
        <input
          type="checkbox"
          className="my-4"
          onChange={toggleFinished}
          defaultChecked={showFinished}
          />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        
        <div className="h-[1px] w-[90%] mx-auto my-2 bg-white"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos text-white  bg-slate-950">
          {todos.length === 0 && <div>No todos to Display</div>}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo w-auto flex justify-between m-2  "
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckBox}
                      type="checkbox"
                      defaultChecked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div
                      className={`${
                        item.isCompleted ? 'line-through' : 'text-red-300'
                      } break-all`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg mx-2 px-4 py-[1.5px] font-bold"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg mx-2 px-4 py-[1.5px] font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
