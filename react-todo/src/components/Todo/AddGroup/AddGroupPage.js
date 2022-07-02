import React, {useState, useEffect, useContext} from 'react'
import AddGroupForm from './AddGroupForm'
import AddTagForm from './AddTagForm'
import styles from './index.module.scss'
import {GroupsContext} from "../../../providers/GroupsProvider";
import {TagsContext} from "../../../providers/TagsProvider";



const AddGroup = ({ toggleView }) => {

  const {groups, postGroup, updateGroup} = useContext(GroupsContext);
  const {tags, postTag, updateTag} = useContext(TagsContext);


  const [name, setName] = useState("");
  const [importance, setImportance] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");

  const [editingTag, setEditingTag] = useState(false);
  const [tagToUpdate, setTagToUpdate] = useState(null);

  const [createNewGroup, setCreateNewGroup] = useState(false);
  const [createNewTag, setCreateNewTag] = useState(false);

  const [editingGroup, setEditingGroup] = useState(false);
  const [groupToUpdate, setGroupToUpdate] = useState(null);



  useEffect(() => {

    console.log(tagName);
    console.log(tagColor);

    if(!editingTag && tagName && tagColor){
      postTag(tagName, tagColor);
    }

    if(editingTag){
      updateTag(tagToUpdate._id, null, tagColor);
    }

  }, [createNewTag])

  useEffect(() => {

    console.log(name);
    console.log(importance);
    console.log(selectedTags);

    if(!editingGroup && name && importance){
      postGroup(name, importance, selectedTags);
    }

    if(editingGroup && groupToUpdate){
      updateGroup(groupToUpdate._id, name, importance, selectedTags)
    }

  }, [createNewGroup])


  return (
    <>
    <div className={styles.formWrapper}>
      
        <AddGroupForm
          setName={setName} 
          setImportance={setImportance} 
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          createNewGroup={createNewGroup}
          setCreateNewGroup={setCreateNewGroup}
          
          editingGroup={editingGroup}
          setEditingGroup={setEditingGroup}
          groupToUpdate={groupToUpdate}
          setGroupToUpdate={setGroupToUpdate}
          groups={groups}
        />

    </div>
    <div className={styles.formWrapper}>
      
        <AddTagForm
          setName={setTagName}
          color={tagColor} 
          setColor={setTagColor} 
          createNewTag={createNewTag}
          setCreateNewTag={setCreateNewTag}

          editingTag={editingTag}
          setEditingTag={setEditingTag}
          tagToUpdate={tagToUpdate}
          setTagToUpdate={setTagToUpdate}
          tags={tags}
        />

    </div>
    </>
  )
}

export default AddGroup
