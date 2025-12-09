import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const grey = colors.grey || {};

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      theme={{
        legends: {
          text: {
            fill: grey[100] || '#fff',
          },
        },
      }}
      arcLinkLabelsTextColor={grey[100] || '#fff'}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: grey[100] || '#fff',
          symbolSize: 18,
        },
      ]}
    />
  );
};

export default PieChart;
