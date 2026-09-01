import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS = { fontSize: 11, fill: "#64748b" };
const GRID = "#e2e8f0";
const BLUE = "#2563eb";
const BLUE_SOFT = "#3b82f6";

const tooltipStyle = {
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 13,
  boxShadow: "0 8px 24px rgba(15,23,42,.08)",
};

export function AttendanceTrendChart({ data, height = 190 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis
          domain={[80, 100]}
          tick={AXIS}
          axisLine={false}
          tickLine={false}
          width={48}
          unit="%"
        />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Attendance"]} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={BLUE}
          strokeWidth={2.5}
          dot={{ r: 3, fill: BLUE }}
          activeDot={{ r: 5 }}
          animationDuration={900}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FeeCollectionChart({ data, height = 190 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="feeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE_SOFT} stopOpacity={0.35} />
            <stop offset="100%" stopColor={BLUE_SOFT} stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis
          tick={AXIS}
          axisLine={false}
          tickLine={false}
          width={48}
          unit="%"
          domain={[0, 100]}
        />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Collected"]} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={BLUE}
          strokeWidth={2.5}
          fill="url(#feeFill)"
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SubjectPerformanceChart({ data, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 12, bottom: 4 }}
        barCategoryGap={14}
      >
        <CartesianGrid stroke={GRID} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={AXIS}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="subject"
          tick={AXIS}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Score"]} />
        <Bar dataKey="score" radius={[0, 6, 6, 0]} animationDuration={900}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 ? BLUE_SOFT : BLUE} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AdmissionsFunnelChart({ data, height = 260 }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="funnel">
      {data.map((row, i) => (
        <div className="funnel__row" key={row.stage}>
          <span className="funnel__stage">{row.stage}</span>
          <div className="funnel__track">
            <div
              className="funnel__bar"
              style={{
                width: `${(row.value / max) * 100}%`,
                opacity: 1 - i * 0.11,
              }}
            >
              <span>{row.value.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MiniBars({ data, color = BLUE, height = 60 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="value" radius={[3, 3, 0, 0]} fill={color} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LeadsByMonthChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v, "Demo requests"]} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} fill={BLUE} animationDuration={900} />
      </BarChart>
    </ResponsiveContainer>
  );
}
