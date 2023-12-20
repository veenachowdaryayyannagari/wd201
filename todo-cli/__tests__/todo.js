const todoList = require("../todo");
let todos;

beforeEach(() => {
  todos = todoList();
});

describe("TodoList Test Suite", () => {
  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: "Test todo 2",
      completed: false,
      dueDate: "2023-12-20",
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: "2023-12-20",
    });

    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const yesterday = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() - 1)),
    );

    const overDueTodoItemsCount = todos.overdue().length;
    const overdueAdd = {
      title: "Complete my assignment",
      dueDate: yesterday,
      completed: false,
    };
    todos.add(overdueAdd);
    expect(todos.overdue().length).toEqual(overDueTodoItemsCount + 1);
  });

  test("Should retrieve due today items", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const today = formattedDate(dateToday);

    const DueTodayTodoItemsCount = todos.dueToday().length;
    const todayAdd = {
      title: "Complete this milestone",
      dueDate: today,
      completed: false,
    };
    todos.add(todayAdd);
    expect(todos.dueToday().length).toEqual(DueTodayTodoItemsCount + 1);
  });

  test("Should retrieve due later items", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const tomorrow = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() + 1)),
    );

    const DueLaterTodoItemsCount = todos.dueLater().length;
    const laterAdd = {
      title: "Prepare for sem exams",
      dueDate: tomorrow,
      completed: false,
    };
    todos.add(laterAdd);
    expect(todos.dueLater().length).toEqual(DueLaterTodoItemsCount + 1);
  });
});
