import React, {useState, useContext, useEffect} from 'react'
import styles from './TodoListItem.module.scss'
import Moment from 'react-moment'
import InputField from '../../../components/InputGroup/InputField'
import Datepicker from '../../../components/InputGroup/Datepicker'
import { Button, ButtonGroup, Tooltip, Position } from '@blueprintjs/core'


import {TasksContext} from "../../../providers/TasksProvider";
import {TagsContext} from "../../../providers/TagsProvider";

Moment.globalFormat = 'DD. MM. YYYY';

const TodoItem = ({ task, group }) => {

  const {updateTask, deleteTask} = useContext(TasksContext);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [endDate, setEndDate] = useState(task.endDate.split('T')[0]);

  const handleDone = () => {
    task.isCompleted = true;
    updateTask(task._id, task, group);
  }
  const handleUnDone = () => {
    task.isCompleted = false;
    updateTask(task._id, task, group);
  }

  const handleDelete = () => {
    deleteTask(task._id, group);
  }

  const handleEdit = () => {
    alert("edit task: " + task._id)
    setEditing(true);

  }
  const _updateTask = () => {

    task.title = title;
    task.description = description;
    task.endDate = endDate;

    console.log(task);

    updateTask(task._id, task, group);


    setEditing(false);
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  const [diffDays, setDiffDays] = useState(0);

  useEffect(() => {
    var today = formatDate(Date().toLocaleString());
    const diffTime = Math.abs(Date.parse(endDate)-Date.parse(today));
    setDiffDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 
  }, []);
  
  
  return (
    <div className={`${styles.root} ${task.done ? styles.done : ''}, ${diffDays <= task.reminderOffset ? styles.alertReminder : ''}`}>
      
      {!editing &&
      <>
      <div className={styles.tags}>
      {task && task.tags.map(tag => (
        <Tooltip content={tag.name} position={Position.BOTTOM}>
          <div style={{width: '10px', height: '10px', borderRadius: '10px', backgroundColor: tag.color, opacity: 0.7, marginRight: '2px'}} />
        </Tooltip>
      ))}
      </div>

      <div className={styles.content}>
        <div className={styles.title + task.isCompleted ? styles.completed : ""}>{task.title}</div>
        <div className={styles.subTitle}>{task.description}</div>
      </div>

      </>
      }

      

      {editing &&

      <div className={styles.content}>
        <InputField label={'New title'} setValue={setTitle} defaultValue={title} isDark={true}/>
        <InputField label={'New description'} setValue={setDescription} defaultValue={description} isDark={true}/>
        <Datepicker label={'New end date'} setValue={setEndDate} defaultValue={endDate} isDark={true}/>

      </div>

      }

      <div className={styles.details}>

        {!editing &&
          <span className={styles.date}>
            {task.endDate && 
              <Moment>
                  {task.endDate}
              </Moment>
            }
          </span>
        }

        {!editing &&
          <div className={styles.actions}>
            <ButtonGroup minimal>
              {!task.isCompleted &&
                <Button icon="tick" minimal onClick={handleDone} />
              }
              {task.isCompleted && 
              <Button icon="undo" minimal onClick={handleUnDone} />
              }
              <Button icon="trash" minimal onClick={handleDelete} />
              <Button icon="edit" minimal onClick={handleEdit} />
            </ButtonGroup>
          </div>
        }

        {editing &&
          <div className={styles.button}>
            <Button 
              small
              minimal
              className="panel-button"
              color="red"
              onClick={()=>{_updateTask();}}
            >
              DONE
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default TodoItem
