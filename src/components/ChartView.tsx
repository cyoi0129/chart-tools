import { FC, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useAppSelector } from '../app/hooks';
import { selectChartData } from '../features/ChartData';
import { PieChartOption, LineChartOption, BarChartOption, ComboChartOption } from '../app/types';
import { convertData, convertOption } from '../app/func';

const ChartView: FC = () => {
  const chartStore = useAppSelector(selectChartData);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubitle] = useState<string>('');
  const [credit, setCredit] = useState<string>('');
  const [type, setType] = useState<'LineChart' | 'ColumnChart' | 'PieChart' | 'ComboChart' | 'Table'>('LineChart');
  const [data, setData] = useState<Array<string | number>[]>([]);
  const [option, setOption] = useState<PieChartOption | LineChartOption | BarChartOption | ComboChartOption>();

  useEffect(() => { // Convert data & options from input to Google Chart format required, set data, options & other elements
    if (chartStore.data) setData(convertData(chartStore.data));
    if (chartStore.option) {
      const chartOption = convertOption(chartStore.option).option;
      if (chartOption) setOption(chartOption); 
      setType(chartStore.option.type);
      setTitle(chartStore.option.title);
      setSubitle(chartStore.option.subtitle);
      setCredit(chartStore.option.credit);
    }
  }, [chartStore]);

  return (
    <div className="chart_image">
      <div id="chart_image">
        {title ? <h3>{title}</h3> : null}
        {subtitle ? <h4>{subtitle}</h4> : null}
        <Chart chartType={type} data={data} options={option} width={'100%'} height={'400px'} />
        {credit ? <p className="credit">{credit}</p> : null}
      </div>
    </div>
  );
};

export default ChartView;
