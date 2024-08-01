/*
{
    "name": "France",
    "series": [
      {
        "value": 10,
        "name": "2016-09-23T11:04:06.645Z"
      }
    ]
  }
*/


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