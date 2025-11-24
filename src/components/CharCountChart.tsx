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

interface CharCountChartProps {
  data: { month: string; monthly: number; cumulative: number }[];
}

export const CharCountChart = ({ data }: CharCountChartProps) => (
  <>
    <h4>文字数（月別 + 累積）</h4>
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
          fill="#ffc658"
          name="月別（左軸）"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#e6a800"
          name="累積（右軸）"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </>
);
