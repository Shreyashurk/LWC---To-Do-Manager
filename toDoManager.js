import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import createTask from '@salesforce/apex/Task_Manager.createTask';
import getTasks from '@salesforce/apex/Task_Manager.getTasks';
import deleteTasks from '@salesforce/apex/Task_Manager.deleteTasks';
import updateTasks from '@salesforce/apex/Task_Manager.updateTasks';
import getCompletedTasks from '@salesforce/apex/Task_Manager.getCompletedTasks';
import selectedUpdateTasks from '@salesforce/apex/Task_Manager.selectedUpdateTasks';

export default class ToDoManager extends LightningElement {

    @track taskName = '';
    @track dueDate = '';
    wiredfetchedtask;
    wiredfetchedCompletedtask;
    fetchedtask;
    fetchedCompletedtask;
    @track isIconEnabled = true;
    showDelete = true;
    isAddDisabled = false;
    isUpdateDisabled = true;
    taskUpdateID;
    

    handleTaskNameChange(event) {
        this.taskName = event.target.value;
    }

    handleDueDateChange(event) {
        this.dueDate = event.target.value;
    }

    @wire(getTasks) wiredTasks(result) {                //Main Fetching
        this.wiredfetchedtask = result;       
        if (result.data) {
            this.fetchedtask = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;            
        }
        return refreshApex(this.wiredfetchedCompletedtask);
    }

    @wire(getCompletedTasks) wiredCompletedTasks(result) {
        this.wiredfetchedCompletedtask = result; 
        if (result.data) {
            this.fetchedCompletedtask = result.data;
            this.error = undefined;
        }else if (result.error) {
            this.error = result.error;
        }
    }

    /*First Called wire Method and created one extra variable which will store apex coming value and return refreshApex will
    update that variable show in the table*/

    handleCreateTask() {
        createTask({ taskName: this.taskName, dueDate: this.dueDate })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task created successfully',
                        variant: 'success'
                    })
                );
                this.taskName = '';
                this.dueDate = '';                
                return refreshApex(this.wiredfetchedtask);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating task',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

   handleDeleteClick(event){ 
       this.taskdelName = event.currentTarget.dataset.name;
       const confirmed = window.confirm('Do you want to delete '+ this.taskdelName +' Task?');
        if (confirmed) {      
            deleteTasks({ taskId : event.currentTarget.dataset.id})
                    .then(result => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Deleted Task',
                                message: 'Task Deleted successfully',
                                variant: 'success'
                            })
                        );
                    return refreshApex(this.wiredfetchedtask);
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating task',
                                message: error.message,
                                variant: 'error'
                            })
                        );
                    });
        }          
    } 

    handleEditTask(event){
        this.isUpdateDisabled = false;
        this.isAddDisabled = true;
        
        this.taskUpdateID = event.currentTarget.dataset.id;
        console.log(this.taskUpdateID);
        this.taskName = event.currentTarget.dataset.name;
        this.dueDate = event.currentTarget.dataset.date;

        const box = this.template.querySelector('[data-id="box"]');
        box.style.backgroundColor = 'Bisque';        
    }

    handleCancel(event){
        this.isUpdateDisabled = true;
        this.isAddDisabled = false;
        this.taskName = '';
        this.dueDate = '';

        const box = this.template.querySelector('[data-id="box"]');
        box.style.backgroundColor = 'white';
    }

    handleCompleteTask(event){        
        console.log(event.currentTarget.dataset.id)    ;
        updateTasks({ taskId : event.currentTarget.dataset.id })
            .then(result => {
                          
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Task Completed',
                        message: 'Task created successfully',
                        variant: 'success'
                    })
                );               
                return refreshApex(this.wiredfetchedtask);
            })             
    } 


    handleDeleteAll(event){
        const confirmed = window.confirm('Do you want to Delete all Completed Task?');
        if (confirmed) {
            deleteTasks({ taskId : "Yes"})
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task Deleted successfully',
                        variant: 'success'
                    })
                );
                return refreshApex(this.wiredfetchedCompletedtask);
            })
            
        } 
    } 

    handleUpdateCreatedTask(event){
        console.log(this.taskName);
        selectedUpdateTasks({ taskId : this.taskUpdateID, taskName : this.taskName, taskDate : this.dueDate })
            .then(result => {
                          
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Task Update',
                        message: 'Task update successfully',
                        variant: 'success'
                    })
                );               
                return refreshApex(this.wiredfetchedtask);
            })  
        this.taskName = '';
        this.dueDate = '';
        this.isUpdateDisabled = true;
        this.isAddDisabled = false;

        const box = this.template.querySelector('[data-id="box"]');
        box.style.backgroundColor = 'white';        
    } 
    
       
}