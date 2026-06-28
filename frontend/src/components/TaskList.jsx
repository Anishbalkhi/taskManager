import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <div className="task-list__empty-icon">📋</div>
        <div className="task-list__empty-text">No tasks yet</div>
        <div className="task-list__empty-hint">Add your first task using the form above</div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
