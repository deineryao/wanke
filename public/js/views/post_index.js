(function($) {
    $("#arrow").hide();
    loading(function(){
        $(".viewmore").on("click",function(){
            var postview=$(this).attr("value");
            window.location.href="post_detail.html?"+postview+"";
        });

    });

    $(window).scroll(function(){
        //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
        var htmlHeight=document.body.scrollHeight||document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        if(scrollTop>800){
            $("#arrow").show();
        }else{
            $("#arrow").hide();
        }
    })
    function loading (callbak){
        AV.initialize("f7r02mj6nyjeocgqv7psbb31mxy2hdt22zp2mcyckpkz7ll8", "blq4yetdf0ygukc7fgfogp3npz33s2t2cjm8l5mns5gf9w3z");
        //ject.createWithoutData('className',id);
        var post = AV.Object.extend("post");
        var tags = AV.Object.extend("tags");
        var user = AV.Object.extend("User");

        var newtime = new Date().getTime();
        var query = new AV.Query(post);
        query.descending("createdAt");
        query.limit(5);
        query.include("tagkey")
        query.include("imgs")
        query.include("username")
        query.find({
            success:function(arry){
                console.log(arry);
                var times=0;
                var tags = [];
                for (var i = 0; i < arry.length; i++) {
                    var object = arry[i];
                    console.log(arry[i]);
                    var avalue = object.id;
                    var content = object.get('content');
                    var  imgs =  object.get('imgs');
                    console.log(imgs);
                    var otagkey=object.get("tagkey");
                    var ousername =object.get("username");
                    var username = ousername.get("username");
                    var tagvalue=otagkey.get("tagtitle");
                    var oldtime= object.createdAt.getTime();
                    var publishtime = newtime - oldtime;
                    var day = parseInt(publishtime/86400000);
                    if(day>0){
                        times = day+"天"
                    }else{
                        var hours = parseInt(publishtime/3600000);
                        if(hours>0){
                            times= hours+"小时";
                        }
                        else{
                            var minute = parseInt(publishtime/60000);
                            if(minute>0){
                                times=minute+"分钟"
                            }
                        }
                    }
                    // var tagvalue = object.get('tagkey');
                    var imge    = object.get('imgs')
                    var opost = {
                        name: username,
                        usersay:content,
                        tag: tagvalue,
                        time:times,
                        value:avalue
                        //img: imge
                    };
                    tags.push(opost);
                    console.log(opost.name);
                    console.log(opost.usersay);
                    console.log(opost.tag);
                    console.log(opost.time);
                }
                var $tpl = $('#amz-tags');
                var source = $tpl.text();
                var template = Handlebars.compile(source);
                var data = {tags: tags};
                var html = template(data);
                $tpl.before(html);
                callbak();
            }
        });


    }








})(jQuery);

