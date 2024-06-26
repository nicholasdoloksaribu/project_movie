function searchMovie(){
    $("#movie-list").html('');
    $.ajax({
      url:"https://www.omdbapi.com",
      type:"GET",
      datatype:"JSON",
      data:{
        'apikey':"94d0dda",
        's':$("#search-input").val()
      },
      success:function(result){
        if(result.Response == "True"){
             let movies = result.Search;
             $.each(movies,function(i,data){
                if(data.Poster === "N/A"){return;}
                $("#movie-list").append(`
                <div class="col-md-4">
                 <div class="card mb-3" style="width: 18rem;">
                 <img src="${data.Poster}" class="card-img-top" alt="...">
                 <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <p class="card-text">${data.Year}</p>
                <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${data.imdbID}>See Details</a>
           </div>
       </div>
       </div>
              `);
             });

            $("#search-input").val('');
        }else{
            $("#movie-list").html(`<h1 class="text-center">${result.Error}</h1>`); 
        }
      }
    });
}


$("#search-button").on('click',function(){
    searchMovie();
});
$("#search-input").on('keyup',function(e){
    if(e.keyCode === 13){
        searchMovie();
    }

});

$("#movie-list").on("click",".see-detail",function(){
    $.ajax({
        url:"https://omdbapi.com",
        datatype: "JSON",
        type:"GET",
        data:{
            'apikey':"94d0dda",
             'i':$(this).data("id")
        },
        success:function(movie){
            if(movie.Response === "True"){
                $(".modal-body").html(`
                    <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                     <ul class="list-group">
                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                    <li class="list-group-item">Language : ${movie.Language}</li>
                    <li class="list-group-item">Released : ${movie.Released}</li>
                    <li class="list-group-item">Genre : ${movie.Genre}</li>
                    <li class="list-group-item">Country : ${movie.Country}</li>
                    <li class="list-group-item">Director : ${movie.Director}</li>
                    <li class="list-group-item">Actor : ${movie.Actors}</li>
                  </ul>
                    </div>
                    </div>
                    </div>
                `)
            }
        }
    })
})
