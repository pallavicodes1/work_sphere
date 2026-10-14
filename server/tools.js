const store=require('./store')
const WRITE_TOOLS = new Set(["update_task", "delete_task"]);

const toolDefs = [
  {
    type: "function",
    function: {
      name: "list_tasks",
      description: "Find tasks. Always use this to look up a task ID before updating or deleting.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", enum: store.STATUSES },
          assignee: { type: "string", description: "Person's name" },
          overdue: { type: "boolean", description: "Only overdue, unfinished tasks" },
          search: { type: "string", description: "Text to match in the title" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_task",
      description:
        "Edit or update one task: title, description, status, priority, assignee or due date. Only include fields that should change.",
      parameters: {
        type: "object",
        properties: {
          task_id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: store.STATUSES },
          priority: { type: "string", enum: store.PRIORITIES },
          assignee: { type: "string" },
          due_date: { type: "string", description: "YYYY-MM-DD" },
        },
        required: ["task_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_task",
      description: "Permanently delete one task.",
      parameters: {
        type: "object",
        properties: { task_id: { type: "string" } },
        required: ["task_id"],
      },
    },
  },
];

// Read tools run immediately and return data for the model.
 function runReadTool(name, args, user) {
  if (name === "list_tasks") return store.listTasks(user, args);
  throw new Error(`Unknown tool "${name}".`);
}

// Write tools are NOT executed here. This validates the request and returns a
// plain-language summary for the user to confirm. Throws if the request is invalid.
 function previewWriteTool(name, args, user) {
  const task = store.getTask(args.task_id);
  store.assertCanModify(user, task);

  if (name === "update_task") {
    const { task_id, ...fields } = args;
    const patch = store.validatePatch(fields);
    const changes = Object.entries(patch)
      .map(([key, value]) => `${key.replace("_", " ")} → ${value}`)
      .join(", ");
    return { summary: `Update "${task.title}": ${changes}`, args: { task_id, ...patch } };
  }
  if (name === "delete_task") {
    return { summary: `Permanently delete "${task.title}"`, args: { task_id: task.id } };
  }
  throw new Error(`Unknown tool "${name}".`);
}

// Runs a confirmed write action. Permissions are checked again inside the store.
 function executeWriteTool(name, args, user) {
  if (name === "update_task") {
    const { task_id, ...patch } = args;
    const task = store.updateTask(user, task_id, store.validatePatch(patch));
    return `Done. Updated "${task.title}".`;
  }
  if (name === "delete_task") {
    const task = store.deleteTask(user, args.task_id);
    return `Done. Deleted "${task.title}".`;
  }
  throw new Error(`Unknown tool "${name}".`);
}

module.exports={toolDefs,WRITE_TOOLS,runReadTool,previewWriteTool,executeWriteTool}