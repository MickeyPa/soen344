from index import db
import datetime

class Patient(db.Model):
	hcnumber = db.Column(db.String(14), primary_key=True)
	fname = db.Column(db.String(30), nullable=False)
	lname = db.Column(db.String(30), nullable=False)
	birthday = db.Column(db.DateTime(), nullable=False)
	gender = db.Column(db.String(1), nullable=False)
	phone = db.Column(db.String(10), nullable=False)
	email = db.Column(db.String(120), nullable=False)
	address = db.Column(db.String(120), nullable=False)
	password_hash = db.Column(db.String(100), nullable=False)
	lastAnnual = db.Column(db.DateTime(), nullable=True)

	def __repr__(self):
		return '<Patient %r %r>' % self.fname % self.lname

	# to iterate over a patient to retrieve specific attributes
	def __iter__(self):
		yield 'hcnumber', self.hcnumber
		yield 'fname', self.fname
		yield 'lname', self.lname
		yield 'birthday', self.birthday
		yield 'gender', self.gender
		yield 'phone', self.phone
		yield 'email', self.email
		yield 'address', self.address
		yield 'password_hash', self.password_hash
		yield 'lastAnnual', self.lastAnnual


# Initializes the database
db.create_all()