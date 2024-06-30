import api from '@/api/instance'
import { STATUS } from '@/types/common'
import type { ITaskReq, ITask } from '@/types/task'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<ITask[]>([])
  const state = reactive({
    getTaskStatus: STATUS.COMPLETE,
    createTaskStatus: STATUS.COMPLETE,
    deleteTaskStatus: STATUS.COMPLETE,
    updateTaskStatus: STATUS.COMPLETE,
    error: ''
  })

  async function getTasks() {
    try {
      state.getTaskStatus = STATUS.LOADING

      const { data } = await api.get<ITask[]>('/task')

      tasks.value = data

      state.getTaskStatus = STATUS.COMPLETE
    } catch (error: any) {
      state.getTaskStatus = STATUS.ERROR

      if (error.code === 'ECONNABORTED') {
        state.error = 'Сервер не отвечает. \n Попробуйте позже.'
      } else {
        state.error = error.response.data.message
      }

      console.log(error)
    }
  }

  async function createTask(task: ITaskReq) {
    try {
      state.createTaskStatus = STATUS.LOADING

      if (!task.title || !task.description) {
        state.createTaskStatus = STATUS.ERROR
        state.error = 'Поля заполнены неверно.'
        return
      }

      const { data } = await api.post<ITask>('/task', task)

      tasks.value.push(data)

      state.createTaskStatus = STATUS.COMPLETE
    } catch (error: any) {
      state.createTaskStatus = STATUS.ERROR

      if (error.code === 'ECONNABORTED') {
        state.error = 'Сервер не отвечает. \n Попробуйте позже.'
      } else {
        state.error = error.response.data.message
      }

      console.log(error)
    }
  }

  async function deleteTask(taskId: string) {
    try {
      state.deleteTaskStatus = STATUS.LOADING

      const { data } = await api.delete<ITask>(`/task/${taskId}`)

      tasks.value = tasks.value.filter((task) => task._id !== data._id)

      state.deleteTaskStatus = STATUS.COMPLETE
    } catch (error: any) {
      state.deleteTaskStatus = STATUS.ERROR

      if (error.code === 'ECONNABORTED') {
        state.error = 'Сервер не отвечает. \n Попробуйте позже.'
      } else {
        state.error = error.response.data.message
      }

      console.log(error)
    }
  }

  async function updateTask(task: ITaskReq, taskId: string) {
    try {
      state.deleteTaskStatus = STATUS.LOADING

      if (!task.title || !task.description) {
        state.updateTaskStatus = STATUS.ERROR
        state.error = 'Поля заполнены неверно.'
        return
      }

      const { data } = await api.put<ITask>(`/task/${taskId}`, task)

      const taskIndex = tasks.value.findIndex((item) => item._id === taskId)

      tasks.value[taskIndex] = data
    } catch (error: any) {
      state.updateTaskStatus = STATUS.ERROR

      if (error.code === 'ECONNABORTED') {
        state.error = 'Сервер не отвечает. \n Попробуйте позже.'
      } else {
        state.error = error.response.data.message
      }

      console.log(error)
    }
  }

  return {
    tasks: computed(() => tasks),
    state,
    getTasks,
    createTask,
    deleteTask,
    updateTask
  }
})
