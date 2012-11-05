var Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Meteor.subscribe('posts', {sort: {submitted: 1}});
  Meteor.subscribe('posts', {sort: {score: 1}});
}

if (Meteor.isServer) {
  Meteor.publish('posts', function(options){ 
    console.log('publish called with :', options.sort);
  });
}
