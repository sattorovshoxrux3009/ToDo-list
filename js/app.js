const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')

const closeEl = document.getElementById('close')
const mounths=['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr']
let edititeamid;

// check
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

if(todos.length) showtodos();



// set todos to localStorage
function setTodos(){
    localStorage.setItem('list',JSON.stringify(todos))
}


// functiontime
function gettime(){
    const now = new Date();
    const date=now.getDate()<10 ? '0'+ now.getDate(): now.getDate();
    const month=(now.getMonth()+1)<10 ? '0'+(now.getMonth()+1) :(now.getMonth()+1);
    const year=now.getFullYear();

    const hour=now.getHours()<10 ? '0'+now.getHours() : now.getHours()
    const minute=now.getMinutes()<10 ? '0'+now.getMinutes() : now.getMinutes();
    const second=now.getSeconds()<10 ? '0'+now.getSeconds() : now.getSeconds();
    fullDay.textContent=`${date}-${mounths[month-1]} ${year}`
    hourEl.textContent=`${hour}`
    minuteEl.textContent=`${minute}`
    secondEl.textContent=`${second}`
    return `${hour}:${minute}  ${date}:${month}:${year}`;
    
}
setInterval(gettime,1000)

// show todos
function showtodos(){
    const todos=JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML=''
    todos.forEach((item,i)=>{
        listGroupTodo.innerHTML+= `
         <li ondblclick="setcomplated(${i})" class="list-group-item d-flex justify-content-between ${item.complated==true ? 'complated' : ''}">
        ${item.text}
        <div class="todo-icons">
          <span class="opacity-50 me-2">${item.time}</span>
          <img onclick="edittodo(${i})" src="./img/edit.svg" alt="edit icon" width="25" height="25">
          <img onclick="deletetodo(${i})"  src="./img/delete.svg" alt="delete icon" width="25" height="25">
        </div>
      </li>`
    })
}

// showMessage
function showMessage(where,message){
    document.getElementById(`${where}`).textContent=`${message}`;
    setTimeout(()=>{
        document.getElementById(`${where}`).textContent='';
    },2500)
}

// get todos
formCreate.addEventListener('submit', (e)=>{
    e.preventDefault();
    const todoText=formCreate['input-create'].value.trim();
    if(todoText){
        todos.push({text:todoText, time: gettime(), complated: false})
        setTodos();
        showtodos();
        formCreate.reset();
    }
    else{
        showMessage('message-create','Please, enter some text...')
    }
})

// delete todo
function deletetodo(id){
    const deletedtodos= todos.filter((item,i)=>{
        return i!=id;
    })
    console.log(deletedtodos)
    todos=deletedtodos;
    setTodos();
    showtodos();
}
function setcomplated(id){
    const complatetodo=todos.map((item,i)=>{
        if(id==i){
            return {...item,complated: item.complated==true ? false :true}
        }
        else{
            return {...item}
        }
    })
    todos=complatetodo;
    setTodos();
    showtodos();
}
// edit form
formEdit.addEventListener('submit',(e)=>{
    e.preventDefault();
    const todoText=formEdit['input-edit'].value.trim();
    if(todoText){
        todos.splice(edititeamid,1,{text:todoText, time: gettime(), complated: false})
        setTodos();
        showtodos();
        formEdit.reset();
        close()
    }
    else{
        showMessage('message-edit','Please, enter some text...')
    }
})

// edit todo
function edittodo(id){
    open()
    edititeamid=id
    console.log(id)

}
function open(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')

}
function close(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
overlay.addEventListener('click',close)
closeEl.addEventListener('click',close)
document.addEventListener('keydown',(e)=>{
    if(e.keyCode==27){
        close();
    }
})