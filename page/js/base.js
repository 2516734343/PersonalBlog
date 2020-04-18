var randomTags = new Vue({
    el:"#randomTags",
    data:{
        tags:[]
    },
    computed:{
        randomColor:function () {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }

        },
        randomSize:function () {
            return function () {
                var size = Math.random() * 20 + 12 + "px";
                return size
            }
        }
    },
    created:function () {
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                result.push({text:resp.data.data[i].tag,link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        }).catch(function () {
            console.log("请求失败")
        })
    }
})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    created:function () {
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        }).catch(function () {
            console.log("请求失败")
        })
    }
})

var newComment = new Vue({
    el:"#new_comments",
    data:{
        commentList:[]
    },
    created:function () {
        axios({
            method:"get",
            url:"/queryCommentsByHot"
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
           newComment.commentList = result;
        }).catch(function () {
            console.log("请求失败")
        })
    }
})