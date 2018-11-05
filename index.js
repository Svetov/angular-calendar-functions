const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.requestsLengthIncrement = functions.firestore
	.document('requests/{value}')
	.onCreate((snap, context) => {
		admin.firestore().collection('system').doc('requests_length').get()
			.then(res => {
				admin.firestore().collection('system').doc('requests_length').update({
					value: ++res.data().value
				})
			})
			.catch(err => {
				console.log('Error requestsLengthIncrement', err)
			})
	});

exports.addNewDocument = functions.firestore
	.document('requests/{value}')
	.onCreate((snap, context) => {
		admin.firestore().collection('system').doc('requests_id').get()
			.then(res => {
				//res.data().value.push(snap.id)
				console.log(res.data().value)
				console.log(typeof snap.id)
				var value_res = [].concat(res.data().value).concat([snap.id])
				console.log(value_res)
				admin.firestore().collection('system').doc('requests_id').update({
					value: value_res
				})
			})
			.catch(err => {
				console.log('Error get addNewDocument', err)
			})
	});