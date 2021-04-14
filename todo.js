//Tüm elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");//ul
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondcardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
//Forma Submit 
eventListeners();
function eventListeners(){//Tüm eventlistenerlar burada eklenecek
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAlTodosToUI);
    secondcardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
 //ilk olarak arayüzden todoları temizleme
        //todoList.innerHTML="";//boş kalacağı için hepsi silinecek. Yavaş yöntemdir.
       //todoList.removeChild(todoList.firstElementChild);//ilk elemanı verecek
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
   

}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1){
            //bulamadı
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });

}
function deleteTodo(e){
    //console.log(e.target);//target nereye tıklandığını verir.
    if(e.target.className==="fa fa-remove"){//arayüzden silme
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);//silinecek todoyu göndermek için texti aldık.
        console.log("silme işlemi..");
        //iki üstü li olduğu için 
        showAlert("success","todo başarı ile silindi..");
    }
}
function deleteTodoFromStorage(deletetodo){//local storageden silme
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);//arraydan değer silinecek..
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAlTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo=todoInput.value.trim();
    if(newTodo===""){
        /*<div class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> Change a few things up and try submitting again.
                      </div>
                    <hr>*/
        showAlert("danger","lütfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","todo başarı ile eklendi....");

    }
    e.preventDefault();
}
function getTodosFromStorage(){//todoları array yaparak local storage'a eklmek için fonksiyon olulşturduk.
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos"));   
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));//todoları local storage'a ekledim


}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    //belirli bir sn sonra kaybolması için
    //setTimeOut
    setTimeout(function(){
        alert.remove();
    },1000);   //1000 1 sn
}
function addTodoToUI(newTodo){//String değeri direk arayüze ekleyecek
    //listItem oluşturma
    const listItem=document.createElement("li");
    //link elementi oluşturma
    const link=document.createElement("a");
    link.href=("#");
    link.className="delete-item";
    link.innerHTML=" <i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);
    // // todoListe list item ekleme
    todoList.appendChild(listItem);
    todoInput.value="";
    //console.log(listItem);
}