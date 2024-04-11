import { FC } from 'react';

const Reference: FC = () => {
  return (
    <section className="static_page_area reference_page">
      <h2>グラフライブラリー一覧</h2>
      <ul className="chart_reference">
        <li>
          <a href="https://www.react-google-charts.com/examples" target="_blank">
            Google Charts
          </a>
        </li>
        <li>
          <a href="https://recharts.org/en-US/examples" target="_blank">
            ReCharts
          </a>
        </li>
        <li>
          <a href="https://react-charts.tanstack.com/examples/simple" target="_blank">
            React Charts
          </a>
        </li>
        <li>
          <a href="https://apexcharts.com/react-chart-demos/" target="_blank">
            ApexCharts
          </a>
        </li>
        <li>
          <a href="https://formidable.com/open-source/victory/gallery/" target="_blank">
            Victory
          </a>
        </li>
        <li className="normal">
          <a href="https://charts.ant.design/en/examples" target="_blank">
            Ant Charts
          </a>
        </li>
        <li className="normal">
          <a href="https://bizcharts.taobao.com/product/BizCharts4/gallery" target="_blank">
            Biz Charts
          </a>
        </li>
        <li className="hard">
          <a href="https://www.chartjs.org/docs/latest/samples/information.html" target="_blank">
            Chart.js
          </a>
        </li>
        <li className="hard">
          <a href="https://echarts.apache.org/examples/en/" target="_blank">
            ECharts
          </a>
        </li>
        <li className="hard">
          <a href="https://airbnb.io/visx/gallery" target="_blank">
            Visx
          </a>
        </li>
        <li className="hard">
          <a href="https://nivo.rocks/storybook/" target="_blank">
            Nivo
          </a>
        </li>
      </ul>
      <p>
        <a href="https://zenn.dev/leftletter/articles/cdf3d30b74718c" target="_blank">
          紹介記事
        </a>
      </p>
    </section>
  );
};
export default Reference;
