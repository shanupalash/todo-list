function addItem(event) {
  event.preventDefault();
  const itemName = document.getElementById('itemName').value;
  const itemDesc = document.getElementById('itemDesc').value;
  const newItem = { name: itemName, description: itemDesc };
  
  axios.post(' https://crudcrud.com/api/f4097de6bf9a415fb31b108f3465e746/todo', newItem)
    .then(response => {
      const todoList = document.getElementById('todoList');
      const li = document.createElement('li');
      li.textContent = `${itemName} - ${itemDesc}`;
      
      const checkBtn = document.createElement('button');
      checkBtn.textContent = 'Check';
      checkBtn.onclick = () => moveItemToDone(response.data._id, itemName, itemDesc);
      li.appendChild(checkBtn);

      const crossBtn = document.createElement('button');
      crossBtn.textContent = 'Cross';
      crossBtn.onclick = () => removeItem(response.data._id);
      li.appendChild(crossBtn);
      
      todoList.appendChild(li);

      document.getElementById('itemName').value = '';
      document.getElementById('itemDesc').value = '';
    })
    .catch(error => console.error('Error adding item:', error));
}

function moveItemToDone(itemId, itemName, itemDesc) {
  const listItem = document.querySelector(`li:contains("${itemName} - ${itemDesc}")`);
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
  axios.delete(` https://crudcrud.com/api/f4097de6bf9a415fb31b108f3465e746/${itemId}`)
    .then(response => {
      const listItem = document.querySelector(`li:contains("${response.data.name} - ${response.data.description}")`);
      listItem.parentNode.removeChild(listItem);
    })
    .catch(error => console.error('Error removing item:', error));
}

axios.get('https://crudcrud.com/api/f4097de6bf9a415fb31b108f3465e746')
  .then(response => {
    const todoList = document.getElementById('todoList');
    response.data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.description}`;
      
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

// Event listener for form submission
document.getElementById('addItemForm').addEventListener('submit', addItem);


