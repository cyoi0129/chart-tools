import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { saveAsImage } from '../app/func';
import { ChartItemType } from '../app/types';
import { DataInput, ChartView, OptionInput, TableView } from '../components';
import { selectChartData, reviseChart, addChart, setChartItemSlice } from '../features/ChartData';
import { updateChartSlice, addChartSlice, selectChartList } from '../features/ChartList';

const Chart: FC = () => {
  const { chartID } = useParams();
  const dispatch = useAppDispatch();
  const listStore = useAppSelector(selectChartList);
  const chartStore = useAppSelector(selectChartData);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<'LineChart' | 'ColumnChart' | 'PieChart' | 'ComboChart' | 'Table'>('LineChart');
  const [showModal, setShowModal] = useState<boolean>(false);
  const changeModalStatus = (show: boolean) => {
    setShowModal(show);
  };

  const save2DB = (): void => {
    // Save chart will automatically check the status should be add or update, not only save to data store, and also refresh list store
    const data: ChartItemType = {
      id: chartStore.id,
      name: chartStore.name,
      author: chartStore.author,
      isPublic: chartStore.isPublic,
      created: chartStore.created,
      note: chartStore.note,
      data: chartStore.data,
      option: chartStore.option,
    }
    if (chartID === 'new') {
      setLoading(true);
      dispatch(addChart(data));
      dispatch(addChartSlice(data));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
      dispatch(reviseChart(data));
      dispatch(updateChartSlice(data));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const saveImage = (): void => {
    // Call method to save image to local machine, could customize file name and format here
    const target = document.getElementById('chart_image');
    if (!target) return;
    html2canvas(target).then((canvas) => {
      const targetImgUri = canvas.toDataURL('img/png');
      saveAsImage(targetImgUri);
    });
  };

  useEffect(() => {
    // Init chart/table view trigger by id
    if (chartStore.option) setType(chartStore.option.type);
  }, [chartID]);

  return (
    <div className="chart_page">
      <aside>
        <OptionInput action={() => changeModalStatus(true)} />
      </aside>
      {showModal ? <DataInput action={() => changeModalStatus(false)} /> : null}
      <section className="chart_area">
        <h2>グラフ作成ツール</h2>
        {type === 'Table' ? <TableView /> : <ChartView />}
        <div className="save_image">
          <button onClick={save2DB}>グラフを保存</button>
          <button onClick={saveImage}>ダウンロード</button>
        </div>
      </section>
      {loading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
    </div>
  );
};
export default Chart;
