const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");
let pending = [];
let finish = [];

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadList();
}
function finishPending(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  const text = li.querySelector("span").innerText;
  const delPendingId = parseInt(li.id);
  paintFinish(text);
  delPending(delPendingId);
  pendingList.removeChild(li);
}
function backToPending(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  const text = li.querySelector("span").innerText;
  finishedList.removeChild(li);
  delFinish(li.id);
  paintPending(text);
}
function delPendingEvent(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  pendingList.removeChild(li);
  delPending(li.id);
}
function delFinishEvent(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  delFinish(li.id);
  finishedList.removeChild(li);
}
function saveList() {
  localStorage.setItem("PENDING", JSON.stringify(pending));
  localStorage.setItem("FINISHED", JSON.stringify(finish));
}
function paintPending(text) {
  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  const btnSpan = document.createElement("span");
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const id = Math.floor(1000000 * Math.random());
  delBtn.addEventListener("click", delPendingEvent);
  checkBtn.addEventListener("click", finishPending);
  delBtn.innerText = "❌";
  checkBtn.innerText = "✔";
  textSpan.innerText = text;
  delBtn.className = "pendingList__delBtn";
  checkBtn.className = "pendingList__checkBtn";
  textSpan.className = "pendingList__text";
  li.className = "pendingList__li";
  btnSpan.appendChild(checkBtn);
  btnSpan.appendChild(delBtn);
  li.appendChild(textSpan);
  li.appendChild(btnSpan);
  li.id = id;
  pendingList.appendChild(li);
  const toDoObj = {
    text,
    id,
  };
  pending.push(toDoObj);
  saveList();
}
function paintFinish(text) {
  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  const btnSpan = document.createElement("span");
  const backBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const id = Math.floor(1000000 * Math.random());
  textSpan.innerText = text;
  backBtn.innerText = "<";
  delBtn.innerText = "❌";
  delBtn.className = "finishedList__delBtn";
  backBtn.className = "finishedList__backBtn";
  textSpan.className = "finishedList__text";
  li.className = "finishedList__li";
  btnSpan.appendChild(backBtn);
  btnSpan.appendChild(delBtn);
  delBtn.addEventListener("click", delFinishEvent);
  backBtn.addEventListener("click", backToPending);
  li.appendChild(textSpan);
  li.appendChild(btnSpan);
  li.id = id;
  finishedList.appendChild(li);
  const finishObj = {
    text,
    id,
  };
  finish.push(finishObj);
  saveList();
}
function delPending(id) {
  const cleanPending = pending.filter(function (toDo) {
    return toDo.id !== parseInt(id);
  });
  pending = cleanPending;
  saveList();
}
function delFinish(id) {
  const cleanFinish = finish.filter(function (fin) {
    return fin.id !== parseInt(id);
  });
  finish = cleanFinish;
  saveList();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}
function loadList() {
  const loadPending = localStorage.getItem("PENDING");
  const loadFinish = localStorage.getItem("FINISHED");
  if (loadPending !== null) {
    const parsePending = JSON.parse(loadPending);
    parsePending.forEach(function (toDo) {
      paintPending(toDo.text);
    });
  }

  if (loadFinish !== null) {
    const parseFinish = JSON.parse(loadFinish);
    parseFinish.forEach(function (fin) {
      paintFinish(fin.text);
    });
  }
}

init();
