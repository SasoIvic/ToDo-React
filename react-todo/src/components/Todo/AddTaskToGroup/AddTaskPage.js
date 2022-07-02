import React, {useState, useEffect, useContext} from 'react'
import { Button } from '@blueprintjs/core'
import AddTaskForm from './AddTaskForm'
import {TagsProvider} from "../../../providers/TagsProvider";
import {TasksContext} from "../../../providers/TasksProvider";


const AddTask = ({ group, toggleView, createNewTask, setCreateNewTask }) => {

  const {postTask} = useContext(TasksContext);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reminderOffset, setReminderOffset] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {

    console.log(selectedGroup);
    console.log(name);
    console.log(description);
    console.log(endDate);
    console.log(reminderOffset);
    console.log(selectedTags);

    if(selectedGroup && name && endDate){
      postTask({
        groupId: selectedGroup._id,
        title: name,
        description: description,
        endDate: endDate,
        reminderOffset: reminderOffset,
        isCompleted: false,
        tags: selectedTags
      }, group);
    }

  }, [createNewTask])

  return (
    <div>
      
      <TagsProvider>
        <AddTaskForm
          group={group}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          setName={setName} 
          setDescription={setDescription} 
          setEndDate={setEndDate} 
          setReminderOffset={setReminderOffset}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setCreateNewTask={setCreateNewTask}
          createNewTask={createNewTask}
        />
      </TagsProvider>

      <br />
      <Button
        large
        minimal
        data-test="button"
        className="panel-button"
        onClick={toggleView}
      >
        Add Group 🠮
      </Button>
    </div>
  )
}

AddTask.defaultProps = {
  hasTasks: false,
}

export default AddTask
