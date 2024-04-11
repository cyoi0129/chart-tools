/** Data */
export interface ChartValueType {
  value: string;
}

export type ChartLineType = ChartValueType[];

export type ChartDataType = ChartLineType[];

/** Chart Options */
export interface ChartOptionType {
  type: "LineChart" | "ColumnChart" | "PieChart" | "ComboChart" | "Table";
  title: string;
  subtitle: string;
  credit: string;
  min: number;
  max: number;
  xUnit: string;
  yUnit: string;
  tStart: number;
  tEnd: number;
  tFocus: number[];
  barGroup: boolean;
  showTotal: boolean;
}

/** Google Chart Options */
export interface GoogleChartOption {
  option: PieChartOption | LineChartOption | BarChartOption | ComboChartOption
}

export interface PieChartOption {
  pieHole: 0.4;
  pieSliceText: "value";
}

export interface LineChartOption {
  vAxis: { title: string};
  hAxis: { title: string};
}

export interface BarChartOption {
  vAxis: { title: string};
  hAxis: { title: string};
  isStacked: boolean;
}

export interface ComboChartOption {
  vAxis: { title: string};
  hAxis: { title: string};
  seriesType: "bars";
  series: { 1: { type: "line" } };
}

/** Chart Item */
export interface ChartItemDataType {
  name: string;
  author: string;
  isPublic: boolean;
  created: string;
  note: string;
  data: ChartDataType;
  option: ChartOptionType | null;
}

export interface ChartItemType extends ChartItemDataType {
  id: string | null;
}

/** Common */
export interface ImageType {
  name: string;
  url: string;
}

export interface UserDataType {
  user: string;
  password: string;
}

/** Props */
export interface ChartListItemProps {
  id: string | null;
  name: string;
  author: string;
  isPublic: boolean;
  created: string;
  note: string;
}

export interface ModalProps {
  action?: any;
}

/** Store */
export interface ChartListStore {
  updated: boolean;
  error: boolean;
  charts: ChartItemType[];
}

export interface ChartDataStore extends ChartItemType {
  updated: boolean;
  error: boolean;
}

export interface UserStore {
  login: boolean;
  error: boolean;
  user: string;
}