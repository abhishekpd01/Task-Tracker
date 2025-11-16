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
            process.exit(0);
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
        {const taskIdToUpdate = parseInt(args[0]);
        const newDescription = args[1];

        if(isNaN(taskIdToUpdate) || !newDescription) {
            console.error('Please provide a valid task ID and new description.');
            process.exit(1);
        }

        const tasks = readTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskIdToUpdate);
        if(taskIndex === -1) {
            console.error(`Task with ID ${taskIdToUpdate} not found.`);
            process.exit(1);
        }
        tasks[taskIndex].description = newDescription;
        
        writeTasks(tasks);
        console.log(`Task with ID ${taskIdToUpdate} successfully updated.`);

        break;}
    case 'delete': 
        {const taskIdToDelete = parseInt(args[0]);
        if(isNaN(taskIdToDelete)) {
            console.error('Please provide a valid task ID.');
            process.exit(1);
        }
        const tasks = readTasks();
        const updatedTasks = tasks.filter(t => t.id !== taskIdToDelete);
        if(tasks.length === updatedTasks.length) {
            console.error(`Task with ID ${taskIdToDelete} not found.`);
            process.exit(1);
        }
        writeTasks(updatedTasks);
        console.log(`Task with ID ${taskIdToDelete} successfully deleted.`);
        break;}
    case 'done':
        {const taskIdToMarkDone = parseInt(args[0]);
        if(isNaN(taskIdToMarkDone)) {
            console.error('Please provide a valid task ID.');
            process.exit(1);
        }

        const tasks = readTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskIdToMarkDone);
        if(taskIndex === -1) {
            console.error(`Task with ID ${taskIdToMarkDone} not found.`);
            process.exit(1);
        }

        tasks[taskIndex].status = 'done';
        writeTasks(tasks);
        console.log(`Task with ID ${taskIdToMarkDone} marked as done.`);

        break;}
    case 'progress':
        {const taskIdToMarkDone = parseInt(args[0]);
        if(isNaN(taskIdToMarkDone)) {
            console.error('Please provide a valid task ID.');
            process.exit(1);
        }

        const tasks = readTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskIdToMarkDone);
        if(taskIndex === -1) {
            console.error(`Task with ID ${taskIdToMarkDone} not found.`);
            process.exit(1);
        }

        tasks[taskIndex].status = 'in-progress';
        writeTasks(tasks);
        console.log(`Task with ID ${taskIdToMarkDone} marked as in-progress.`);

        break;}
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