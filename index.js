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
};

getQuotes();