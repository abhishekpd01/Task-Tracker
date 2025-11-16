# Node.js CLI Task Tracker

This is a simple, lightweight command-line task management tool built with Node.js. It allows you to track tasks you need to do, what you're working on, and what you've completed, all from your terminal.

Project URL: [link](https://roadmap.sh/projects/task-tracker)

The project is built entirely with native Node.js modules (```fs```, ```path```) and uses a local tasks.json file for persistent storage. No external libraries are required.

## Features

- Add new tasks.
- List all tasks with their status.
- Filter tasks by status: todo, in-progress, or done.
- Update the description of an existing task.
- Mark tasks as in-progress.
- Complete tasks by marking them as done.
- Delete tasks from your list.

## Requirements

- Node.js (v12 or higher recommended)

## How to Use

All commands are run from your terminal using ```node index.js```, followed by the command and any required arguments.

```add```

Adds a new task to your list. The task description must be enclosed in quotes if it contains spaces.

### Usage:

```node index.js add "<task_description>"```


### Example:

```node index.js add "Buy groceries"```


```list```

Lists all tasks. You can optionally filter the list by providing a status (pending, in-progress, done).

### Usage:

```# List all tasks
node index.js list

# List only completed tasks
node index.js list done

# List only tasks in progress
node index.js list progress

# List only tasks not yet started
node index.js list pending
```


```update```

Updates the description of an existing task, identified by its ID.

### Usage:

```node index.js update <ID> "<new_description>"```


### Example:

```node index.js update 2 "Walk the dog in the park"```


```done```

Marks a task as "done".

### Usage:

```node index.js done <ID>```


### Example:

```node index.js done 1```


```progress```

Marks a task as "in-progress".

### Usage:

  ```node index.js progress <ID>```


### Example:

```node index.js progress 3```


```delete```

Permanently deletes a task from the list, identified by its ID.

### Usage:

```node index.js delete <ID>```


### Example:

```node index.js delete 1```


## Storage

All tasks are stored in a tasks.json file created in the same directory as the index.js script. If the file is deleted, all tasks will be lost.
