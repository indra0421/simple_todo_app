import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import note_logo from './note_logo.jpg';

const To_do_list = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [iseditItem, setIsEditItem] = useState(null);

  /*adde for hacktoberfest to count the open and closed tasks*/
  const [openTask, setOpenTask] = useState(0);
  const [closeTask, setCloseTask] = useState(0);

  // Automatically recalculate and filter list of  open/close counts whenever items change
  useEffect(() => {
    const openCount = items.filter(item => !item.checked).length;
    const closedCount = items.filter(item => item.checked).length;
    setOpenTask(openCount);
    setCloseTask(closedCount);
  }, [items]);

  const addItem = () => {
    if (!inputData) {
      alert("Please enter a task");
      return;
    }

    if (!toggleSubmit) {
      // Editing existing item
      setItems(items.map((el) =>
        el.id === iseditItem ? { ...el, name: inputData } : el
      ));
      setToggleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    } else {
      // Added checked - false by default 
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputData,
        checked: false,
      };
      setItems([...items, newItem]);
      setInputData('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((el) => el.id !== id));
  };

  const deleteAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    const foundItem = items.find((el) => el.id === id);
    setToggleSubmit(false);
    setInputData(foundItem.name);
    setIsEditItem(id);
  };

  //added by js to toggle the checkbox status based on each item
  const toggleCheck = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className='main_div'>
      <div className='image_div'>
        <img src={note_logo} alt='error' />
      </div>

      <div className='paragraph' style={{ display: 'flex', alignItems: "center", flexDirection: "column" }}>
        <p>Add Your List Here 🗒️</p>
        <div className='task_status' style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
            {/* added by js to keep the count of open and closed task count */}
          <p>Open: <strong>{openTask}</strong></p>
          <p>Closed: <strong>{closeTask}</strong></p>
        </div>
      </div>

      <div className='add_list_div'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWBNbdIZdkOzwe76Y6LQjdvow3Dxcj2aYP728z0zrT-b_FYaKIMsGpCIMNTPmJI-bi8o&usqp=CAU' alt='loading...' />
        <input
          onKeyPress={(e) => e.key === 'Enter' ? addItem() : null}
          placeholder='Add Items here...'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {toggleSubmit ? (
          <Tooltip title='Add'>
            <button className='add_icon' onClick={addItem}><AddIcon /></button>
          </Tooltip>
        ) : (
          <Tooltip title='Update'>
            <button className='add_icon' onClick={addItem}><SaveIcon /></button>
          </Tooltip>
        )}
      </div>

      <div className='show_items'>
        {items.map((element) => (
          <div className='each_item' key={element.id}>
            <div className='items'>
              <Tooltip title={element.checked ? 'Mark as undone' : 'Mark as done'}>
                <input
                  type="checkbox"
                  className='chkbox'
                  checked={element.checked}
                  onChange={() => toggleCheck(element.id)}
                />
              </Tooltip>

{/* line through added for each completead task */}
              <h2 style={{ textDecoration: element.checked ? 'line-through' : 'none' }}>
                {element.name}
              </h2>

              <div className='edit_del_div'>
                <Tooltip title='Edit'>
                  <button className='edit_icon' onClick={() => editItem(element.id)}><EditIcon /></button>
                </Tooltip>
                <Tooltip title='Delete'>
                  <button className='delete_icon' onClick={() => deleteItem(element.id)}><DeleteIcon /></button>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='check_list'>
        <button className='remove_all_button' onClick={deleteAll}>Delete All</button>
      </div>
    </div>
  );
};

export default To_do_list;
