interface LineChartData {
  name:string;
  series: LineChartDataSerie[]
}

interface LineChartDataSerie {
  value: number;
  name: string
}

export {
  LineChartData,
  LineChartDataSerie
}