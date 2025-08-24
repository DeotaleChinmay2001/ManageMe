export type WeightEntry = {
  id?: number;         // from DB
  date: string;
  weight: number;
  imageUri?: string | null;
};

export type MeasurementEntry = {
  id?: number;         // from DB
  date: string;
  chest?: number | null;
  waist?: number | null;
  height?: number | null;
  biceps?: number | null;
  shoulder?: number | null;
  neck?: number | null;
  butt?: number | null;
};
