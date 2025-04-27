<script setup>
import { ref, watch, computed } from 'vue'
import '@material/web/dialog/dialog.js'
import '@material/web/button/filled-button.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'

import { useTasksStore } from '@/stores/tasks'
const store=useTasksStore()

const props = defineProps({
  task: Object,
  open: Boolean,
})


const emit = defineEmits(['close', 'save'])

const dialogRef = ref(null)

const editableTask = ref({ ...props.task })

watch(() => props.task, (newTask) => {
  editableTask.value = { ...newTask }
  store.isEditing = false
})

watch(() => props.open, (newVal) => {
  if (dialogRef.value) {
    newVal ? dialogRef.value.show() : dialogRef.value.close()
  }
})

const closeDialog = () => {
  store.isEditing = false
  emit('close')
}

const saveChanges = () => {

  store.isEditing = false
  emit('save', editableTask.value)
}
</script>

<template>
  <md-dialog ref="dialogRef" @closed="closeDialog" class="dialogClass">
    <template v-if="editableTask">
      <div slot="headline">
        <b>{{ editableTask.module }}</b>📝{{ store.isEditing ? 'Edit Task' : 'Task Info' }}
      </div>

      <form slot="content" style="display: flex; flex-direction: column; gap: 1rem;">
        <md-outlined-text-field
          v-model="editableTask.taskname"
          label="Task Name"
          :readonly="!store.isEditing"
        ></md-outlined-text-field>
        <md-outlined-text-field
          v-model="editableTask.moduleName"
          label="Module Name"
          readonly
        ></md-outlined-text-field>

        <md-outlined-text-field
          v-model="editableTask.duration"
          label="Duration (days)"
          type="number"
          :readonly="!store.isEditing"
        ></md-outlined-text-field>

        <md-outlined-select v-model="editableTask.priority" label="Priority" :disabled="!store.isEditing">
          <md-select-option value="low">Low</md-select-option>
          <md-select-option value="medium">Medium</md-select-option>
          <md-select-option value="high">High</md-select-option>
        </md-outlined-select>

        <md-outlined-select v-model="editableTask.status" label="Status" :disabled="!store.isEditing">
          <md-select-option value="pending">Pending</md-select-option>
          <md-select-option value="completed">Completed</md-select-option>
        </md-outlined-select>

        <md-outlined-text-field :value="editableTask.ModuleCreated" label="Module Created At" readonly></md-outlined-text-field>
        <md-outlined-text-field :value="editableTask.taskCreated" label="Task Created At" readonly></md-outlined-text-field>
        <md-outlined-text-field :value="editableTask.taskUpdated" label="Task Updated At" readonly></md-outlined-text-field>
        <md-outlined-text-field :value="editableTask.taskmarkCompleted" label="Task Completed At" readonly></md-outlined-text-field>
      </form>

      

      <div slot="actions">
        <md-filled-button v-if="!store.isEditing" @click="store.isEditing = true">Edit</md-filled-button>        
        <md-filled-button v-if="store.isEditing" @click="saveChanges">Save</md-filled-button>
        <md-filled-button @click="closeDialog">Close</md-filled-button>
      </div>
    </template>
  </md-dialog>
</template>

<style scoped>
.dialogClass{
  width: 60%;
  display: flex;
  justify-content: center;
}



@media screen and (min-width:650px) and (max-width:780px) {
  .dialogClass{
    width: 75%;
  }
}

@media screen and (max-width:650px){
  .dialogClass{
    width: 85%;
  }
}

@media screen and (max-width: 550px) {
  .dialogClass{
    width:95%;
  }
}


</style>

