function loadMd(url, name) {
    $.ajax({
        url: url,
        success: function (res) {
            document.title = `${name} - ${blogOnwer}`
            var converter = new showdown.Converter({
                extensions: ['table','strikethrough']
            });
            app.markdownHtml = converter.makeHtml(res);
            /*
            $('pre code').each(function (i, e) {
                hljs.highlightBlock(e);
            });
            */
            hljs.initHighlighting();
            var card = document.getElementById("card");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, card]);
        }
    })
}

function loadFromId(id) {
    $.ajax({
        url: apiUrl + "/post.json",
        success: function (res) {
            if (res[id]) {
                loadMd(res[id]["markdown"], res[id]["title"]);
            } else {
                app.markdownHtml = "<h1>404 Not Found</h1>";
            }
        }
    })
}