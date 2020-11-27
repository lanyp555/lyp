//使用ajax发送请求给后台服务器
(async function request1(){
    var p1=await promiseAjax({
        url:'../php1/list.php'
    })
    //转为json对象
    var data=eval('('+p1+')')
    //配置分页信息
    var obj={
        pagenum:1,
        pagesize:20,
        totalsize:data.length,
        totalpage:Math.ceil(data.length/20)
    }
    //获取分页器对象
    var pagination=document.querySelector('#pagination')
    new Pagination(pagination,{
        pageInfo:obj,
        textInfo:{
            first:"首页",
            prev:"上一页",
            next:"下一页",
            last:"尾页"
        },change1(n){
            //截取数组中的某段数据
            var arr=data.slice((n-1)*obj.pagesize,n*obj.pagesize)
            //创建拼接内容的字符串
            var str=``
            //遍历截取的数据
            arr.forEach(function(item){
                console.log(item)
                str+=`
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail">
                        <a href="../html1/xiangqing.html?id=${item.id}">
                            <img src="${item.img}" alt="...">
                            <h3 style="font-size:12px;display:inline-block;white-space:nowrap;width:100%;overflow: hidden;">${item.name}</h3>
                            <p style="color:red;">${item.jg}</p>
                        </a>
                    </div>
                </div>
                `
            })
            //获取商品的父节点对象
            document.querySelector('.row').innerHTML=str
        }
    })
})()



// //获取操作对象
// var pagination=document.querySelector('.pagination')
// new Pagination(pagination)