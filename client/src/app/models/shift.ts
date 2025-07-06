export interface Shift {
  id:string;
  name : string;
  shiftMinute: number;
  startTime : string;
  endTime : string;
}

export interface CreateShiftRequest {
  name : string;
  shiftMinute: number;
  startTime : string;
  endTime : string;
}
