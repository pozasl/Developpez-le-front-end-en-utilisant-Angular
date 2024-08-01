interface PieChartData {
  name: string;
  value: number;
  extra: PieChartExtraData
}

interface PieChartExtraData {
  id:number;
}

export {
  PieChartData,
  PieChartExtraData
}