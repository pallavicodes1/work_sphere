// Demo task store (in memory). In your real app, replace these functions with
// calls to your existing database or service layer. Keep the permission checks.

 const STATUSES = ["todo", "in_progress", "done"];
 const PRIORITIES = ["low", "medium", "high"];

const tasks = new Map(
  [
    { id: "t1", title: "Fix login bug", description: "Users get logged out after 5 minutes.", status: "in_progress", priority: "high", assignee: "Rahul", due_date: "2026-09-28" },
    { id: "t2", title: "Design onboarding screens", description: "Three screens for new users.", status: "todo", priority: "medium", assignee: "Priya", due_date: "2026-10-10" },
    { id: "t3", title: "Write API docs", description: "Document the tasks endpoints.", status: "todo", priority: "low", assignee: "Rahul", due_date: "2026-10-15" },
    { id: "t4", title: "Set up CI pipeline", description: "Run tests on every pull request.", status: "done", priority: "medium", assignee: "Priya", due_date: "2026-09-20" },
  ].map((t) => [t.id, t])
);

const today = () => new Date().toISOString().slice(0, 10);

 function getTask(id) {
  const task = tasks.get(String(id));
  if (!task) throw new Error(`Task "${id}" not found.`);
  return task;
}

// Who may edit or delete a task. Adjust to your rules (project roles, etc.).
 function assertCanModify(user, task) {
  if (user.role === "admin" || task.assignee === user.name) return;
  throw new Error(`You don't have permission to change "${task.title}".`);
}

 function listTasks(user, { status, assignee, overdue, search } = {}) {
  // Real app: only return tasks from projects this user belongs to.
  return [...tasks.values()]
    .filter((t) => !status || t.status === status)
    .filter((t) => !assignee || t.assignee.toLowerCase() === assignee.toLowerCase())
    .filter((t) => !overdue || (t.due_date < today() && t.status !== "done"))
    .filter((t) => !search || t.title.toLowerCase().includes(search.toLowerCase()))
    .map(({ id, title, status, priority, assignee, due_date }) => ({ id, title, status, priority, assignee, due_date }));
}

// Validates and returns only the fields that are allowed to change.
 function validatePatch(args) {
  const patch = {};
  for (const key of ["title", "description", "assignee"]) {
    if (args[key] !== undefined) {
      if (typeof args[key] !== "string" || !args[key].trim()) throw new Error(`"${key}" must be a non-empty string.`);
      patch[key] = args[key].trim().slice(0, 2000);
    }
  }
  if (args.status !== undefined) {
    if (!STATUSES.includes(args.status)) throw new Error(`status must be one of: ${STATUSES.join(", ")}.`);
    patch.status = args.status;
  }
  if (args.priority !== undefined) {
    if (!PRIORITIES.includes(args.priority)) throw new Error(`priority must be one of: ${PRIORITIES.join(", ")}.`);
    patch.priority = args.priority;
  }
  if (args.due_date !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(args.due_date) || Number.isNaN(Date.parse(args.due_date))) {
      throw new Error("due_date must be a valid date in YYYY-MM-DD format.");
    }
    patch.due_date = args.due_date;
  }
  if (Object.keys(patch).length === 0) throw new Error("No changes were specified.");
  return patch;
}

 function updateTask(user, id, patch) {
  const task = getTask(id);
  assertCanModify(user, task);
  Object.assign(task, patch);
  return task;
}

function deleteTask(user, id) {
  const task = getTask(id);
  assertCanModify(user, task);
  tasks.delete(task.id);
  return task;
}


module.exports={deleteTask,updateTask,validatePatch,listTasks,assertCanModify,getTask,STATUSES,PRIORITIES}