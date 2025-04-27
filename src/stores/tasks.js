import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import { useToast } from 'vue-toastification'
import { saveToLocalStorage, loadFromLocalStorage } from '@/services/storageService'
import { v4 as uuidv4 } from "uuid"

const toast = useToast()

let modules = ref(loadFromLocalStorage().modules || [])

watch(modules, (newModules) => {
  saveToLocalStorage({ modules: newModules })
}, { deep: true })

let ModuleCreated = ref("")
let searchQuery = ref("")
let sortBy = ref(null)
let sortOrder = ref('asc')



let isEditing = ref(false)

export const useTasksStore = defineStore('tasks', () => {

  const priorityOrder = { high: 3, medium: 2, low: 1 }

  const groupedModules = computed(() => {
    const grouped = {}

    for (const task of modules.value) {
      const module = task.moduleName
      if (!grouped[module]) grouped[module] = []
      grouped[module].push(task)
    }

    for (const module in grouped) {
      grouped[module].sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1
        if (a.status !== 'completed' && b.status === 'completed') return -1

        if (sortBy.value === 'duration') {
          return sortOrder.value === 'asc' ? a.duration - b.duration : b.duration - a.duration
        }
        if (sortBy.value === 'priority') {
          return sortOrder.value === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority]
        }

        return 0
      })
    }

    const sorted = {}
    const moduleNames = Object.keys(grouped)
    moduleNames.sort((a, b) => {
      const aCompleted = grouped[a].every(t => t.status === 'completed')
      const bCompleted = grouped[b].every(t => t.status === 'completed')
      return aCompleted - bCompleted
    })

    for (const name of moduleNames) {
      sorted[name] = grouped[name]
    }

    return sorted
  })


  const filteredGroupedModules = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return groupedModules.value

    const filtered = {}

    for (const moduleName in groupedModules.value) {
      if (moduleName.toLowerCase().includes(query)) {
        filtered[moduleName] = [...groupedModules.value[moduleName]].sort((a, b) => {
          if (a.status === 'completed' && b.status !== 'completed') return 1
          if (a.status !== 'completed' && b.status === 'completed') return -1

          if (sortBy.value === 'duration') {
            return sortOrder.value === 'asc' ? a.duration - b.duration : b.duration - a.duration
          }
          if (sortBy.value === 'priority') {
            return sortOrder.value === 'asc'
              ? priorityOrder[a.priority] - priorityOrder[b.priority]
              : priorityOrder[b.priority] - priorityOrder[a.priority]
          }

          return 0
        })
      }
    }

    return filtered
  })

  function addTask(moduleName, taskname, duration, priority, status) {
    moduleName = moduleName.trim()
    taskname = taskname.trim()
    let chq = modules.value.findIndex((t) => t.moduleName === moduleName)
    modules.value.push({
      id: uuidv4(),
      moduleName,
      taskname,
      duration,
      priority,
      status,


    })

    console.log(modules.value.id);

    if (chq === -1) {
      toast.success('New Module and its associated content are Added')

      const newTask = modules.value[modules.value.length - 1]
      const now = new Date().toString()

      newTask.ModuleCreated = now
      newTask.taskCreated = now

      console.log("New module created:", newTask.ModuleCreated)
      console.log("New task created:", newTask.taskCreated)

      newTask.taskUpdated = "Not Updated after Creation"

      if (newTask.status == "completed") {
        newTask.taskmarkCompleted = new Date().toString();
      } else {
        newTask.taskmarkCompleted = "Task To Be Completed Yet"
      }

    }
    else {
      toast.success('Task Added to the existing Module')

      const newTask = modules.value[modules.value.length - 1]
      const now = new Date().toString()


      const existingTask = modules.value.find(t => t.moduleName === moduleName)

      newTask.taskCreated = now
      newTask.ModuleCreated = existingTask?.ModuleCreated || now

      newTask.taskUpdated = "Not Updated after Creation"
      let index = modules.value.findIndex(t => t.id === taskname.id)
      if (newTask.status == "completed") {
        newTask.taskmarkCompleted = new Date().toString();

      } else {
        newTask.taskmarkCompleted = "Task To Be Completed Yet"
      }
    }

  }

  function removeTask(taskToRemove, moduleName) {
    modules.value = modules.value.filter(task => task.id !== taskToRemove.id)

    let chq = modules.value.findIndex((t) => t.moduleName === moduleName)
    if (chq == -1) toast.success('Module Removed')
    else toast.success('Task Removed')
  }


  function updateTask(updatedTask) {
    const index = modules.value.findIndex(t => t.id === updatedTask.id)
    if (index === -1) return

    const existingTask = modules.value[index]
    const newTask = { ...updatedTask }

    const statusChanged = existingTask.status !== updatedTask.status
    const valuesChanged =
      existingTask.taskname !== updatedTask.taskname ||
      existingTask.duration !== updatedTask.duration ||
      existingTask.priority !== updatedTask.priority ||
      statusChanged

    if (!valuesChanged) {
      console.log("No update")
      return
    }

    newTask.taskUpdated = new Date().toString()

    if (statusChanged) {
      newTask.taskmarkCompleted = newTask.status === 'completed'
        ? new Date().toString()
        : 'Task To Be Completed Yet'
    } else {
      newTask.taskmarkCompleted = existingTask.taskmarkCompleted
    }

    newTask.taskCreated = existingTask.taskCreated
    newTask.ModuleCreated = existingTask.ModuleCreated

    modules.value[index] = newTask
    toast.success('Task Updated')
  }


  function isModuleCompleted(moduleName) {

    const tasks = modules.value.filter(t => t.moduleName === moduleName)
    return tasks.length > 0 && tasks.every(t => t.status === 'completed')
  }







  return {
    modules,
    groupedModules,
    addTask,
    removeTask,
    updateTask,
    isEditing,
    isModuleCompleted,
    filteredGroupedModules,
    searchQuery,
    sortBy,
    sortOrder,

  }
})