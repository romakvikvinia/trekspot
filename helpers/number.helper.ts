export const formatPercentage = (percent: number, format = 10): number =>
  percent ? Math.round((percent + Number.EPSILON) * format) / format : 0;
