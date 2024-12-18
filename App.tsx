import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 relative">
      {/* Diamond Pattern Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGgzMHYzMEgwem0zMCAzMGgzMHYzMEgzMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
            <p className="text-blue-100">Stay organized and productive</p>
          </div>

          {/* Todo Input */}
          <TodoInput onAdd={addTodo} />

          {/* Todo List */}
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
            {todos.length === 0 && (
              <div className="text-center py-8 text-white/80">
                No tasks yet. Add one above!
              </div>
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="text-center text-blue-100">
              <p>
                {todos.filter(t => t.completed).length} of {todos.length} tasks completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;