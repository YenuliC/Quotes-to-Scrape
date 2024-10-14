import puppeteer from "puppeteer"; // ES Module syntax 

const getQuotes = async()=>{
    const browser = await puppeteer.launch({
        headless:false, //Puppeteer runs browser with GUI.
        defaultViewport:null, //browser is launched with a full-screen window size
    });
    const page = await browser.newPage();
    await page.goto('http://quotes.toscrape.com/', {
        waitUntil: "domcontentloaded",
    });

    //page.evaluate() is a Puppeteer method that allows you to 
    //execute JavaScript code in the context of the web page.
    const quotes = await page.evaluate(()=>{
        const quoteList = document.querySelectorAll(".quote");

        return Array.from(quoteList).map((quote)=>{
            const text = quote.querySelector(".text").innerText;
            const auther = quote.querySelector(".author").innerText;
            const tags = Array.from(quote.querySelectorAll(".tags .tag")).map(tag => tag.innerText);
            const aboutAuthor = 'http://quotes.toscrape.com/' + (quote.querySelector("a")?.getAttribute('href')); //access nested properties, methods, or DOM elements 

            return {text,auther,tags: tags.join(' '),aboutAuthor };
        });
    });

    console.log(quotes);
    
    // Click on the "Next page" button
    await page.click(".pager > .next > a");


    await browser.close();
};

getQuotes();