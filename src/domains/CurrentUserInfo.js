export class CurrentUserInfo {
    constructor({
                    firstName = String(),
                    middleName = String(),
                    lastName = String(),
                    surName2 = String(),
                    email = String(),
                    phoneNumber = String(),
                    profile = String(),
                    document = String(),
                    identityDocument = String(),
                    partyCode = String(),
                    partyName = String(),
                    departmentCode = String(),
                    municipalityCode = String(),
                }) {
        this.firstName = firstName || undefined
        this.middleName = middleName || undefined
        this.lastName = lastName || undefined
        this.surName2 = surName2 || undefined
        this.email = email || undefined
        this.phoneNumber = phoneNumber || undefined
        this.profile = profile || undefined
        this.identityDocument = identityDocument || undefined
        this.document = document || undefined
        this.partyCode = partyCode || undefined
        this.partyName = partyName || undefined
        this.departmentCode = departmentCode || undefined
        this.municipalityCode = municipalityCode || undefined
    }

    get nameInitials() {
        const [firstName] = this.firstName.split(' ')
        const [lastName] = this.lastName.split(' ')

        return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }

    get fullName() {
        const [firstName] = this.firstName.split(' ')
        const [lastName] = this.lastName.split(' ')

        return `${firstName} ${lastName}`
    }

    static create({
                      firstName = String(),
                      middleName = String(),
                      lastName = String(),
                      surName2 = String(),
                      email = String(),
                      phoneNumber = String(),
                      profile = String(),
                      identityDocument = String(),
                      document = String(),
                      partyCode = String(),
                      partyName = String(),
                      municipalityCode = String(),
                      departmentCode = String(),
                  }) {
        return new CurrentUserInfo({
            firstName,
            middleName,
            lastName,
            surName2,
            email,
            phoneNumber,
            profile,
            identityDocument,
            document,
            partyCode,
            partyName,
            municipalityCode,
            departmentCode,
        })
    }
}
