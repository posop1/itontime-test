<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import { TableCell } from '@/components/ui/table'
import type { ITaskReq, ITask } from '@/types/task'
import { Button } from '@/components/ui/button'
import { STATUS } from '@/types/common'
import { ref } from 'vue'
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Loader2 } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ITaskTableItemProps {
  task: ITask
}

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})

const props = defineProps<ITaskTableItemProps>()
const { state, updateTask, deleteTask } = useTaskStore()

const title = ref<string>(props.task.title)
const description = ref<string>(props.task.description)
const date = ref<DateValue>()
const tags = ref(props.task.tags)

const isOpenModal = ref<boolean>(false)

async function onSubmit() {
  const newTask: ITaskReq = {
    title: title.value,
    description: description.value,
    endDate: date.value?.toDate(getLocalTimeZone()),
    tags: tags?.value
  }

  await updateTask(newTask, props.task._id)

  title.value = ''
  description.value = ''
  date.value = undefined
  tags.value = []

  if (state.updateTaskStatus === STATUS.COMPLETE) {
    isOpenModal.value = false
  }
}
</script>

<template>
  <TableCell class="font-medium">{{ props.task.number }} </TableCell>
  <TableCell>{{ props.task.title }}</TableCell>
  <TableCell>{{ props.task.description }}</TableCell>
  <TableCell v-if="props.task.tags">{{ props.task.tags?.join(', ') }}</TableCell>

  <TableCell v-if="props.task.endDate"
    >{{ props.task.endDate.toString().split('T')[0].split('-').reverse().join('-') }}
  </TableCell>
  <TableCell v-else> </TableCell>

  <TableCell class="flex gap-4">
    <Button
      variant="destructive"
      :disabled="state.updateTaskStatus === STATUS.LOADING"
      @click="deleteTask(task._id)"
    >
      Удалить
    </Button>
    <Dialog v-model:open="isOpenModal">
      <DialogTrigger as-child @click="() => (isOpenModal = true)">
        <Button variant="outline"> Редактировать </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование Задачи</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Название </Label>
            <Input v-model="title" id="name" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Описание </Label>
            <Input v-model="description" id="username" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Дата Выполнения </Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-[280px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="date" initial-focus />
              </PopoverContent>
            </Popover>
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Метки </Label>
            <TagsInput v-model="tags" class="col-span-3">
              <TagsInputItem v-for="item in tags" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>

              <TagsInputInput placeholder="Важно..." />
            </TagsInput>
          </div>
          <Alert variant="destructive" v-if="state.updateTaskStatus === STATUS.ERROR">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription> {{ state.error }} </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button
            :disabled="state.updateTaskStatus === STATUS.LOADING"
            type="submit"
            @click="onSubmit"
          >
            <Loader2
              class="w-4 h-4 mr-2 animate-spin"
              v-if="state.updateTaskStatus === STATUS.LOADING"
            />
            Редактировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </TableCell>
</template>
