import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
    private tasks:Task[] = [];
    getAllTask():Task[]{
         return this.tasks;
    }
    getTaskById(id:string):Task{
        const found  = this.tasks.find(task => task.id ===id) 
        
        if(!found){
           throw new NotFoundException(`not  found id`);
        }
    
        return found
    
    }

    getTaskWithFilters(filterDto:GetTasksFilterDto){
        const {status, search} = filterDto
        let tasks = this.getAllTask()
        if(status){
            tasks = tasks.filter(task =>task.status ===status);
        }
        if (search){
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
                )
        }
        return tasks;
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const {title,description} = createTaskDto;
        const task:Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id:string):void{


        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task=>task.id!==found.id);

        }

    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
