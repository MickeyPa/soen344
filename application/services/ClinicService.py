from application.TDG import ClinicTDG

# Returns clinic if found
def getClinicById(id):
    clinic = ClinicTDG.find(id)
    if clinic is not None:
        return dict(clinic)
    else:
        return None

def getClinicByData(name, address):
    clinic = ClinicTDG.findByData(name, address)
    if clinic is not None:
        return dict(clinic)
    return False

# Return all clinics
def getAllClinics():
    listOfClinics = []
    clinics = ClinicTDG.findAll()
    for clinic in clinics:
        listOfClinics.append(dict(clinic))
    return listOfClinics

# check if clinic exists (only for creating data -- check if name and address exist in table already)
def clinicExistsById(id):
    clinic = ClinicTDG.find(id)
    if clinic is not None:
        return True
    return False

def clinicExistsByData(name, address):
    clinic = ClinicTDG.findByData(name, address)
    if clinic is not None:
        return True
    return False

# create new clinic
def createClinic(name, address):
    response = False
    if (clinicExistsByData(name, address)):
        response = False
    else:
        ClinicTDG.create(name, address)
        response = True
    return response

# delete a clinic
def deleteClinic(id):
    response = False
    if (getClinicById(id) is None):
        response = False
    else:
        ClinicTDG.delete(id)
        response = True
    return response

def updateClinic(id, name, address):
    ClinicTDG.update(id, name, address)
    updatedClinic = ClinicTDG.find(id)
    if ((updatedClinic.name == name) & (updatedClinic.address == address)):
        return True
    return False