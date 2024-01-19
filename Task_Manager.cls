public class Task_Manager {    
    @AuraEnabled
    public static void createTask(String taskName, Date dueDate) {
        Task_Manager__c task = new Task_Manager__c(
            Name = taskName,
            Task_Date__c = dueDate,
            Status__c = 'Pending'
        );
        insert task;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> getTasks() {
       List<Task_Manager__c> taskRec = [SELECT Id, Name, Task_Date__c, Completed_Date__c, Status__c FROM Task_Manager__c where IsCompleted__c = false  order by Task_Date__c desc ];
       //sreturn taskRec; 
        if(!taskRec.isEmpty()){
            return taskRec;
        }
        else
            return null;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> getCompletedTasks() {
        return [SELECT Id, Name, Task_Date__c, Completed_Date__c, Status__c FROM Task_Manager__c where IsCompleted__c = true order by Task_Date__c desc ];
    }
    
    @AuraEnabled
    public static void deleteTasks(String taskId) {
        system.debug(taskId);
        if(taskId == 'Yes'){
            delete [SELECT Id FROM Task_Manager__c where IsCompleted__c = true];
        }
        else{
            delete [SELECT Id FROM Task_Manager__c where Id =: taskId];
        }
    }
    
    @AuraEnabled
    public static void updateTasks(String taskId) {
        Task_Manager__c task = [Select Id, Name, IsCompleted__c, Completed_Date__c from Task_Manager__c where Id =: taskId];            
        task.Name = task.Name + '  ✔';
        task.IsCompleted__c = true;
        task.Status__c = 'Done';
        task.Completed_Date__c = system.today();
        
        update task;        
    }  
    
    @AuraEnabled
    public static void selectedUpdateTasks(String taskId, String taskName, Date taskDate) {
        Task_Manager__c taskChange = [Select Id, Name, IsCompleted__c, Task_Date__c from Task_Manager__c where Id =: taskId];
        system.debug(taskChange);        
        taskChange.Name = taskName;       
        taskChange.Task_Date__c = taskDate;        
        update taskChange;       
    }  
}