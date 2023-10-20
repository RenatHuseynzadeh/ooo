
let users = JSON.parse(localStorage.getItem('users'))
const currentUser = localStorage.getItem('currentUser')



let todos = users.find(user => user.name === currentUser).todos

function updateSite(){
    $('.todos').html('')

    for(let todo of todos){
        $('.todos').html($('.todos').html() + `<div class="todo">
        <div class="todo-content">
            <h2>${todo.title}</h2>
            <p>${todo.text}</p>
    
        </div>
        <div class="options">
            <button id='${todo.id}D' class="delete" style="background-color: rgb(230, 0, 0); width: 60px; height: 30px; border-radius: 5px; border: none; font-family: sans-serif;">Delete</button>
            <button id='${todo.id}E' class="edit" style="background-color: rgb(20, 100, 0); width: 60px; height: 30px; border-radius: 5px; border: none; font-family: sans-serif;">Edit</button>
        </div>
    </div>`)
    
    }
}

updateSite()

$('#addTodo').click(function(){
    $('.my-modal').attr('class', 'my-modal active')
})


$('#close').click(function(){
    $('.my-modal').removeClass('active')
})

$('#save-todo').click(function(){
    let newTodo = {
        id: Date.now(),
        title: $('input').val(),
        text: $('textarea').val()

    }

    todos.push(newTodo)

    users.find(user => user.name === currentUser).todos = todos

    localStorage.setItem('users', JSON.stringify(users))
    updateSite()
     $('.my-modal').removeClass('active')
    

})

$('.edit').click(function(){
    $('.my-modal').attr('class', 'my-modal active')
})

let id

$('.todos').click(function(e){
    if(e.target.innerHTML === 'Delete'){
    id = e.target.id
    todos = todos.filter(todo => todo.id + 'D' !== id)

    users.find(user => user.name === currentUser).todos = todos

    localStorage.setItem('users', JSON.stringify(users))
    updateSite()
    } else if(e.target.innerHTML === 'Edit'){
        id = e.target.id

        const currentTodo = todos.find(todo => todo.id + 'E' === id)

        $('#title').val(currentTodo.title)
        $('textarea').val(currentTodo.text)
    }

})



// $('.delete').click(function(e){
    // id = e.target.id
    // todos = todos.filter(user => user.id + 'D' !== id)
// 
    // users.find(user => user.name === currentUser).todos = todos
// 
    // localStorage.setItem('users', JSON.stringify(users))
    // updateSite()
    // 
// 
// })