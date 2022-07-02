import React, {useContext, useEffect} from 'react'
import styles from './index.module.scss'
import TodoItem from './TodoListItem'
import {TasksContext} from "../../../providers/TasksProvider";

const TodoList = ({group, createNewTask}) => {
  
  const {tasks, getTasks, getAllTasks} = useContext(TasksContext);

  useEffect(()=> {
    if(group){
      getTasks(group._id);
    }
    else{
      getAllTasks();
    }
    
  }, [group, createNewTask]);

  return (
    <div className={styles.content}>
      <h2>{group && group.name}</h2>

      <div className={styles.taskList}>
          
          {/* LOOP SKOZI TASKE */}
          {tasks && tasks.map(task => (
            <TodoItem key={task._id} task={task} group={group}></TodoItem>
          ))}

      </div>
    </div>
  )
}

export default TodoList
