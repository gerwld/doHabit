import { memo } from 'react';
import { Heatmap } from '@components';
import { useCurrentTheme } from 'hooks';


// Heatmap part

const HeatmapYear = memo(({ habitID, itemColor }) => {
    const [themeColors] = useCurrentTheme();
  
    return (
      <Heatmap
        itemID={habitID}
        color={themeColors.textColorHighlight}
        backgroundDay={themeColors.dayGraphColor}
        backgroundActiveDay={itemColor}
      />
    )
  })
  

  export default HeatmapYear;