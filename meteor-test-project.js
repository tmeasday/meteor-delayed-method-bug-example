var Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.body.posts = function() {
    console.log(Posts.find().map(function(p) { return p._id }));
    return Posts.find();
  }
  
  Template.body.events({
    'click button': function() {
      Meteor.call('createPost', $('[name=title]').val());
    }
  })
}

Meteor.methods({'createPost': function(title) {
  Posts.insert({title: title + ' from ' + (Meteor.isClient ? 'client' : 'server')});
  
  if (Meteor.isClient)
    return
    
  Posts.findOne();
  var Future = Npm.require('fibers/future');
  var future = new Future();
  Meteor.setTimeout(function() {
    future.ret();
  }, 3000);
  
  return future.wait()
}});

