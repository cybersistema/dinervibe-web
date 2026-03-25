import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-lg px-4 py-3">
        <p className="text-sm font-medium text-charcoal-900">{label}</p>
        <div className="mt-1 space-y-1">
          <p className="text-sm text-charcoal-600">
            <span className="text-burgundy-900 font-medium">{payload[0].value}</span> reviews
          </p>
          {payload[1] && (
            <p className="text-sm text-charcoal-600">
              Avg rating: <span className="text-gold-600 font-medium">{payload[1].value.toFixed(1)}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function ReviewVolumeChart({ data, className = '' }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#722f37" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#722f37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e7e7e7"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6d6d6d', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6d6d6d', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="reviews"
            stroke="#722f37"
            strokeWidth={2}
            fill="url(#reviewGradient)"
            dot={{ fill: '#722f37', strokeWidth: 2, r: 4, stroke: '#faf7f2' }}
            activeDot={{ r: 6, stroke: '#722f37', strokeWidth: 2, fill: '#faf7f2' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
