var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total:0,
        comments:[
            // {
            //     id:"1",
            //     name:"小辣椒",
            //     ctime:"2020-04-05",
            //     comments:"你写的很好",
            //     options:""
            // },
            // {
            //     id:"1",
            //     name:"小辣椒",
            //     ctime:"2020-04-05",
            //     comments:"你写的很好",
            //     options:""
            // }
        ]
    },
    computed:{
        reply:function () {
            return function (commentId,userName) {
                document.getElementById("comment_reply").value = commentId ;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comments";
            }
        }
    },
    created:function () {
        var bid = -1;
        axios({
            method:"get",
            url:"/queryCommentsByBlogId?bid=" + bid
        }).then(function (resp) {
            // console.log(resp);
            blogComments.comments = resp.data.data;
            for (let i = 0; i < blogComments.comments.length; i++) {
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid=" + bid
        }).then(function (resp) {
            // console.log(resp);
            blogComments.total = resp.data.data[0].count;
        }).catch(function (resp) {
            console.log("请求错误")
        })
    }
})
var sendComment = new Vue({
    el:"#send_comments",
    data:{
        vcode:"",
        rightCode:""
    },
    computed: {
        changeCode:function () {
            return function () {
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function (resp) {
                    // console.log(resp);
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        },
        sendComment:function () {
            return function () {
                // console.log(111);
                var code = document.getElementById("comment_code").value;
                if(code != sendComment.rightCode){
                    alert("验证码有误");
                    return;
                }
                var bid = -1;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value
                axios({
                    method:"get",
                    url:"/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name +"&email=" + email +"&content=" + content + "&parentName=" + replyName
                }).then(function (resp) {
                    console.log("添加评论"+resp);
                    alert(resp.data.msg);
                })

            }
        }

    },
    created:function () {
        this.changeCode();
    }
})