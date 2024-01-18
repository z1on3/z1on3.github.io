
function redirectTo(){
    var dmn=document.domain;
    window.location.href="https://"+dmn+"/techcarlo";

}

var sourceSwap = function () {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    }

    $(function () {
        $('img.xyz').hover(sourceSwap, sourceSwap);
    });