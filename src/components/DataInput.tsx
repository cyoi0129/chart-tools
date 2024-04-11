import { FC, useEffect, useState } from 'react';
import Spreadsheet from 'react-spreadsheet';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ChartDataType, ModalProps } from '../app/types';
import { selectChartData, setChartDataSlice } from '../features/ChartData';

const DataInput: FC<ModalProps> = (props) => {
  const { action } = props;
  const dispatch = useAppDispatch();
  const chartStore = useAppSelector(selectChartData);
  const [data, setData] = useState<ChartDataType>([]);

  const changeChartData = (data: any): void => {  // Any little data change will be directly sent to data store and rebuild chart
    setData(data);
  };

  const closeModal = () => {
    dispatch(setChartDataSlice(data));
    action();
  }
  
  useEffect(() => {
    if (chartStore.data.length > 0) setData(chartStore.data);
  }, []);

  return (
    <div className="data_modal">
      <div className="close_modal" onClick={closeModal}>
        <AiFillCloseCircle />
      </div>
      <div className="data_area">
        <div className="spreadsheet">
          <Spreadsheet data={data} onChange={(data) => changeChartData(data)} />
        </div>
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </div>
  );
};
export default DataInput;
