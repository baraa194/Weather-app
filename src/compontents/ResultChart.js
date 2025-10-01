import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function ResultChart({ data }) {
  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  if (!chartData.length) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">Probability Overview</h6>
        <ResponsiveContainer width="70%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" fontSize={10} />
            <YAxis fontSize={10} />
          
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            <Bar dataKey="value" fill="#000080" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


