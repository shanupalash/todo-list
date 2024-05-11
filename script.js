function addItem(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemDesc = document.getElementById('itemDesc').value;
    const newItem = { name: itemName, description: itemDesc };
  
    axios.post('https://crudcrud.com/api/befc799866114395907ea4128f169690/todo', newItem)
      .then(response => {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.textContent = `${itemName} - ${itemDesc}`;
  
        const checkBtn = document.createElement('button');
        checkBtn.textContent = 'Y';
        checkBtn.onclick = () => moveItemToDone(response.data._id, itemName, itemDesc);
        li.appendChild(checkBtn);
  
        const crossBtn = document.createElement('button');
        crossBtn.textContent = 'N';
        crossBtn.onclick = () => removeItem(response.data._id);
        li.appendChild(crossBtn);
  
        todoList.appendChild(li);
  
        document.getElementById('itemName').value = '';
        document.getElementById('itemDesc').value = '';
      })
      .catch(error => console.error('Error adding item:', error));
  }
  
  function moveItemToDone(itemId, itemName, itemDesc) {
    console.log("Moving item to done:", itemId, itemName, itemDesc);
    const listItem = document.querySelector(`li[data-id="${itemId}"]`);
    console.log("List item to move:", listItem);
    listItem.parentNode.removeChild(listItem);
  
    const doneList = document.getElementById('doneList');
    const li = document.createElement('li');
    li.textContent = `${itemName} - ${itemDesc}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeItem(itemId);
    li.appendChild(removeBtn);
    doneList.appendChild(li);
  }
  
  function removeItem(itemId) {
    axios.delete(`https://crudcrud.com/api/befc799866114395907ea4128f169690/todo/${itemId}`)
      .then(response => {
        const listItem = document.querySelector(`li[data-id="${itemId}"]`);
        listItem.parentNode.removeChild(listItem);
      })
      .catch(error => console.error('Error removing item:', error));
  }
  
  axios.get('https://crudcrud.com/api/befc799866114395907ea4128f169690/todo')
    .then(response => {
      const todoList = document.getElementById('todoList');
      response.data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.description}`;
        li.setAttribute('data-id', item._id); // Add data-id attribute
  
        const checkBtn = document.createElement('button');
        checkBtn.textContent = 'Y';
        checkBtn.onclick = () => moveItemToDone(item._id, item.name, item.description);
        li.appendChild(checkBtn);
  
        const crossBtn = document.createElement('button');
        crossBtn.textContent = 'X';
        crossBtn.onclick = () => removeItem(item._id);
        li.appendChild(crossBtn);
  
        todoList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching to-do items:', error));
  
  document.getElementById('addItemForm').addEventListener('submit', addItem);
  


