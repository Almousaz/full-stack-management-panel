import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../../theme';

const BarChart = ({ isDashboard = false, chartData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const safeData =
    chartData && chartData.length > 0
      ? chartData
      : [
          {
            category: 'empty',
            value: 0,
          },
        ];

  return (
    <ResponsiveBar
      data={safeData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
      }}
      colors={(bar) => {
        const cat = bar.data.category;

        if (cat === 'Users') return colors.greenAccent[400];
        if (cat === 'Assets') return colors.blueAccent[400];
        if (cat === 'WorkOrders') return colors.redAccent[400];

        return colors.grey[300];
      }}
      keys={['value']}
      indexBy='category'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      enableLabel={false}
      axisBottom={{
        legend: isDashboard ? undefined : 'Category',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        legend: isDashboard ? undefined : 'Count',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
    />
  );
};

export default BarChart;
