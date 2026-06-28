import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import Button from './Button';

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim() });
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header">
        <span className="task-form__header-icon">{editingTask ? '✏️' : '✨'}</span>
        <span className="task-form__header-text">{editingTask ? 'Edit Task' : 'Add New Task'}</span>
      </div>

      <div className="task-form__fields">
        <InputField
          id="task-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          error={error}
        />
        <InputField
          id="task-description"
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          multiline
          rows={3}
        />
      </div>

      <div className="task-form__actions">
        <Button type="submit" variant="primary" className="btn--full">
          {editingTask ? '💾 Save Changes' : '➕ Add Task'}
        </Button>
        {editingTask && (
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
