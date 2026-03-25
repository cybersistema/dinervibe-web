import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-lg px-3 py-2">
        <p className="text-sm font-medium text-charcoal-900">{label}</p>
        <p className="text-sm text-charcoal-600">{payload[0].value.toFixed(1)} / 5.0</p>
      </div>
    );
  }
  return null;
};

const getBarColor = (score) => {
  if (score >= 4.5) return '#2d5a3d';
  if (score >= 4.0) return '#3d6b4f';
  if (score >= 3.5) return '#7a8a2a';
  if (score >= 3.0) return '#b87333';
  return '#cc5500';
};

export default function CategoryBarChart({ scores, className = '' }) {
  const data = [
    { category: 'Food', score: scores.food },
    { category: 'Service', score: scores.service },
    { category: 'Atmosphere', score: scores.atmosphere },
    { category: 'Value', score: scores.value },
  ];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis
            type="number"
            domain={[0, 5]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6d6d6d', fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#2c2c2c', fontSize: 13, fontWeight: 500 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          <Bar
            dataKey="score"
            radius={[0, 6, 6, 0]}
            barSize={28}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
