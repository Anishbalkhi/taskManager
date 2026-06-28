import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import Toast, { useToast } from './components/Toast';
import * as api from './api/taskApi';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const { toasts, addToast, removeToast } = useToast();

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter === 'completed') params.completed = 'true';
      if (filter === 'pending') params.completed = 'false';
      if (sort === 'oldest') params.sort = 'oldest';
      if (sort === 'title') params.sort = 'title';
      const res = await api.fetchTasks(params);
      setTasks(res.data);
    } catch {
      addToast('error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter, sort, addToast]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleAdd = async (data) => {
    try {
      await api.createTask(data);
      await loadTasks();
      addToast('success', 'Task added!');
    } catch {
      addToast('error', 'Failed to add task');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.updateTask(editingTask._id, data);
      await loadTasks();
      setEditingTask(null);
      addToast('success', 'Task updated!');
    } catch {
      addToast('error', 'Failed to update task');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await api.updateTask(id, { completed });
      setTasks(prev => prev.map(t => t._id === id ? { ...t, completed } : t));
    } catch {
      addToast('error', 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
      addToast('success', 'Task deleted');
    } catch {
      addToast('error', 'Failed to delete task');
    }
  };

  const done = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <Toast toasts={toasts} removeToast={removeToast} />

      <header className="app-header">
        <h1 className="app-header__title">Task Tracker</h1>
        <p className="app-header__subtitle">Organize your work, one task at a time</p>
        <div className="app-header__stats">
          <span className="stat-badge">{tasks.length} Total</span>
          <span className="stat-badge stat-badge--completed">{done} Done</span>
          <span className="stat-badge stat-badge--pending">{tasks.length - done} Pending</span>
        </div>
      </header>

      <TaskForm
        editingTask={editingTask}
        onSubmit={editingTask ? handleUpdate : handleAdd}
        onCancel={() => setEditingTask(null)}
      />

      <Filter filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
