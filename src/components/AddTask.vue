<script setup>
import '@material/web/button/filled-tonal-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import { useTasksStore } from '@/stores/tasks';
import { reactive, ref } from 'vue';


const store = useTasksStore()
let moduleName=ref("")
let taskname=ref("")
let duration=ref("")
let priority=ref("low")
let status=ref("pending")



function submitForm() {
  
  store.addTask(
    moduleName.value,
    taskname.value,
    duration.value,
    priority.value,
    status.value
  )
  moduleName.value = ""
  taskname.value = ""
  duration.value = ""
  priority.value = "low"
  status.value = "pending"

}
</script>

<template>

  <div class="container">

    <form @submit.prevent="submitForm">
      <!-- module Title -->
      <md-outlined-text-field label="Module Title" type="text" @input="e => moduleName = e.target.value" :value="moduleName" required></md-outlined-text-field>
      &nbsp;
      &nbsp;

      <!-- contents-->
      <md-outlined-text-field label="Contents" type="textarea" rows="1" 
      @input="e => taskname = e.target.value" :value="taskname" required></md-outlined-text-field>
      &nbsp;
      &nbsp;

      <!-- Duration -->
      <md-outlined-text-field label="Duration (in Days)" type="number" min="1" 
      @input="e => duration = e.target.value" :value="duration" required></md-outlined-text-field>
      &nbsp;&nbsp;

      <!-- Priority -->
      <md-outlined-select label="Priority"@change="e => priority = e.target.value" :value="priority" required>
        <md-select-option value="low">
          <div slot="headline">Low</div>
        </md-select-option>
        <md-select-option value="medium">
          <div slot="headline">Medium</div>
        </md-select-option>
        <md-select-option value="high">
          <div slot="headline">High</div>
        </md-select-option>
      </md-outlined-select>
      &nbsp;&nbsp;

      <!-- Status -->
      <md-outlined-select label="Status"  @change="e => status = e.target.value" :value="status" required>
        <md-select-option value="pending">
          <div slot="headline">Pending</div>
        </md-select-option>
        <md-select-option value="completed">
          <div slot="headline">Completed</div>
        </md-select-option>
      </md-outlined-select>
      &nbsp;&nbsp;

      <!-- Button -->
      <div class="button-container">
        <div class="wrapper">
          <md-filled-tonal-button class="add-task-btn" type="submit">
            Add Task
            <svg slot="icon" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </md-filled-tonal-button>
        </div>
      </div>
    </form>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  align-items: flex-start;
}


md-outlined-text-field,
md-outlined-select {
  flex: 1 1 auto;
  min-width: 160px;
  height: 56px; 
}


.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.wrapper:hover md-filled-tonal-button {
  --md-filled-tonal-button-container-color: #a795be;

}

.add-task-btn{
  width: 130px;
}

@media (max-width: 600px) {
  form {
    flex-direction: column;
    align-items: stretch;
  }

  md-outlined-text-field,
  md-outlined-select {
    width: 100%;
    height: 56px; 
  }

  .button-container {
    justify-content: center;
  }
}

</style>
