import axios from "axios";
import  cheerio  from "cheerio";
import express from "express";

const PORT = process.env.PORT || 5000

const app = express()


axios("https://www.nbcnews.com/")
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData);
        const articles = [];

        $('.tease-card__info' , htmlData).each((index , element ) => {
            const title  = $(element).children(".tease-card__headline").text();
            const titleUrl  = $(element).children(".tease-card__headline").children('a').attr('href');
            articles.push({
                title , 
                titleUrl 
            });
        })
        console.log(articles);
    }).catch(err => console.error(err));


    app.listen(PORT , () => console.log(`server is listening to port ${PORT}`));