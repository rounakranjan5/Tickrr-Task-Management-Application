<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useThemeStore } from '@/stores/theme'
import Modal from './Modal.vue'
import JsonCSV from 'vue-json-csv'

import '@material/web/checkbox/checkbox.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/icon/icon.js'

const store = useTasksStore()
const themeStore = useThemeStore()


const checkedModules = reactive({})
const checkedTasks = reactive({})


watch(() => store.groupedModules, (newModules) => {
  for (let moduleName in newModules) {
    const tasks = newModules[moduleName]
    checkedTasks[moduleName] = tasks.map(task => task.status === 'completed')
    checkedModules[moduleName] = tasks.every(task => task.status === 'completed')
  }
}, { immediate: true, deep: true })

function toggleTask(moduleName, index) {
  const isChecked = checkedTasks[moduleName][index]
  const originalTask = store.groupedModules[moduleName][index]
  const updatedTask = { ...originalTask, status: isChecked ? 'completed' : 'pending' }
  store.updateTask(updatedTask)
  checkedModules[moduleName] = checkedTasks[moduleName].every(Boolean)
}

function toggleModule(moduleName, event) {
  const value = event.target.checked
  checkedModules[moduleName] = value
  const tasks = store.groupedModules[moduleName]
  tasks.forEach((task, index) => {
    const updatedTask = { ...task, status: value ? 'completed' : 'pending' }
    checkedTasks[moduleName][index] = value
    store.updateTask(updatedTask)
  })
}

const getPriorityColor = (priority) => {
  if (priority === 'high') return 'red'
  if (priority === 'medium') return 'orange'
  if (priority === 'low') return 'darkgreen'
  return 'black'
}

const getStatusColor = (status) => {
  if (status === 'pending') return 'red'
  if (status === 'completed') return 'darkgreen'
  return 'black'
}

const selectedTask = ref(null)
const isInfoOpen = ref(false)

const editTask = (task, moduleName) => {
  selectedTask.value = task
  isInfoOpen.value = true
}

const info = (task, moduleName) => {
  selectedTask.value = task
  isInfoOpen.value = true
}

const handleSave = (updatedTask) => {
  store.updateTask(updatedTask)
  isInfoOpen.value = false
}

const deleteTask = (task, moduleName) => {
  store.removeTask(task, moduleName)
}

let moduleName = ref("")

function ActivateSearch() {
  moduleName.value = ""
  store.searchQuery = moduleName.value
}

function toggleSort(field) {
  if (store.sortBy === field) {
    store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc'
  } else {
    store.sortBy = field
    store.sortOrder = 'asc'
  }
}

const csvFields = ['Module', 'TaskName', 'Duration', 'Priority', 'Status']

const csvData = computed(() => {
  const data = []
  for (const [moduleName, taskList] of Object.entries(store.filteredGroupedModules)) {
    for (const task of taskList) {
      data.push({
        Module: moduleName,
        TaskName: task.taskname,
        Duration: task.duration,
        Priority: task.priority,
        Status: task.status
      })
    }
  }
  return data
})
</script>


