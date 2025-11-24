import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

interface FolderSizeChartProps {
  data: { fullPath: string; name: string; size: number }[];
}

export const FolderSizeChart = ({ data }: FolderSizeChartProps) => (
  <>
    <h4>フォルダ別サイズ (KB)</h4>
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={data}
        dataKey="size"
        nameKey="name"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={({ x, y, width, height, name }) => {
          const fontSize = 12;
          const charWidth = fontSize * 0.6;
          const maxChars = Math.floor((width - 10) / charWidth);
          const displayName =
            name && name.length > maxChars
              ? `${name.slice(0, Math.max(0, maxChars - 3))}...`
              : name;

          return (
            <g>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#8884d8"
                stroke="#fff"
              />
              {width > 30 && height > 20 && displayName && (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={fontSize}
                >
                  {displayName}
                </text>
              )}
            </g>
          );
        }}
      >
        <Tooltip
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            const data = payload[0].payload;
            return (
              <div
                style={{
                  background: "#333",
                  padding: "8px",
                  borderRadius: "4px",
                  color: "#fff",
                }}
              >
                <div>{data.fullPath}</div>
                <div>{data.size} KB</div>
              </div>
            );
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  </>
);
