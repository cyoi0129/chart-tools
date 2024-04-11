import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BiSolidTime } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ChartListItemProps } from '../app/types';
import { deleteChart, selectChartById } from '../features/ChartList';
import { setChartItemSlice } from '../features/ChartData';

const ChartListItem: FC<ChartListItemProps> = (props) => {
  const { id, name, author, isPublic, created, note } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const targetChart = useAppSelector(selectChartById(String(id)));

  const removeItem = (): void => {
    dispatch(deleteChart(String(id)));
  };

  const go2Chart = (): void => {
    dispatch(setChartItemSlice(targetChart));
    navigate(`/chart/${id}`);
  };
  
  return (
    <li className="chart_list_item">
      <div onClick={go2Chart}>
        <h4>{name}</h4>
        <div className="meta">
          <p>
            <FaUserAlt />
            {author.substr(0, author.indexOf('@'))}
          </p>
          <p>
            <BiSolidTime />
            {created}
          </p>
        </div>
        <div className="note">
          <p>{note}</p>
        </div>
      </div>
      {isPublic ? null : (
        <div className="remove" onClick={removeItem}>
          <RiDeleteBin5Line />
        </div>
      )}
    </li>
  );
};

export default ChartListItem;
