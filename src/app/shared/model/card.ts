import { ActivityType, Form, Involvement, Day } from '../enums';

export interface Card {
	activityType: ActivityType,
	formLevel: Form,
	title: string,
	daysPerWeek: number,
	day: Day,
	duration: number,
	teacherInvolvement: Involvement,
	conflict?: boolean,
}
