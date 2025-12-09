import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const safeData =
    data && data.length > 0
      ? data
      : [
          {
            id: 'empty',
            data: [
              { x: 'no', y: 0 },
              { x: 'data', y: 0 },
            ],
          },
        ];

  return (
    <ResponsiveLine
      data={safeData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100] },
            text: { fill: colors.grey[100] },
          },
          legend: { text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { color: colors.primary[400] } },
      }}
      colors={{ scheme: 'category10' }}
      margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      curve='catmullRom'
      enablePoints={true}
      pointSize={8}
      axisBottom={{
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        legend: 'Count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
        },
      ]}
    />
  );
};

export default LineChart;
