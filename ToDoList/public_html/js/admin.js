$(function  (){
   var APPLICATION_ID = "7E4E41D4-C397-6E0C-FF63-1198827CA100",
       SECRET_KEY = "B52CC244-A0D8-6456-FFC2-AB2A1F555B00",
       VERSION = "v1";
       
       Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
       if(Backendless.UserService.isValidLogin()){
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    } else {   
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    }

      $(document).on('submit', '.form-signin', function(event){
         event.preventDefault();
         
         var data = $(this).serializeArray(),
             email = data[0].value,
             password = data[1].value;
             
             Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
      });
    $(document).on('click', '.add-blog', function(){
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript)
        
        $('.main-container').html(addBlogTemplate);
   });
   $(document).on('submit', '.form-add-blog', function(event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
      title = data[0].value,
      content = data[1].value;
      
      var dataStore = Backendless.Persistence.of(Posts);
      
      var postObject = new Posts({
         title: title,
         content: content,
         authorEmail: Backendless.UserService.getCurrentUser().email
      });
      
      dataStore.save(postObject);
      
      this.title.value = "";
      this.content.value = "";
   });
  $(document).on('click', '.logout', function (){
     Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
     
     var loginScript = $("#login-template").html();
     var loginTemplate = Handlebars.compile(loginScript);
     $('.main-container').html(loginTemplate);
  });
});
    
function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user) {
    console.log("user successfully logged in");
    var userData;
    if (typeof user == "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else {
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function userLoggedOut() {
    console.log("succesfully logged out");
}

function gotError(error) {
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
    Materialize.toast("Incorrect Username or Password");
    }