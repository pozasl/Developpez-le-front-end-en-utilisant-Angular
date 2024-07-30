import { LineChartData, LineChartDataSerie } from "../models/LineChartData";
import { Olympic } from "../models/Olympic";
import { PieChartData } from "../models/PieChartData";

/**
 * Utility Class to manipulate Data
 */
export class DataUtil {
  /**
   * Convert Olympic model for the LineChart component 
   * @param olp Olympic model
   * @returns 
   */
  public static convertOlympicToLineChartData(olp: Olympic): LineChartData {
    return new Object({
      name: olp.country,
      series: olp.participations.map((p) => new Object({ name: p.year.toString(), value: p.medalsCount }) as LineChartDataSerie)
    }) as LineChartData;

  }

  /**
   * Convert Olympic model for the PieChart component 
   * @param olp Olympic model
   * @returns 
   */
  public static convertOlympicToPieChartData(olympic: Olympic): PieChartData {
    return Object.assign({
      name: olympic.country,
      value: olympic.participations.reduce((tot, current) => tot + current.medalsCount, 0),
      extra: { id: olympic.id }
    }) as PieChartData
  }
}