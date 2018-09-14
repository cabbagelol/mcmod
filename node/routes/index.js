var express = require('express');
var request = require('request');
var https = require('https');
var cheerio = require('cheerio');
var router = express.Router();



/* GET 搜索 */
router.post('/search', function(req, res, next) {
    var val = req.body.val
    // console.log(req.query)
    if (val != '' || val != undefined) {
        postsearch(val ,function (data) {
            res.send(data)
        })
    }
});

function postsearch(val_, callback) {
    https.get('https://www.mcmod.cn/s?key=' + val_ + '&filter=1', function (res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            // 处理搜索内容
            var $ = cheerio.load(html),
                searchArr = [];

            $('.resultList .resultItem').each(function(index, element) {
                let name = $(this).find('.itemHead a').text(),
                    url = $(this).find('.itemHead a').attr('href'),
                    describe = $(this).find('.itemBody').text()

                searchArr.push({
                    name: name,
                    path: url,
                    describe: describe.substring(0,30) + '...'
                });
            });

            callback({
                search: searchArr
            })
        });
    })
}


/* GET 菜单 */
router.get('/index/nav', function(req, res, next) {
    res.send([
        {
            name: '随便看看',
            system_initial: false,
            system_name: 'casual',
            syetem_so: true,
            ststem_category: ''
        },
        {
            name: '受欢迎',
            system_initial: false,
            system_name: 'mostPopular',
            syetem_so: false,
            ststem_category: ''
        },
        {
            name: '科技',
            system_initial: true,
            system_name: 'science',
            syetem_so: true,
            ststem_category: 1
        },
        {
            name: '魔法',
            system_initial: true,
            system_name: 'magic',
            syetem_so: true,
            ststem_category: 2
        },
        {
            name: '冒险',
            system_initial: true,
            system_name: 'adventure',
            syetem_so: true,
            ststem_category: 3
        },
        {
            name: '农业',
            system_initial: true,
            system_name: 'agriculture',
            syetem_so: true,
            ststem_category: 4
        },
        {
            name: '装饰',
            system_initial: true,
            system_name: 'decorate',
            syetem_so: true,
            ststem_category: 5
        },
        {
            name: 'LIB',
            system_initial: true,
            system_name: 'lib',
            syetem_so: true,
            ststem_category: 6
        },
        {
            name: '实用',
            system_initial: true,
            system_name: 'practical',
            syetem_so: true,
            ststem_category: 7
        }
    ])
});

/* GET 推送列表 */
router.get('/index', function(req, res, next) {
    getIndex(function (data) {
        res.send(data)
    })
});

function getIndex(callback) {
    https.get('https://www.mcmod.cn/', function (res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {

            // 处理
            var $ = cheerio.load(html),
                ipArr = [], // 随便看看
                mostPopular = [], // 最受欢迎
                ooops = $(".ooops .text").text()


            $('#indexNew_random > div').each(function(index, element) {
                let name = $(element).find('.block .name a').text(),
                    path =  $(element).find('.block .name a').attr('href'),
                    imgurl = $(element).find('.block .img').attr('data-original')

                ipArr.push({
                    name: name,
                    path: path,
                    imgurl: imgurl
                });
            });

            // 最受欢迎
            $('.card_block > .list li').each(function(index, element) {
                let name = $(element).find('.name a').text(),
                    path =  $(element).find('.img a').attr('href'),
                    imgurl = $(element).find('.img img').attr('data-original'),
                    comment = $(element).find('.text font').text(),
                    praiseRate = $(element).find('.text .per font').text();

                mostPopular.push({
                    name: name,
                    path: path,
                    imgurl: imgurl,
                    comment: comment,
                    praiseRate: praiseRate
                });
            });

            callback({
                // 首页板块
                ooops: ooops,
                main: {
                    casual: ipArr,
                    // course: course, // 教程
                    mostPopular: mostPopular, // 最受欢迎,
                    science: [], //科学
                    magic: [],
                    adventure: [],
                    agriculture: [],
                    decorate: [],
                    lib: [],
                    practical: []
                }
            })
        });
    })
}

/* GET 首页下拉追加 */
router.post('/index/classappend', function(req, res, next) {
    var page = req.body.page,
        category = req.body.category,
        limit = 36,
        data;

    console.log(page)

    if (page != undefined && category != undefined) {
        data = {
            page: page,
            limit: limit,
            category: category, // mod类型
            status: '',
            mcver: '',
            order: ''
        }
    }
    else if (page != undefined && category == undefined) {
        data = {
            page: page,
            limit: limit,
            category: '', // mod类型
            status: '',
            mcver: '',
            order: ''
        }
    }
    else {
        res.send('缺省参数')
    }

    getClassAppend(data, function (data) {
        res.send(data)
    })
});

function getClassAppend(data_, callback) {
    // 追加
    request.post({
        method: 'post',
        url: 'https://m.mcmod.cn/ajax/ajax___class_append.php',
        formData: data_
    }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        var $ = cheerio.load(body),
            indexClassArr = []

        $('.frame').each(function () {
            let path = $(this).find('> a').attr('href'),
                name = $(this).find('> a').attr('title'),
                backurl = $(this).find('> a img').attr('src')
            indexClassArr.push({
                path: path,
                name: name,
                backurl: backurl
            })
        })

        callback({
            page: data_.page,
            data: indexClassArr
        })
    })
}


router.get('/index/class_push', function (req, res, next) {
    var c = req.body.c
    getclassPush(c, function () {
        res.send({
            data: 0
        })
    })
})

function getclassPush (class_, callback) {
    request.post({
        method: 'post',
        url: 'https://m.mcmod.cn/ajax/ajax___class_append.php',
        formData: {
            c: class_
        }
    }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        callback(true)
    })
}


/* GET 获取MOD详情 */
router.get('/index/class', function(req, res, next) {
    var url = req.query.url
    if (url == '') {
        res.end({
            data: "错误的地址"
        })
        return false;
    } else {
        getClass(url, function (data) {
            res.send(data)
        })
    }
});

function getClass(url, callback) {
    https.get('https://www.mcmod.cn/' + url, function (res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            // 处理
            var $ = cheerio.load(html),
                mcmodDetails = [], // MOD 位于mcmod大致信息
                mcmodDiscuss = [],
                mcmodJs = $('#ClassBlock_1').text(),
                mod_name = $('#AllName').text(),
                modImgurl = $('#LeftInfo .class_modimg').attr('data-cfsrc')

            $('.InfoBlock > *').each(function(index, element) {
                let name = $(element).text()
                mcmodDetails.push(name)
            });

            $('#ClassBlock_4 li').each(function(index, element) {
                let e = $(element).find('a')
                if (e.text().indexOf('发表新主题') < 0) {
                    mcmodDiscuss.push({
                        title: e.text(),
                        url: e.attr('href')
                    })
                }
            });

            var general = $('.infos .span:first-child .n').text(),
                filling_rate = $('.infos .span:nth-child(2) .n').text(),
                star = $('.star .up').text(),
                star_cont = $('.star .down').text(),
                push = $('#push .nums').text()

            callback({
                mod_id: url.split('/')[2].replace('.html', ''),
                mod_toal: {
                    general: general,
                    filling_rate: filling_rate,
                    score: star,
                    score_cont: star_cont,
                    push: push
                },
                mod_name: mod_name,
                mod_imgurl: modImgurl,
                mdd: mcmodDetails,
                mod_introduce: mcmodJs, // mod 介绍
                mod_discuss: mcmodDiscuss // mod 讨论
            })
        });
    })
}

module.exports = router;