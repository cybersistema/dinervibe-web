import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  positive: '#2d5a3d',
  neutral: '#c9a227',
  negative: '#722f37',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-lg px-3 py-2">
        <p className="text-sm font-medium text-charcoal-900">{data.name}</p>
        <p className="text-sm text-charcoal-600">{data.value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-charcoal-600">
            {entry.value}: {entry.payload.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default function SentimentPieChart({ sentiment, className = '' }) {
  const data = [
    { name: 'Positive', value: sentiment.positive, color: COLORS.positive },
    { name: 'Neutral', value: sentiment.neutral, color: COLORS.neutral },
    { name: 'Negative', value: sentiment.negative, color: COLORS.negative },
  ];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