<template>
  <div v-if="store.modules.length > 0" class="module-table">
    <div class="outerdiv">
      <h2 class="poetsen-one-regular">Your Modules !</h2>
      <div class="innerdiv">
        <md-outlined-text-field placeholder="Search Module Name" v-model="store.searchQuery">
          <md-icon slot="leading-icon">search</md-icon>
        </md-outlined-text-field>

        <button @click="ActivateSearch">Clear</button>
        <JsonCSV :data="csvData" :fields="csvFields" name="tasks.csv" class="csv-button" tabindex="0">
          Export to CSV
        </JsonCSV>
      </div>
    </div>

    <table class="task-table">
      <thead>
        <tr>
          <th>Module</th>
          <th>Task Name</th>
          <th>Duration (days)
            <span class="material-symbols-outlined" style="cursor: pointer;"
              @click="toggleSort('duration')" tabindex="0" @keydown.enter="toggleSort('duration')">filter_list</span>
          </th>
          <th>Priority
            <span class="material-symbols-outlined" style="cursor: pointer;"
              @click="toggleSort('priority')" tabindex="0" @keydown.enter="toggleSort('priority')">filter_list</span>
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!--  -->
        <template v-for="(tasks, moduleName) in store.filteredGroupedModules" :key="moduleName">
          <template v-for="(task, index) in tasks" :key="task.id || index">
            <tr class="task-row" @dblclick="info(task, moduleName)">
              <td v-if="index === 0" :rowspan="tasks.length" class="module-name"
                :class="{ 'completed-module': store.isModuleCompleted(moduleName) }">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <md-checkbox :checked="checkedModules[moduleName]" @change="e => toggleModule(moduleName, e)" />
                  <span
                    :style="{ textDecoration: tasks.every(t => t.status === 'completed') ? 'line-through' : 'none' }">
                    <strong>{{ moduleName }}</strong>
                  </span>
                  <span v-if="store.isModuleCompleted(moduleName)" class="badge-done">✅ All Done</span>
                </div>
              </td>

              <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <md-checkbox :checked="checkedTasks[moduleName]?.[index]" @change="e => {
                    checkedTasks[moduleName][index] = e.target.checked;
                    toggleTask(moduleName, index)
                  }" />
                  <span class="tasktext"
                    :style="{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }">
                    {{ task.taskname }}
                  </span>
                </div>
              </td>

              <td>{{ task.duration }}</td>
              <td :style="{ color: getPriorityColor(task.priority) }">{{ task.priority }}</td>
              <td :style="{ color: getStatusColor(task.status) }">{{ task.status }}</td>

              <td class="actions">
                <span class="material-icons edit-icon" @click="editTask(task, moduleName)" tabindex="0" @keydown.enter="editTask(task, moduleName)">edit</span>
                <span class="material-icons delete-icon" @click="deleteTask(task, moduleName)" tabindex="0" @keydown.enter="deleteTask(task, moduleName)">delete</span>
                <span class="material-icons symbols-outlined" @click="info(task, moduleName)" tabindex="0" @keydown.enter="info(task, moduleName)">info</span>
              </td>
            </tr>
          </template>
          <Modal :task="selectedTask" :open="isInfoOpen" @close="isInfoOpen = false" @save="handleSave" />
        </template>
      </tbody>
    </table>
  </div>

  <div v-else class="elsediv">
    <img src="https://cdn.pixabay.com/photo/2023/01/22/14/39/man-7736545_1280.png" alt="No tasks" height="400px" v-if="!themeStore.isDarkMode" class="elseimg" />
    <img src="/public/darkTheme.png" alt="No tasks" height="400px" class="elseimg" v-else />
  </div>
</template>



<style scoped>
.poetsen-one-regular {
  font-family: "Poetsen One", sans-serif;
  font-weight: 100;
  font-style: normal;
}

md-outlined-text-field {
  width: 50%;
  height: 56px;
}

.outerdiv {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.innerdiv {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button,
.csv-button {
  height: 56px;
  border-radius: 20px;
  background-color: #d9d6de;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  text-decoration: none;
  color: black;
  flex-wrap: wrap;
  border-color: transparent;
}

.module-table {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}

.task-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  margin: 0 auto;
}

th,
td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

th {
  background-color: #8587a3;
  color: white;
  font-weight: bold;
}

.module-name {
  background-color: #f3f3f3;
  font-weight: bold;
  color: #333;
}

.task-row:hover td:not(.module-name) {
  background-color: #cbc8e7;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.material-icons {
  cursor: pointer;
  font-size: 20px;
}

.edit-icon {
  color: #1976d2;
}

.delete-icon {
  color: #d32f2f;
}

.elsediv {
  text-align: center;
}

.completed-module {
  background-color: #eee;
  opacity: 0.8;
}

.badge-done {
  background-color: #d0f0c0;
  color: #256029;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 6px;
}


@media screen and (max-width:630px) {
  md-outlined-text-field{
    width: 100%;
  }

  .innerdiv{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .task-table{
    min-width: unset;
    width: 100%;
    font-size: 10px;
  }

  .actions{
    display: flex;
    flex-direction: column;
    gap: 2px;
  }


}

@media screen and (max-width:500px) {
  .elseimg{
    width: 380px;
    height: 300px;
  }
}

@media screen and (max-width:405px) {
  .task-table{
    font-size: 7px;
  }
}

</style>
