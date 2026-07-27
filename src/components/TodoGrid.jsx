import React, { useEffect, useState } from 'react';
import { Plus, X, Check, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo, removeTodo, updateTodo} from "../features/todo/todoSlice"

export default function TodoGrid() {


  const dispatch = useDispatch()
  const todosData = useSelector((state)=> state.todos)

  const [todos, setTodos] = useState([])

  useEffect(()=>{
      setTodos(todosData)
  }, [todosData])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null); 
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const openCreateModal = () => {
    setEditingTodo(null);
    setTitle('');
    setIsCompleted(false);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setIsCompleted(todo.isCompleted);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setTitle('');
    setIsCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo) {
      dispatch(updateTodo({id: editingTodo.id, title, isCompleted}))
    } else {
      dispatch(addTodo({title, isCompleted}))
    }
    
    closeModal();
  };

  const handleDelete = (id) => {
    console.log();
    dispatch(removeTodo(id))
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };


  return (
    <div className="min-h-screen bg-stone-100 p-6 text-stone-800 font-sans">
      <div className="mx-auto max-w-5xl space-y-8">
        
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-800">My Tasks</h1>
              </div>
          
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700/80 hover:bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add Todo
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 p-12 text-center bg-stone-50/50">
            <p className="text-sm font-medium text-stone-500">No tasks found</p>
            <p className="text-xs text-stone-400 mt-1">Click "Add Todo" above to create your first task.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/70 bg-stone-50 p-5 shadow-xs transition-all hover:shadow-md hover:border-stone-300"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className="mt-0.5 text-stone-400 hover:text-emerald-600 transition-colors"
                  >
                    {todo.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <p
                    className={`text-sm font-medium leading-relaxed ${
                      todo.isCompleted ? 'text-stone-400 line-through' : 'text-stone-800'
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-stone-200/50 pt-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                      todo.isCompleted
                        ? 'bg-emerald-100/60 text-emerald-800'
                        : 'bg-amber-100/60 text-amber-800'
                    }`}
                  >
                    {todo.isCompleted ? 'Completed' : 'In Progress'}
                  </span>

                  <div className="flex items-center gap-1 opacity-90 transition-opacity">
                    <button
                      onClick={() => openEditModal(todo)}
                      className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition-colors"
                      title="Edit task"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-xs transition-opacity"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md scale-100 rounded-2xl bg-stone-50 p-6 shadow-xl border border-stone-200/60 transition-all">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
              <h2 className="text-xl font-semibold tracking-tight text-stone-800">
                {editingTodo ? 'Edit Todo' : 'Add Todo'}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200/60 hover:text-stone-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="todo-title"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-500"
                >
                  Task Title
                </label>
                <input
                  id="todo-title"
                  type="text"
                  required
                  placeholder="Task title ..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-stone-100/70 p-3.5 border border-stone-200/50">
                <span className="text-sm font-medium text-stone-700">
                  Mark as completed
                </span>
                
                <label className="relative flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-6 rounded-md border border-stone-300 bg-white transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 flex items-center justify-center">
                    <Check className={`h-4 w-4 text-white transition-transform ${isCompleted ? 'scale-100' : 'scale-0'}`} />
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2 text-sm font-medium text-white shadow-xs transition-all active:scale-95"
                >
                  {editingTodo ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}