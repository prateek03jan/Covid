export class PersonDetails {
    id?: string;
    adhaarNo?: string;
    fName?: string;
    lName?: string;
    associateId?: string;
    personId?: string;
    designation?: string;
    temperature?: Temperature;
    officeLocation?: string;
}

export class Temperature {
    maxTemp?: number;
    currentTemp?: number;
}

export class CovidInfo {
    adhaarNo?: string;
    covidDetails?: CovidDetails;
}

export class CovidDetails {
    vaccinationInfoList?: Array<VaccinationInfo>;
    covidHistory?: Array<CovidHistoryInfo>;
}

export class CovidHistoryInfo {
    status?: string;
    description?: string;
    date?: Date;
}

export class VaccinationInfo {
    dose?: number;
    hospitalName?: string;
    vaccinationDate?: Date;
}

export class PersonInformation {
    personDetails?: PersonDetails;
    covidInfo?: CovidInfo;
}

export class PersonRegistration {
    adhaarNo?: string;
    fName?: string;
    lName?: string;
    associateId?: string;
    image?: string;
}