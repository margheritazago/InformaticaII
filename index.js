  window.apiCall = function(){
      //Prendo il testo inserito dall'utente dalla casella
      var title = document.getElementById("titolo_film").value;
      //Chiamata all'API per ricerca il titolo
      $.getJSON('https://www.omdbapi.com/?apikey=ee0a66a0&s='+encodeURI(title)).then(function(response){
        console.log(response);
        console.log(response.Search);
        var table = document.getElementById("tabella");
        while (table.hasChildNodes()) {
            table.removeChild(table.lastChild);
        }
        var i;
        for (i = 0; i < response.Search.length; i++) {
          var tr = document.createElement("tr");
          var j;
          for(j=0;j<3;j++){
            console.log(j);
              var td = document.createElement("td");
              td.style.paddingBottom = "2em";
              var mdcard = document.createElement("div");
          
              mdcard.classList.add("md-card");
              mdcard.classList.add("md-theme-default");
              mdcard.style.width ="20em";

              var mdcardheader = document.createElement("div");
              mdcardheader.classList.add("md-card-header");

              var mdcardmedia = document.createElement("div");
              mdcardmedia.classList.add("md-card-media");
              
              var img = document.createElement("img");
              img.style.width="20em";
              img.style.height="25em";
              //img.style.marginLeft="4em";
              if(response.Search[i].Poster!="N/A"){
                  img.src = response.Search[i].Poster; 
              }
              mdcardmedia.appendChild(img);
              mdcard.appendChild(mdcardmedia);

              var mdtitle = document.createElement("div");
              mdtitle.classList.add("md-title");
              var textTitle = document.createTextNode(response.Search[i].Title);
              mdtitle.appendChild(textTitle);
              mdtitle.style.textAlign="center";

              var mdsubhead = document.createElement("div");
              mdsubhead.classList.add("md-subhead");
              mdsubhead.style.textAlign="center";
              var textContent = document.createTextNode(response.Search[i].Year);
              mdsubhead.appendChild(textContent);

              mdcardheader.appendChild(mdtitle);
              mdcardheader.appendChild(mdsubhead);

              //var mdcardmedia = document.createElement("div");
              mdcard.appendChild(mdcardheader);
              td.appendChild(mdcard);
              tr.appendChild(td);
              i++;
          }
         
          table.appendChild(tr); 
        

        } 
      });   
  }

  window.callApiTopTitle = function(title,namediv){
  
      //Chiamata all'API per ricerca il titolo
      
      $.getJSON('https://www.omdbapi.com/?apikey=ee0a66a0&s='+encodeURI(title)+'&y=2019').then(function(response){
        console.log(response);
        console.log(response.Search);
        var table = document.getElementById(namediv);
        var tr = document.createElement("tr");
        var j;

        for(j=0;j<3;j++){
          var td = document.createElement("td");
          td.style.paddingBottom = "2em";
          var mdcard = document.createElement("div");
          
          mdcard.classList.add("md-card");
          mdcard.classList.add("md-theme-default");
          mdcard.style.width ="20em";

          var mdcardheader = document.createElement("div");
          mdcardheader.classList.add("md-card-header");

          var mdcardmedia = document.createElement("div");
          mdcardmedia.classList.add("md-card-media");
          
          var img = document.createElement("img");
          img.style.width="20em";
          img.style.height="25em";
          
          //img.style.marginLeft="4em";
          if(response.Search[j].Poster!="N/A"){
              img.src = response.Search[j].Poster; 
          }
          
          mdcardmedia.appendChild(img);
          mdcard.appendChild(mdcardmedia);

          var mdtitle = document.createElement("div");
          mdtitle.classList.add("md-title");
          var textTitle = document.createTextNode(response.Search[j].Title);
          mdtitle.appendChild(textTitle);
          mdtitle.style.textAlign="center";
          mdtitle.style.fontSize="1.2em";

          var mdsubhead = document.createElement("div");
          mdsubhead.classList.add("md-subhead");
          mdsubhead.style.textAlign="center";

          mdcardheader.appendChild(mdtitle);
          mdcardheader.appendChild(mdsubhead);
      
          //var mdcardmedia = document.createElement("div");
          mdcard.appendChild(mdcardheader);
          td.appendChild(mdcard);
          tr.appendChild(td);
         
      }
         
      table.appendChild(tr); 
  });   


  }

  window.callApiTop = function(){
      callApiTopTitle("Summer","tabellaEstate")
      callApiTopTitle("Scary","tabellaHorror")
      callApiTopTitle("Drama","tabellaCommedia")

  }

   Vue.use(VueMaterial.default)
        Vue.component('router-link', Vue.options.components.RouterLink) 
        Vue.component('router-view', Vue.options.components.RouterView)

        var users = []
        var favourites = []

        const Home = Vue.component('home', {template: '#home'});
        const Page1 = Vue.component('page1', { 
          template: '#page1',
          data: function() {
            return {
              users: users,
              message: "",
              selected: 0 
            };
          }
        });
        const Page2 = Vue.component('page2', {
          template: '#page2',
          data: function() {
            return {
              users: favourites,
              message: "",
              selected: 0
            };
          }
        });
         const Page3 = Vue.component('page3', {
          template: '#page3',
          data: function() {
            return {
              users: users,
              message: "",
              selected: 0
            };
          }
        });

        const Detail = Vue.component('detail', { 
          template: '#detail',
          computed: {
            user: function() { 
              const id = this.$route.params.id;
              return users.filter(function(u) {
                return u.id == id;
              })[0];
            }
          }
        });


        const router = new VueRouter({
          routes: [
            {path:'/home', component: Home},
            {path: '/page1', component: Page1},
            {path: '/page2', component: Page2},
            {path: '/page3', component: Page3},
            {path:'/detail/:id', component: Detail},
            {path:'*', component: Home},
          ]
        })

        new Vue({   
          router: router,
          el: '#app',
          data: {
            menuVisible: true
          }
        })
