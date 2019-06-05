$(document).ready(function() {
  $.getJSON('/api/todos')
  .done(addTodos)
  .fail(handleError);
  
  $('#todoInput').keypress(function(event) {
    if (event.which === 13) {
      createTodo();
    }
  });
  
  $('.list').on('click', 'li', function(event) {
    updateTodo($(this));
  });
  
  $('.list').on('click', 'span', function(event) {
    event.stopPropagation();
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
  newTodo.data('completed', todo.completed);
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

function updateTodo(todo) {
  var clickedId = todo.data('id');
  var putUrl = '/api/todos/' + clickedId;
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: putUrl,
    data: updateData
  })
  .done(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  });
}














