$(document).ready(function() {
  $.getJSON('/api/todos')
  .done(addTodos)
  .fail(handleError);
  
  $('#todoInput').keypress(function(event) {
    if (event.which === 13) {
      createTodo();
    }
  });
  
  $('.list').on('click', 'span', function(event) {
    removeTodo($(this).parent());
  })
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
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span>' + '</li>');
  newTodo.data('id', todo._id);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .done(function(data) {
    todo.remove();
  })
  .fail(handleError);
}


