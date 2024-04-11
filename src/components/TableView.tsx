import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { convertData } from '../app/func';
import { selectChartData } from '../features/ChartData';

const TableView: FC = () => {
  const chartStore = useAppSelector(selectChartData);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubitle] = useState<string>('');
  const [credit, setCredit] = useState<string>('');
  const [data, setData] = useState<Array<string | number>[]>([]);

  useEffect(() => {
    // Convert data from input to table format required, set data, options & other elements
    if (chartStore.data) setData(convertData(chartStore.data));
    if (chartStore.option) {
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
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {data[0].map((item, i) => (
                  <th key={`th${i}`}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((line, l) =>
                l === 0 ? null : (
                  <tr key={l}>
                    {line.map((item, i) => (
                      <td key={`td-l${l}-i${i}`}>{i === 0 ? item : Number(item).toLocaleString()}</td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}
        {credit ? <p className="credit">{credit}</p> : null}
      </div>
    </div>
  );
};

export default TableView;
