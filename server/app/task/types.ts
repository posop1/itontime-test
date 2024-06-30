export interface ICreateTaskBody {
	title: string;
	description: string;
	tags?: string[];
	endDate?: Date;
}

export interface IUpdateTaskBody {
	title?: string;
	description?: string;
	tags?: string[];
	endDate?: Date;
}
