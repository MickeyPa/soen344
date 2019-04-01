from index import db

class RoomSchedule(db.Model):
    roomNumber = db.Column(db.String(), nullable=False, primary_key=True)
    date = db.Column(db.String(), nullable=False, primary_key=True)
    timeSlots = db.Column(db.String(), nullable=False)

    def __iter__(self):
        yield 'roomNumber', self.roomNumber
        yield 'timeSlots', self.timeSlots
        yield 'date', self.date

# Initializes the database
db.create_all()
