<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Progress } from '@/components/ui/progress'
import TaskActions from '@/components/task/TaskActions.vue'
import TaskTable from '@/components/task/TaskTable.vue'
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useTaskStore } from '@/stores/task'
import { STATUS } from '@/types/common'

const progress = ref(13)

const { getTasks, tasks, state } = useTaskStore()

onMounted(() => {
  getTasks()
})
watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 66), 1000)
  cleanupFn(() => clearTimeout(timer))

  if (tasks) {
    const timer2 = setTimeout(() => (progress.value = 100), 1000)
    cleanupFn(() => clearTimeout(timer2))
  }
})
</script>

<template>
  <div class="w-full flex justify-center">
    <div
      class="w-full flex justify-center items-center min-h-screen"
      v-if="state.getTaskStatus === STATUS.LOADING"
    >
      <Progress v-model="progress" class="w-3/5" />
    </div>
    <div
      class="flex justify-center items-center min-h-screen"
      v-else-if="state.getTaskStatus === STATUS.ERROR"
    >
      <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription> {{ state.error }} </AlertDescription>
      </Alert>
    </div>
    <dev v-else class="w-full p-10">
      <TaskActions />
      <TaskTable v-if="tasks" :tasks="tasks" />
    </dev>
  </div>
</template>
