import { ChartDataType, ChartLineType, ChartOptionType, GoogleChartOption } from './types';

/**
 * Create String Line Array
 * @param line 
 * @returns 
 */
const convertLine = (line: ChartLineType): string[] => {
  let result: string[] = [];
  if (line.length === 0) return [];
  line.map((item) => result.push(item.value));
  return result;
};

/**
 * Create String/Number Line Array
 * @param line 
 * @returns 
 */
const convertLineDig = (line: ChartLineType): Array<string | number> => {
  let result: Array<string | number> = [];
  if (line.length === 0) return [];
  line.map((item, index) => {
    if (index === 0) {
      result.push(item.value);
    } else {
      result.push(Number(item.value));
    }
  });
  return result;
};


/**
 * Create Column Data Array
 * @param data 
 * @returns 
 */
export const convertData = (data: ChartDataType): Array<string | number>[] => {
  let result: Array<string | number>[] = [];
  if (data.length === 0) return [];
  data.map((line, index) => {
    if (index === 0) {
      result.push(convertLine(line));
    } else {
      result.push(convertLineDig(line));
    }
  });
  return result;
};


/**
 * Convert Options to Google Chart Options
 * @param option 
 * @returns 
 */
export const convertOption = (option: ChartOptionType): GoogleChartOption => {
  let result: GoogleChartOption = {
    option: {
      pieHole: 0.4,
      pieSliceText: 'value',
    },
  };
  if (option.type === 'LineChart') {
    result.option = {
      vAxis: { title: option.xUnit ? option.xUnit : '' },
      hAxis: { title: option.yUnit ? option.yUnit : '' },
    };
  } else if (option.type === 'ColumnChart') {
    result.option = {
      vAxis: { title: option.xUnit ? option.xUnit : '' },
      hAxis: { title: option.yUnit ? option.yUnit : '' },
      isStacked: option.barGroup,
    };
  } else if (option.type === 'ComboChart') {
    result.option = {
      vAxis: { title: option.xUnit ? option.xUnit : '' },
      hAxis: { title: option.yUnit ? option.yUnit : '' },
      seriesType: 'bars',
      series: { 1: { type: 'line' } },
    };
  }

  return result;
};

/**
 * Download Image
 * @param uri 
 */
export const saveAsImage = (uri: string): void => {
  const downloadLink = document.createElement('a');
  if (typeof downloadLink.download === 'string') {
    downloadLink.href = uri;
    downloadLink.download = 'chart.png';  // ファイル名
    document.body.appendChild(downloadLink);  // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    downloadLink.click(); // ダウンロードリンクが設定された a タグをクリック
    document.body.removeChild(downloadLink);  // Firefox 対策で追加したリンクを削除しておく
  } else {
    window.open(uri);
  }
};
