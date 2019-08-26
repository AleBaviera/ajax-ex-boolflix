// $(document).ready(function(){
//
//   $('button').click(function() {
//     var testo = $('input').val();
//     var movies = 'https://api.themoviedb.org/3/search/movie';
//
//     $.ajax({
//       url : movies,
//       method : 'GET',
//       data: {
//         api_key:'550?api_key=e21a8024569c2ac6c82ebee3c780a5dd',
//         language:'it-IT',
//         query: testo,
//
//       },
//       success : function(data){
//           console.log(data);
//
//
//
//       },
//       error : function(){
//
//       }
//     });
//
//
//   });
//
//
// });


function searchClick() {

  var query = $('#query').val();
  console.log(query);

  getMovies(query);
  getTV(query);
}

function getMovies(query) {

  // MOVIES
  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {

      api_key: "e21a8024569c2ac6c82ebee3c780a5dd",
      language: "it-IT",
      query: query

    },
    success: function(data) {

      console.log("MOVIES OUTPUT");
      console.log(data);

      var movies = data.results;
      print("movies", movies);
    },
    error: function() {

      alert('Errore!!');
    }

  });
}

function getTV(query) {

  // TV
  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {

      api_key: "e21a8024569c2ac6c82ebee3c780a5dd",
      language: "it-IT",
      query: query

    },
    success: function(data) {

      console.log("TV OUTPUT");
      console.log(data);

      var tv = data.results;
      print("tv", tv);
    },
    error: function() {

      alert('Errore!!');
    }

  });
}

function print(type, movies) {

  var objs = $("#results");

  for (var i=0;i<movies.length;i++) {

    var movie = movies[i];

    // var source = document.getElementById("entry-template").innerHTML;
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    title = "";
    originalTitle = "";

    if (type == "movies") {

      title = movie.title;
      originalTitle = movie.original_title;
    } else {

      title = movie.name;
      originalTitle = movie.original_name;
    }

    var context = {
      type: type,
      title: title,
      originalTitle: originalTitle,
      movieLan: getLangFlag(movie.original_language),
      movieRate: getStarFromRate(movie.vote_average)
    };

    var html = template(context);

    objs.append(html);
  }
}

function getStarFromRate(rate) {

  var roundedRate = Math.floor(rate/2);

  var graphStar = "";
  for (var i=0;i<5;i++) {

    if (i < roundedRate) {
      graphStar += '<i class="fas fa-star"></i>';
    } else {
      graphStar += '<i class="far fa-star"></i>';
    }
  }

  return graphStar;
}

function getLangFlag(lang) {

  var availableFlag = [
    "it",
    "en"
  ];

  var flag = "";
  if (availableFlag.includes(lang)) {

    flag = "<img src='img/" + lang + ".svg' class='lang'>";
  } else {

    flag = lang;
  }

  return flag;
}

function init() {

  console.log("init");

  $('#myButton').click(searchClick);
}

$(document).ready(init);
