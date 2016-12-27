import { ActivityType, Form, Involvement } from '../enums';

export interface Card {
	activityType: ActivityType,
	formLevel: Form,
	title: string,
	daysPerWeek: number,
	duration: number,
	teacherInvolvement: Involvement,
}
