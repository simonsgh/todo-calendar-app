import { getWeekStart } from '../utils/dates';

class ConfigService {
  static storage = window.localStorage;
  static WEEK_START_KEY = 'weekStart';

  static setWeekStart(date: Date) {
    this.storage.setItem(this.WEEK_START_KEY, date.toISOString());
  }

  static getWeekStart(): Date {
    const weekStart = this.storage.getItem(this.WEEK_START_KEY);
    if (weekStart) {
      return new Date(weekStart);
    }

    return getWeekStart();
  }
}

export default ConfigService;
