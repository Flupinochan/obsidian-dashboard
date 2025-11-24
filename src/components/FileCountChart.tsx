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

interface FileCountChartProps {
  data: { month: string; monthly: number; cumulative: number }[];
}

export const FileCountChart = ({ data }: FileCountChartProps) => (
  <>
    <h4>ファイル作成数（月別 + 累積）</h4>
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
          fill="#8884d8"
          name="月別（左軸）"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#6860d8"
          name="累積（右軸）"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </>
);
