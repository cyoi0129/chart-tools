import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ChartListItemProps } from '../app/types';
import { ChartListItem } from '../components';
import { IoMdAddCircle } from 'react-icons/io';
import { MdGroups, MdLockPerson } from 'react-icons/md';
import { selectUserData } from '../features/UserData';
import { setChartItemSlice } from '../features/ChartData';
import { selectChartList, getChartList } from '../features/ChartList';

const Charts: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listStore = useAppSelector(selectChartList);
  const userStore = useAppSelector(selectUserData);
  const [publics, setPublics] = useState<ChartListItemProps[]>([]);
  const [privates, setPrivates] = useState<ChartListItemProps[]>([]);

  const newChartData = {  // Here an init data for new chart create
    id: null,
    author: userStore.user,
    name: '',
    created: new Date().toLocaleDateString().replace(/\//g, '-'),
    note: '',
    isPublic: false,
    data: [
      [{ value: 'Sample Data' }, { value: 'Sales' }, { value: 'Profit' }],
      [{ value: 'Company A' }, { value: '5678' }, { value: '1234' }],
      [{ value: 'Company B' }, { value: '8765' }, { value: '4321' }],
    ],
    option: null,
  };

  const addChart = (): void => {  // Set init chart data to data store to prevent dom error
    dispatch(setChartItemSlice(newChartData));
    navigate('/chart/new');
  };

  useEffect(() => { // Get list from list store and seperate them to public and private list group
    const public_list = listStore.charts.filter((item) => item.isPublic);
    const private_list = listStore.charts.filter((item) => item.author === userStore.user && !item.isPublic);
    setPublics(public_list);
    setPrivates(private_list);
  }, [listStore]);
  useEffect(() => {
    dispatch(getChartList());
  }, []);

  return (
    <>
      <section className="chart_list_area">
        <h2>グラフ一覧</h2>
        <div className="chart_list_box">
          <h3>
            <MdGroups />
            共有グラフ一覧
          </h3>
          <ul>
            {publics.length > 0
              ? publics.map((item, index) => <ChartListItem key={index} id={item.id} author={item.author} name={item.name} isPublic={item.isPublic} created={item.created} note={item.note} />)
              : null}
          </ul>
        </div>
        <div className="chart_list_box">
          <h3>
            <MdLockPerson />
            所有グラフ一覧
          </h3>
          <ul>
            {privates.length > 0
              ? privates.map((item, index) => <ChartListItem key={index} id={item.id} author={item.author} name={item.name} isPublic={item.isPublic} created={item.created} note={item.note} />)
              : null}
          </ul>
        </div>
      </section>
      <div className="float_icon" onClick={addChart}>
        <IoMdAddCircle />
      </div>
    </>
  );
};
export default Charts;
