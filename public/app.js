$(document).ready(function() {
  $.getJSON('/api/todos')
  .done(addTodos)
  .fail(handleError);
  
  $('#todoInput').keypress(function(event) {
    if (event.which === 13) {
      createTodo();
    }
  });
});


function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}


function handleError(err) {
  console.log(err);
}

function createTodo() {
  var userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput})
  .done(function(newTodo) {
    addTodo(newTodo);
    $('#todoInput').val('');
  })
  .fail(handleError);  
  
}

function addTodo(todo) {
  var newTodo = $('<li class="task">' + todo.name + '</li>');
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}