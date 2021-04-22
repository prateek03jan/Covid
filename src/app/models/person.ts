export class PersonDetails {
    adhaarNo?: string;
    fName?: string;
    id?: string;
    lName?: string;
    personId?: string;
    designation?: string;
    associateId?: string;
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
