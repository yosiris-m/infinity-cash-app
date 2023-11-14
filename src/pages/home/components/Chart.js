import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Dinero from "dinero.js";

export default function Chart({ data }) {
  const element = [
    { name: "Ingresos", value: data.income },
    { name: "Gastos", value: data.expenses },
    { name: "Total", value: data.balance },
  ];

  const COLORS = ["#218814", "#dc3545", "#b4b9b2de"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const formattedValue = Dinero({
      amount: data[Object.keys(data)[index]],
      currency: "EUR",
    })
      .setLocale("es-ES")
      .toFormat();

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${formattedValue} `}
      </text>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="30%">
        <PieChart width={400} height={400}>
          <Pie
            data={element}
            dataKey="value"
            nameKey="name"
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={50}
            labelLine={false}
          >
            {element.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
