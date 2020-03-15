import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { stringify } from 'querystring';

@Controller('tasks')
export class TasksController {

 constructor(private taskService: TasksService){}
@Get()
getAllTask(): Task[]{
    return this.taskService.getAllTask();
}


@Post()
createTask(
    @Body('title') title:string,
    @Body('description') description:string,
    )
    {




        console.log('title'+title);
        console.log('description'+description);

      return  this.taskService.createTask(title,description);

}












}
