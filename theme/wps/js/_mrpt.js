;
(function() {
    var a = null;
    var s = document.querySelector("[data-rel='mrpt']");
    if (s) {
        var id = parseFloat((s.getAttribute("data-a") || "").replace(",", ""));
        if (!isNaN(id) && id > 0) {
            a = id
        }
    }

    function _f(e) {
        if (!e || !a) {
            return;
        }
        e.accountId = a;

        var url = new URL(window.location.href);
        e.referer = document.referer; // TODO; refine for inpage nav
        e.postGet = e.postGet || 'GET';
        e.url = url.toString();
        e.path = url.pathname;
        e.userAgent = window.navigator.userAgent;

        // console.log( 'Logging', e );
        var r = fetch('/wps/rest/api/' + a + '/weblog', {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(e),
        })
    }
    var q = window["_mrpt"] = window["_mrpt"] || [];
    if (q.__inited) {
        console.log("_mrpt inited");
        return;
    }
    q.__inited = true;
    q.push = _f;
    for (var i = 0; i < q.length; ++i) {
        _f(q[i]);
    }
    console.log("_mrpt ready");
})();