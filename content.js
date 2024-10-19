
// message listener -> received from service_worker usually
chrome.runtime.onMessage.addListener(function(request){
    if (request.message === "googleUrl") {
        page_loaded();
    }

});

function page_loaded(){
    console.log("Hello");
    if (is_images_page()){
        hide_images();
    }
}

function is_images_page(){
    const titles = document.querySelectorAll('[selected].YmvwI');
    for(let title of titles){
        if (title.textContent == "Images"){
            return true;
        }
    }
    return false;
}



function hide_images(){
    var image_url = chrome.runtime.getURL('no_robots.png');
    const images = document.querySelectorAll('.mNsIhb .YQ4gaf');
    for(let image of images){
        if(image.src == image_url){
            continue;
        }
        if (is_ai(image)){
            image.src = image_url;
        }
    }
}

function is_ai(image){
    const parent = image.closest('div.eA0Zlc.WghbWd.FnEtTd.mkpRId.m3LIae.RLdvSe.qyKxnc.ivg-i.PZPZlf.GMCzAd');
    if (parent.dataset.lpage.toLowerCase().includes('ai')){
        return true;
    }
    const spans = parent.querySelectorAll('span');
    for (let span of spans){
        if (span.textContent.toLowerCase().includes('ai') || span.textContent.toLowerCase().includes('stable diffusion')){
            return true;
        }
    }

    const titles = parent.querySelectorAll('div.toI8Rb.OSrXXb');
    for (let title of titles){
        if (title.textContent.toLowerCase().includes('ai') || title.textContent.toLowerCase().includes('gen') || title.textContent.toLowerCase().includes('- playground')){
            return true;
        }
    }

    const image_link = image.closest('a');
    if (image_link.href.includes("ai") || image_link.href.includes("playground.com")){
        return true;
    }
    return false;
}

document.addEventListener("scroll", (event) => {
    page_loaded();
});