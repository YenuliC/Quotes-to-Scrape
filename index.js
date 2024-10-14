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

            return {text,auther};
        });
    });

    console.log(quotes);

    await browser.close();
};

getQuotes();