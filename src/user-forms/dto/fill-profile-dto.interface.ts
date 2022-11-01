/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface FillProfileDTOInterface {
	firstName: string; // имя
	secondName: string; // фамилия
	lastName: string; // отчество
	birthDate: string; // дата рождения
	country: string; // страна
	city: string; // город
	citizenship: string; // гражданство
	gender: string; // пол
	contacts: { // контакты
		phone: string;
		email: string;
		vk: string;
		telegram: string;
		skype: string;
	},
	education: { // образование
		startDate: string; // дата обучения 
		startEnd: string; // дата конца
		speciality: string; // специальность
		universityName: string; // название ВУЗа
	},
	jobInformation: { // информация о работе 
		employment: string; // занятость (на сайте) - (по найму, на себя, без работы)
		jobExperience: string; // опыт работы (лет)
		achievements: string[]; // достижения / проф. опыт
	},
	skillInformation: { // информация по скиллам*********
		categories: string[]; // категории (Роль в команде) (Frontend, Manager, Backend и тд)
		skills: string[]; // умения (Python, c#, javascript, excel и тд)
	},
	intellectualProperty: { // информация об интеллектуальной собственности 
		isIntellectualPropertyAuthor: boolean; // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
		numberOfDocument: string; // номер документа
	},
	companyInformation: { // информация о компании
		isCompanyOwner: boolean; // есть компания?
		companyINN: string; // ИНН компании
	},
	hackathon: { // хакатоны и цифровые конкурсы / и тд
		countHackathons: string; // опыт участия в хаках, кол-во
		additional: { // резюме, портфолио, гитхаю и тд
			github: string;
			linkedin: string;
			cv: string; // резюме
		}
	},
	interestedTags: string[]; // что интересно (vr / ml / экология)
	experience: string; // уровень
	aboutDescription: string;
}
