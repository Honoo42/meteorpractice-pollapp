// Template.hello.greeting = function () {
//     return "Welcome to Sean's Meteor Practice!!!";
// };
 
// Template.hello.events({
//     'click input' : function () {
//       // template data, if any, is available in 'this'
//       if (typeof console !== 'undefined')
//         console.log("You pressed the button");
//     }
// });
// template that has the list of submitted questions and is used to add to the page viewer
Questions = new Meteor.Collection("questions");
Template.questions.items = function(){
    return Questions.find({},{sort:{'submittedOn':-1}});
};

Template.addquestion.events({
	// On click binded with an add-question class 
	'click input.add-question' : function(event){
		event.preventDefault();
		// the server method of addQuestion takes care of all the data so 
		// the client never sees it
		var questionText = document.getElementById("questionText").value;
		Meteor.call("addQuestion",questionText,function(error, questionId) {
			console.log('The added question with its ID: '+questionId);
		});
		document.getElementById("questionText").value = "";
	}
});
// provides functionality to the buttons for voting on a question.
Template.question.events({
 
    'click': function () {
    	// provides a global object on the client that you can 
    	// store a set of key-value pairs
        Session.set("selected_question", this._id);
    },
 //  checks that the user is properly logged in and if so,
 // grabs the session id  and uses the incrementYesVotes method
 // from the server on the chosen id
	'click a.yes' : function (event) {
		event.preventDefault();
		if(Meteor.userId()){
			var questionId = Session.get('selected_question');
			console.log('updating yes count for questionId '+questionId);
			Meteor.call("incrementYesVotes",questionId);
	
		}
	},
	// checks the user login status and if valid, calls the incrementNoVotes method
	'click a.no': function(){
		event.preventDefault();
		if(Meteor.userId()){
			var questionId = Session.get('selected_question');
			console.log('updating no count for questionId '+questionId);
			Meteor.call("incrementNoVotes",questionId);
		}
	}
 });