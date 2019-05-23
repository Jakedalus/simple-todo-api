$(document).ready(function() {
  $.getJSON('/api/todos')
  .done(addTodos)
  .fail(handleError);
});


function addTodos(todos) {
  todos.forEach(function(todo) {
    var newTodo = $('<li class="task">' + todo.name + '</li>');
    $('.list').append(newTodo);
  });
}


function handleError(err) {
  console.log(err);
}