<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { ITask } from '@/types/task'
import TaskTableItem from './TaskTableItem.vue'

interface ITaskTableProps {
  tasks: ITask[]
}

const props = defineProps<ITaskTableProps>()
</script>

<template>
  <Table>
    <TableCaption>Задачи</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> Номер </TableHead>
        <TableHead>Название</TableHead>
        <TableHead>Описание</TableHead>
        <TableHead> Метки </TableHead>
        <TableHead> Дата выполнения задачи </TableHead>
        <TableHead> Действия </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasks" :key="task._id">
        <TaskTableItem :task="task" />
      </TableRow>
    </TableBody>
  </Table>
</template>
