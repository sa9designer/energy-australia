export interface MusicFestival {
  name: string;
  bands: Band[];
}

export interface Band {
  name: string;
  recordLabel: string;
}

export interface RecordLabel {
  recordLabel?: {
    name?: string;
    bandDetails: Festival[];
  };
}
export interface Festival {
  bands: string[];
  festivals: string;
}
