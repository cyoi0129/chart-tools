import { FC, useEffect, useState } from 'react';
import { AiFillPieChart, AiFillSetting } from 'react-icons/ai';
import { MdTitle, MdLabelOutline, MdOutlineOpenInNew, MdOutlineStickyNote2, MdGroup } from 'react-icons/md';
import { FaCopyright } from 'react-icons/fa';
import { BsTable } from 'react-icons/bs';
import { ChartOptionType, ModalProps } from '../app/types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectChartData, setChartOptionSlice, setChartMemoSlice } from '../features/ChartData';

const OptionInput: FC<ModalProps> = (props) => {
  const { action } = props;
  const dispatch = useAppDispatch();
  const chartStore = useAppSelector(selectChartData);
  const [type, setType] = useState<'LineChart' | 'ColumnChart' | 'PieChart' | 'ComboChart' | 'Table'>(chartStore.option ? chartStore.option.type : 'LineChart');
  const [title, setTitle] = useState<string>(chartStore.option ? chartStore.option.title : '');
  const [subtitle, setSubTitle] = useState<string>(chartStore.option ? chartStore.option.subtitle : '');
  const [credit, setCredit] = useState<string>(chartStore.option ? chartStore.option.credit : '');
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [xUnit, setXUnit] = useState<string>(chartStore.option ? chartStore.option.xUnit : '');
  const [yUnit, setYUnit] = useState<string>(chartStore.option ? chartStore.option.yUnit : '');
  const [tStart, setTStart] = useState<number>(0);
  const [tEnd, setTEnd] = useState<number>(0);
  const [tFocus, setTFocus] = useState<number[]>([]);
  const [barGroup, setBarGroup] = useState<boolean>(chartStore.option ? chartStore.option.barGroup : false);
  const [showTotal, setShowTotal] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(chartStore.isPublic);
  const [note, setNote] = useState<string>(chartStore.note);

  const changeType = (value: string): void => {
    // Control type change event
    if (value === 'LineChart' || value === 'ColumnChart' || value === 'PieChart' || value === 'ComboChart' || value === 'Table') setType(value);
  };

  useEffect(() => {
    // Any option change will be directly sent to data store
    const options: ChartOptionType = {
      type: type,
      title: title,
      subtitle: subtitle,
      credit: credit,
      min: min,
      max: max,
      xUnit: xUnit,
      yUnit: yUnit,
      tStart: tStart,
      tEnd: tEnd,
      tFocus: tFocus,
      barGroup: barGroup,
      showTotal: showTotal,
    };
    dispatch(setChartOptionSlice(options));
  }, [type, title, subtitle, credit, min, max, xUnit, yUnit, tStart, tEnd, tFocus, barGroup, showTotal]);

  useEffect(() => {
    // public policy & note change will be directly sent to data store
    dispatch(setChartMemoSlice({ note: note, isPublic: isPublic }));
  }, [note, isPublic]);

  useEffect(() => {
    // Init status
    if (chartStore.option) {
      setType(chartStore.option.type);
      setTitle(chartStore.option.title);
      setSubTitle(chartStore.option.subtitle);
      setCredit(chartStore.option.credit);
      if (chartStore.option.min) setMin(chartStore.option.min);
      if (chartStore.option.max) setMax(chartStore.option.max);
      if (chartStore.option.xUnit) setXUnit(chartStore.option.xUnit);
      if (chartStore.option.yUnit) setYUnit(chartStore.option.yUnit);
      if (chartStore.option.tStart) setTStart(chartStore.option.tStart);
      if (chartStore.option.tEnd) setTEnd(chartStore.option.tEnd);
      if (chartStore.option.tFocus) setTFocus(chartStore.option.tFocus);
      if (chartStore.option.barGroup) setBarGroup(chartStore.option.barGroup);
      if (chartStore.option.showTotal) setShowTotal(chartStore.option.showTotal);
    }
    setNote(chartStore.note);
    setIsPublic(chartStore.isPublic);
  }, []);

  return (
    <div className="option_area">
      <dl className="option_form">
        <dt>
          <AiFillPieChart />
          グラフの種類
        </dt>
        <dd>
          <select onChange={(e) => changeType(e.target.value)} className="full_form" name="type" value={type}>
            <option value="LineChart">折れ線グラフ</option>
            <option value="ColumnChart">棒グラフ</option>
            <option value="PieChart">円グラフ</option>
            <option value="ComboChart">複合グラフ</option>
            <option value="Table">表組み</option>
          </select>
        </dd>
        <dt>
          <MdTitle />
          グラフのタイトル
        </dt>
        <dd>
          <input className="full_form" type="text" name="title" placeholder="タイトルを入力" value={title} autoComplete="off" onChange={(e) => setTitle(e.target.value)} />
        </dd>
        <dt>
          <MdTitle />
          グラフのサブタイトル
        </dt>
        <dd>
          <input className="full_form" type="text" name="subtitle" placeholder="サブタイトルを入力" value={subtitle} autoComplete="off" onChange={(e) => setSubTitle(e.target.value)} />
        </dd>
        <dt>
          <FaCopyright />
          著作権
        </dt>
        <dd>
          <input className="full_form" type="text" name="subtitle" placeholder="クレジットを入力" value={credit} autoComplete="off" onChange={(e) => setCredit(e.target.value)} />
        </dd>
        <dt>
          <MdLabelOutline />
          グラフのラベル
        </dt>
        <dd>
          <input className="half_form" type="text" name="xunit" placeholder="横軸単位" value={xUnit} autoComplete="off" onChange={(e) => setXUnit(e.target.value)} />
          <input className="half_form" type="text" name="yunit" placeholder="縦軸単位" value={yUnit} autoComplete="off" onChange={(e) => setYUnit(e.target.value)} />
          {/* <input
            className="quarter_form"
            type="text"
            name="min"
            placeholder="最小値"
            value={String(min)}
            autoComplete="off"
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            className="quarter_form"
            type="text"
            name="max"
            placeholder="最大値"
            value={String(max)}
            autoComplete="off"
            onChange={(e) => setMax(Number(e.target.value))}
          /> */}
        </dd>
        {type === 'Table' ? (
          <>
            <dt>
              <BsTable />
              表組みの設定
            </dt>
            <dd className="left_line">
              <input className="half_form" type="text" name="start" placeholder="Start Line" value={String(tStart)} autoComplete="off" onChange={(e) => setTStart(Number(e.target.value))} />
              <input className="half_form" type="text" name="end" placeholder="End Line" value={String(tEnd)} autoComplete="off" onChange={(e) => setTEnd(Number(e.target.value))} />
            </dd>
          </>
        ) : null}
        <dt>
          <AiFillSetting />
          そのたの設定
        </dt>
        <dd className="left_line">
          {type === 'ColumnChart' ? (
            <>
              <input type="checkbox" id="barGroup" name="barGroup" checked={barGroup} onChange={(e) => setBarGroup(e.target.checked)} />
              <span>
                <label htmlFor="barGroup">棒グラフの積み重ね</label>
              </span>
            </>
          ) : null}
          {type === 'PieChart' ? (
            <>
              <input type="checkbox" id="showTotal" name="showTotal" checked={showTotal} onChange={(e) => setShowTotal(e.target.checked)} />
              <span>
                <label htmlFor="showTotal">円グラフの合計値表示</label>
              </span>
            </>
          ) : null}
        </dd>

        <dt>
          <MdGroup />
          グラフの権限
        </dt>
        <dd className="left_line">
          <input type="checkbox" id="isPublic" name="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          <span>
            <label htmlFor="isPublic">共有グラフ</label>
          </span>
        </dd>

        <dt>
          <MdOutlineStickyNote2 />
          備考欄
        </dt>
        <dd>
          <textarea className="full_form" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
        </dd>
      </dl>
      <h4 onClick={action}>
        データの入力
        <MdOutlineOpenInNew />
      </h4>
    </div>
  );
};
export default OptionInput;
