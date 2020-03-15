import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { stringify } from 'querystring';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

 constructor(private taskService: TasksService){}
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
getTaskDelete(@Param('id') id:string): Task{
    return this.taskService.getTaskDelete(id);

}



@Post()
createTask(@Body() createTaskDto:CreateTaskDto):Task{





      return  this.taskService.createTask(createTaskDto);

}












}
