export enum Segmentation {
  debt = 'debt',
  segment_1 = 'segment 1',
  segment_2 = 'segment 2',
  segment_3 = 'segment 3'
}

export enum Decision {
  positive = 'positive',
  negative = 'negative'
}

export interface Person {
  id: number
  personalCode: string
  segmentation: Segmentation
}
