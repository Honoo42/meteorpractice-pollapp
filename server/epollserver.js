// creates a collection for questions in the database
var Questions = new Meteor.Collection("questions");
Meteor.startup(function () {

    // code to run on server at startup
 });
// adds the questions to the database and forms the proper object for storage
Meteor.methods({
	addQuestion : function(questionText){
		console.log('Adding Question');
		var questionId = Questions.insert({
			'questionText' : questionText,
			'submittedOn' : new Date(),
			'submittedBy' : Meteor.userId()
		});
		return questionId;
	},
	// server methods to update the question yes or no
	// amount for voting purposes from the client side
	incrementYesVotes : function(questionId){
	console.log(questionId);
	Questions.update(questionId,{$inc : {'yes':1}});
	},
	
	incrementNoVotes : function(questionId){
	console.log(questionId);
	Questions.update(questionId,{$inc : {'no':1}});
}
})