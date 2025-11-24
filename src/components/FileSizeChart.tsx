import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface FileSizeChartProps {
  data: { month: string; monthly: number; cumulative: number }[];
}

export const FileSizeChart = ({ data }: FileSizeChartProps) => (
  <>
    <h4>ファイルサイズ (KB)（月別 + 累積）</h4>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="monthly"
          fill="#82ca9d"
          name="月別（左軸）"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#52a36d"
          name="累積（右軸）"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </>
);
