
export interface Workshop {
  id:string;
  name: string;
  workerCount : number;
}

export interface CreateWorkshopRequest {
  name: string;
  workerCount: number;
}
