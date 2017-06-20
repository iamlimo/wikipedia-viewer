$(function(){
    
    $("#result").hide();    
    
    $("#close").click(function(){
        $("#inputText").val("");
    })
    
    $("#wiki-search").keyup(function(e){
        
      e.preventDefault();
        
      
        
        var inputValue = $("#inputText").val();
        var callBack = "&callback=JSON_CALLBACK";
        
        $.ajax({
            url:'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+inputValue+'&callback=JSON_CALLBACK',
            type: "GET",
            dataType: 'jsonp'
        }).done(function(data){
            $("#result").html("")
            $("#result").css("visibility", "initial")
            for( var key in data.query.pages){
                
                
                var pageTitle = data.query.pages[key].title;
                var pageExcerpt = data.query.pages[key].extract;
                var excerptId = 'https://en.wikipedia.org/?curid=' + data.query.pages[key].pageid;
                imgArt = data.query.pages[key].thumbnail.source;
                
                $("#result").show();
                
                var htmlContent =`<div class="col-md-4"><div class="box-result"><div class="bg-result">
</div><a href="${excerptId}" target="_blank"> <div class="box-content center-block"> <div class="article-thumbnail"><img src="${imgArt}" alt="" class="center-block"/></div><h1> ${pageTitle} </h1><p>  ${pageExcerpt} </p></div></a></div></div>`
               
                
                $("#result").append(htmlContent)
                
              
              
            
            }
        });
        
    })
})
