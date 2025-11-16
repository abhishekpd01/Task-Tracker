const fs = require('fs');
const path = require('path');

const taskFilePath = path.join(__dirname, 'tasks.json')

const command = process.argv[2];
const args = process.argv.slice(3);

switch(command) {
    case 'add':
        {const taskDescription = args[0];

        if(!taskDescription) {
            console.error('Please provide a task description.');
            process.exit(1);
        }

        const tasks = readTasks();
        // Determine new task ID for the added task
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
        const newTaskId = maxId + 1;

        // Create new task object
        const newTask = {
            id: newTaskId,
            description: taskDescription,
            status: 'pending'   // default status
        }

        // Add new task to tasks array
        tasks.push(newTask);
        writeTasks(tasks);

        console.log(`Task successfully added with ID: ${newTaskId}`);
        break;}
    case 'list':
        const status = args[0];
        const tasks = readTasks();

        if(tasks.length === 0) {
            console.log('No tasks found.');
            break;
        }

        let filteredTasks = tasks;
        if(status) {
            filteredTasks = tasks.filter(t => t.status === status);
            if(filteredTasks.length === 0) {
                console.log(`No tasks found with status: ${status}`);
            }
            printTasks(filteredTasks);
        }
        else {
            printTasks(tasks);
        }

        break;
    case 'update':
        // Call a function to update a task
        break;
    case 'delete': 
        // Call a function to delete a task
        break;
    case 'done':
        // Call a function to mark a task as done
        break;
    case 'progress':
        // Call a function to mark a task as in progress
        break;
    default:
        console.log('Unknown command. Available commands: add, list, update, delete, done, progress');
}

function readTasks() {
    try {
        if(!fs.existsSync(taskFilePath)) {
            return [];
        }
        const data = fs.readFileSync(taskFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
}

function writeTasks(tasksArray) {
    try {
        const tasks = JSON.stringify(tasksArray, null, 2);
        fs.writeFileSync(taskFilePath, tasks, 'utf-8');
    } catch (error) {
        console.error('Error writing tasks: ', error);
    }
}

function printTasks(tasksArray) {
    tasksArray.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
    })
}