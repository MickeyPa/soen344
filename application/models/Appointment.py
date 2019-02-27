from index import db

# PickleType coverts python object to a string so that it can be stored on the database
class Appointment(db.Model):
    room = db.Column(db.PickleType(mutable=True), primary_key=True)
    timeSlot = db.Column(db.PickleType(mutable=True), nullable=False)
    doctor = db.Column(db.PickleType(mutable=True), nullable=False)
    patient = db.Column(db.PickleType(mutable=True), nullable=False)
