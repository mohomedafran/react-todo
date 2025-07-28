import React, { useEffect, useState } from "react";
import {
  HiArrowRightStartOnRectangle,
  HiArrowUpTray,
  HiMiniPencil,
  HiMiniTrash,
  HiPlus,
} from "react-icons/hi2";
import { uid } from "uid";
import { onValue, ref, remove, set } from "firebase/database";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [todoId, setTodoId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate("/auth");
      }
    })
    onValue(ref(db, `todos/${auth.currentUser.uid}`), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data) {
        Object.values(data).forEach((todo) => {
          setTodos((prev) => [...prev, todo]);
        });
      }
    });
  }, []);

  const handleAddTodo = () => {
    const todoId = uid();
    set(ref(db, `todos/${auth.currentUser.uid}/${todoId}`), {
      todoId: todoId,
      todo: todo,
    });

    setTodo("");
  };

  const deleteTodo = (todoId) => {
    remove(ref(db, `todos/${auth.currentUser.uid}}/${todoId}`));
  };

  const editTodo = (todo) => {
    setEditMode(true);
    setTodo(todo.todo);
    setTodoId(todo.todoId);
  };

  const updateTodo = () => {
    set(ref(db, `todos/${auth.currentUser.uid}/${todoId}`), {
      todoId: todoId,
      todo: todo,
    });
    setEditMode(false);
    setTodo("");
  };

  const signout = () => {
    signOut(auth)
    .then(() => {
      navigate("/auth");
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  return (
    <div className="w-[100%] h-[100vh] bg-bg py-[5rem]">
      <div className="w-[85%] lg:w-[70%] max-w-[600px] h-[100%] mx-auto py-12 px-8 rounded-xl bg-white shadow-lg relative">
        <button className="absolute top-4 right-4 text-2xl text-primary hover:text-secondary transition duration-200 cursor-pointer" onClick={signout}>
            <HiArrowRightStartOnRectangle />
        </button>
        <h1 className="text-2xl font-bold text-center mb-8 text-primary">
          React Todo List
        </h1>
        <div className="flex flex-row items-center justify-between mb-12 gap-4 max-w-[100%]">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-grow border-2 border-secondary rounded-lg py-2 px-4 text-lg text-primary focus:shadow-md focus:outline-none focus:border-primary"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {!editMode ? (
            <button
              className="hover:bg-secondary/10 border-2 border-secondary text-secondary rounded-lg py-4 px-4 text-lg cursor-pointer"
              onClick={handleAddTodo}
            >
              <HiPlus />
            </button>
          ) : (
            <button
              className="hover:bg-secondary/10 border-2 border-secondary text-secondary rounded-lg py-4 px-4 text-lg cursor-pointer"
              onClick={updateTodo}
            >
              <HiArrowUpTray />
            </button>
          )}
        </div>

        {todos &&
          todos.map((todo) => (
            <div
              className="flex flex-row justify-between items-center w-full py-2 px-4 bg-text-input/50 rounded-lg gap-4 mb-4"
              key={todo.todoId}
            >
              <p className="text-lg text-primary font-medium flex-grow">
                {todo.todo}
              </p>
              <div className="flex flex-row items-center text-lg gap-2 text-primary">
                <button
                  className="cursor-pointer"
                  onClick={() => editTodo(todo)}
                >
                  <HiMiniPencil />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => deleteTodo(todo.todoId)}
                >
                  <HiMiniTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
