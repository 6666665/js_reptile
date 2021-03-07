var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var movies = [];

async function showMovies(){
    const http_url = "https://movie.douban.com/top250";
    const m = await requestMovie(http_url); 
}

//电影的类
var movie  = function(){
    this.id = 0;
    this.name = "";
    this.score = 0;
    this.pic = '';
}

var requestMovie = function(http_url){
   
     request(http_url,function(err,response,body){
        if(err === null && response.statusCode === 200){
            console.log("链接成功");
            //使用cheerio解析数据
            
            var e = cheerio.load(body);
            var movieDiv = e('.item');
            movieDiv.map(function(node){
                var movieDiv = e(this);
                var m = new movie();
                m.name = movieDiv.find('.title').text();
          
                m.score = movieDiv.find('.rating_num').text();
                var pic = movieDiv.find('.pic');
                //cheerio如果要提取某个属性moveDiv的内容，可以通过attr()
                m.pic = pic.find('img').attr('src');
                m.id = pic.find('em').text();
                console.log("正在拉取",m.name);
                movies.push(m);
            
            });
            console.log("movie信息",movies);
           

        }
    })

} 


showMovies();