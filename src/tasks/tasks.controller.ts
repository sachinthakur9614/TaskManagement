import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPage } from './pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
 constructor(private taskService: TasksService){}
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Task[]{
        console.log('logging')
        if (Object.keys(filterDto).length){
            console.log('logging with object')
            return this.taskService.getTaskWithFilters(filterDto);
        }
        else{

            console.log('logging')
            return this.taskService.getAllTask();
        }

    }


    getTaskWithFilters(filterDto:GetTasksFilterDto):Task[]{
        if (Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilters(filterDto);
        }
        else{
            return this.taskService.getAllTask();
        }
    }

    @Get()
    getAllTask(): Task[]{
        return this.taskService.getAllTask();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id);
    }

    @Delete('/id')
    deleteTask(@Param('id') id:string):void{
        this.taskService.deleteTask(id);
    }

    @Get('/:id')
    getTaskDelete(@Param('id') id:string): void{
        return this.taskService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return  this.taskService.createTask(createTaskDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status', TaskStatusValidationPage) status:TaskStatus,
    ):Task
        {
            return this.taskService.updateTaskStatus(id,status);
        }
}   








