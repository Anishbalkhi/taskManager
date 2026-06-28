import React from 'react';
import Button from './Button';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, !task.completed)}
        />
        <span className="task-item__checkmark">
          <span className="task-item__checkmark-icon">✓</span>
        </span>
      </label>

      <div className="task-item__content">
        <div className="task-item__title">{task.title}</div>
        {task.description && <div className="task-item__description">{task.description}</div>}
        <div className="task-item__meta">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="task-item__actions">
        <Button variant="ghost" onClick={() => onEdit(task)}>✏️</Button>
        <Button variant="ghost" onClick={() => onDelete(task._id)}>🗑️</Button>
      </div>
    </div>
  );
}

export default TaskItem;
