$(document).ready(function(){
    var urlParam = readMarkdownFileUrlFromQueryString();
    if (urlParam.length > 0){
        $("#formPreview").hide();
        renderMarkdown(urlParam);
    }

    $("#buttonSubmit").click(function(e){
        e.preventDefault();

        var markdownUrl = $("#textUrl").val();
        renderMarkdown(markdownUrl);
    });

    function readMarkdownFileUrlFromQueryString(){
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){
            params[key] = value;
        });

        return params["u"] || "";
    }

    function renderMarkdown(markdownUrl){
        $("#preview").html("downloading...");
        $.get(markdownUrl, function(data){
            var renderedHtml = markdown.toHTML(data);
            $("#preview").html(renderedHtml);
        })
        .fail(function(){
            $("#preview").html("error");  
        });
    }
});