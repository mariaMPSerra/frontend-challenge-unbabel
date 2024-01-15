export interface IItemType {
  id?: number | null
  text: string
  voice: string
}

export interface ItranscriptionsState {
  data: IItemType[] | []
  initialData: IItemType[] | []
}
