const quoteContainer = document.getElementById('quote-container');
const textQuote = document.getElementById('quote');
const authorQuote = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//Show loading
function ShowLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading
function RemoveLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true
        quoteContainer.hidden = false;
    }
}

async function getQuote(){
    ShowLoadingSpinner();
    const proxyUrl = 'https://quiet-wildwood-41923.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor===''){
            authorQuote.innerText = "Unknows"
        }else{
            authorQuote.innerText = data.quoteAuthor
        }
        if(data.quoteText.length > 120){
            textQuote.classList.add("long-quote");
        }else{
            textQuote.classList.remove("long-quote");
        }
        textQuote.innerText = data.quoteText
        RemoveLoadingSpinner();
    }catch(error){
        getQuote();   
    }
}
twitterBtn.addEventListener("click",function(){
    const quote = textQuote.innerText;
    const author = authorQuote.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,"_blank");
});
newQuote.addEventListener('click',getQuote);

getQuote(); 