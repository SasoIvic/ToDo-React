import React, {useContext} from 'react'
import { Button, ButtonGroup, Tooltip, Position } from '@blueprintjs/core'
import styles from './index.module.scss'
import {TasksContext} from "../../../providers/TasksProvider";


const Toolbar = ({ group }) => {

  const {tasks, updateTask, deleteTask} = useContext(TasksContext);

  const onCompleteAll = () => { 
    alert("complete all tasks in group");

    tasks.forEach(task => {
      task.isCompleted = true;
      updateTask(task._id, task, group);
    });
   };

  const onDeleteAll = () => { 
    alert("delete all tasks in group");

    tasks.forEach(task => {
      deleteTask(task._id, group);
    });
  };

  return (

      <div className={styles.actions}>
        <ButtonGroup minimal>
          <Tooltip content="Complete All" position={Position.BOTTOM}>
            <Button icon="tick" onClick={onCompleteAll} />
          </Tooltip>
          <Tooltip content="Remove All" position={Position.BOTTOM}>
            <Button icon="trash" onClick={onDeleteAll} />
          </Tooltip>
        </ButtonGroup>
      </div>
  )
}

export default Toolbar
