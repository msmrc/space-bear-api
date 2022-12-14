/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface FillProfileMinimumDTOInterface {
	userId: string;
	firstName: string; // имя
	secondName: string; // фамилия
	lastName: string; // отчество
	birthDate: string; // дата рождения
	country: string; // страна
	city: string; // город
	citizenship: string; // гражданство
	gender: string; // пол
	skillInformation: SkillInformationInterface[]; // информация по скиллам*********
	interestedTags: string[]; // что интересно (vr / ml / экология)
	experience: string; // уровень
	aboutDescription: string; // о себе
}

export interface SkillInformationInterface {
	category: string; // категории (Роль в команде) (Frontend, Manager, Backend и тд)
	skills: string[]; // умения (Python, c#, javascript, excel и тд)
	experience: string;
}

export interface FullUserInterface {
	userId: string;
	firstName: string; // имя
	secondName: string; // фамилия
	lastName: string; // отчество
	birthDate: string; // дата рождения
	country: string; // страна
	city: string; // город
	citizenship: string; // гражданство
	gender: string; // пол
	skillInformation: SkillInformationInterface[]; // информация по скиллам*********
	interestedTags: string[]; // что интересно (vr / ml / экология)
	experience: string; // уровень
	aboutDescription: string; // о себе
}