export interface ITask {
  _id: string
  number: number
  title: string
  description: string
  tags?: string[]
  endDate?: Date
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ITaskReq {
  title: string
  description: string
  tags?: string[]
  endDate?: Date
}
