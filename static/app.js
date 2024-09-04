//Yedam Lee
//JS file which has dynamic actions that allows the users to use the to-do list.
//Front-end codes

//method that edits the to-do list
async function editList(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("how would you like to edit?");

  const response = await fetch(`/memos/${id}`, {
    //using PUT method to update the memo
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readList();
}

//method that deletes the to-do list
async function delList(event) {
  const id = event.target.dataset.id;

  const response = await fetch(`/memos/${id}`, {
    //using DELETE method to delete the memo
    //we don't need the body since we are not requesting anything.
    //all we need is to delete the memo with specific id
    method: "DELETE",
  });
  readList();
}

//method that displays the to-do list
function displayList(memo) {
  //creaing a new bullet list
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");

  //adding the button in html file
  const editBtn = document.createElement("button");

  li.innerText = `${memo.content}`;

  editBtn.innerText = "edit";
  editBtn.addEventListener("click", editList);

  //getting the id of the memo
  editBtn.dataset.id = memo.id;

  //adding the deleting button in html file
  const delBtn = document.createElement("button");
  delBtn.innerText = "done!";
  delBtn.addEventListener("click", delList);
  delBtn.dataset.id = memo.id;

  //adding it into the html
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

//method that reads the to-do list by getting it from the server
async function readList() {
  //await function waits for the promise before running other lines of code
  const response = await fetch("/memos");

  //changing it into json format
  const jsonRes = await response.json();

  //resetting the list in the html file to remove any duplicates
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";

  //running displayMemo() function on each of the item in jsonRes array
  jsonRes.forEach(displayList);
}

//method that creates the to-do list with the collected input value
async function createList(value) {
  //using the fetch method to get API's response through the URL
  const response = await fetch("/memos", {
    method: "POST",

    //header is just a must
    headers: {
      "Content-Type": "application/json",
    },

    //what we are going to send, making it into the String type
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });

  //fetching the memo after creating the memo
  readList();
}

//method that collects the input value when the submit button is clicked
function handleSubmit(event) {
  //preventing the value from disappearing after submit action
  event.preventDefault();

  const input = document.querySelector("#memo-input");
  createList(input.value);

  //after collecting the input value, we reset the input bar to ""
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

//running readMemo() function in the beginning to bring the items in the server
readList();
