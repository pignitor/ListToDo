$(function  (){
   var APPLICATION_ID = "7E4E41D4-C397-6E0C-FF63-1198827CA100",
       SECRET_KEY = "B52CC244-A0D8-6456-FFC2-AB2A1F555B00",
       VERSION = "v1";
       
       Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
       
      var postsCollection = Backendless.Persistence.of(Posts).find();
      
    console.log(postsCollection);


      var wrapper = {
        posts: postsCollection.data  
      };
      
      Handlebars.registerHelper('format', function(time) {
         return moment(time).format("dddd, MMMM do YYYY"); 
      });
    

      var blogScript = $("blogs-template").html();
      var blogTemplate = Handlebars.compile(blogScript);
      var blogHTML = blogTemplate(wrapper);
      
      $('.main-container').html(blogHTML);
});

function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || ""; 
}