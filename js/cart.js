//获取操作对象
var div1=document.querySelector('.b');
//获取当前url地址
var href1=location.href
//获取登录的cookie账号
var name1=getCookie('login')
var cartList2
showCart()
function showCart(){
    //获取locaStrong中的cartList2对应的数据
    cartList2=localStorage.getItem('cartList2')
    //判断该cookie是否存在
    if(name1){
        if(cartList2){
            //把cartList2中的数据转为json对象
            cartList2=JSON.parse(cartList2)
            //获取全选框是否被选中
            var quanxuan=cartList2.every(item=>{
                return item.select1==1
            })
            //获取所有被选中商品的总数量
            var tt=total1()
            //创建变量存放需要拼接的内容
            var str2=`
            <div class="b2 clearfix">
                <div class="top clearfix">
                    <h4><input type="checkbox" name="quan" ${quanxuan?'checked':''}>全选</h4>
                    <h4>商品名称</h4>
                    <h4>单价</h4>
                    <h4>数量</h4>
                    <h4>小计</h4>
                    <h4>操作</h4>
                </div>
            `
            //遍历数组中的所有对象
            cartList2.forEach(function(item){
                str2+=`
                <div class="content clearfix">
                    <h4><input type="checkbox" name="xuan" ${item.select1==1?"checked":''} data-id=${item.id}></h4>
                    <h4>
                        <img src="${item.img}" alt="">
                        <span>${item.name}</span>
                    </h4>
                    <h4>￥<span>${item.jg}</span></h4>
                    <h4><button data-id=${item.id}>-</button><input type="text" value="${item.number}"><button data-id=${item.id}>+</button></h4>
                    <h4>￥<span>${tt[2]}</span></h4>
                    <h4><input type="button" value="删除" data-id=${item.id}></h4>
                </div>
                `
            })
            //拼接结束标签
            str2+=`
                <div class="foot">
                    <h4><input type="checkbox" name="quan" ${quanxuan?'checked':''}>全选</h4>
                    <h4><input type="button" value="删除选中商品"></h4>
                    <h4>共计<span>${cartList2.length}</span>件商品,</h4>
                    <h4>已选择<span>${tt[0]}</span>件</h4>
                    <h4>合计：<span>￥<span>${tt[1]}</span></span></h4>
                    <h4><button>去结算</button></h4>
                </div>
            </div>
            `
            //把拼接好的内容添加到div对象中
            div1.innerHTML=str2
        }else{
            //拼接显示内容
            var str1=`
            <div class="b1 clearfix">
                <div class="b1-bb1">
                    <p class="iconfont">&#xe8e8;</p>
                    <h2><span>您的购物车里还没有商品，</span>你可以去看看<a href="./list.html">商城</a></h2>
                </div>
            </div>
            `
            //把拼接好的内容添加到div1中
            div1.innerHTML=str1
        }
    }else{
        alert('你还未登录，请登录后在进入')
        //跳转到登录界面
        location.href='./login.html?pathUrl='+href1
    }
}

//给父级对象绑定点击事件
div1.onclick=function(e){
    var e = e || window.event
    var target=e.target || e.srcElement
    //加法
    if(target.innerHTML=='+'){
        //获取当前对象中的data-id
        var d1=target.getAttribute('data-id')
        //获取上一个兄弟元素节点的value值
        var val=parseInt(target.previousElementSibling.value)
        //遍历数组
        cartList2.forEach(item=>{
            //判断遍历出来的商品是否跟当前操作的商品相等
            if(item.id==d1){
                item.number=item.number-0+1
            }
        })
        localStorage.setItem('cartList2',JSON.stringify(cartList2))
        showCart()
    }
    //减法
    if(target.innerHTML=='-'){
        //获取当前对象中的data-id
        var d2=target.getAttribute('data-id')
        //获取下一个兄弟元素节点的value值
        var val=parseInt(target.nextElementSibling.value)
        //遍历数组
        cartList2.forEach(item=>{
            //判断遍历出来的商品是否跟当前操作的商品相等
            if(item.id==d2 && val>1){
                item.number=item.number-1
            }
        })
        localStorage.setItem('cartList2',JSON.stringify(cartList2))
        showCart()
    }
    if(target.value=='删除'){
        //获取当前对象中的data-id
        var id3=target.getAttribute('data-id')
        //过滤不满足条件的数据
        cartList2=cartList2.filter(item=>{
            return item.id!=id3
        })
        localStorage.setItem('cartList2',JSON.stringify(cartList2))
        showCart()
    }
    //全选框
    if(target.name=='quan'){
        //遍历所有商品
        cartList2.forEach(item=>{
            //判断当前全选框是否被选中
            if(target.checked){
                item.select1=1
            }else{
                item.select1=0
            }
        })
        localStorage.setItem('cartList2',JSON.stringify(cartList2))
        showCart()
    }
    //选中框
  if(target.name=='xuan'){
    //获取当前商品的id
    var id4=target.getAttribute('data-id')
    //遍历数组
    cartList2.forEach(item=>{
      //判断是否为当前操作的商品
      if(item.id==id4){
       //  item.is_select=item.is_select==1?0:1
       //再次判断当前操作的商品是否被选中
         if(item.select1==1){
           item.select1=0
         }else{
           item.select1=1
         }
      }
    })
    //把修改之后的cartList2添加到locaStrong中
    localStorage.setItem('cartList2',JSON.stringify(cartList2))
    showCart()
 }
 //结算
 if(target.innerHTML=='去结算'){
     //获取需要支付的总金额
     var tatalprice=total1()[1]
     //使用确认框来再次确定是否购买
     if(confirm("你确定要购买吗？")){
         alert("你已支付：￥"+tatalprice)
         //从购物车中删除已购买的商品
         cartList2=cartList2.filter(item=>{
             return item.select1!=1
         })
     }
     //把修改之后的cartList2添加到locaStrong中
    localStorage.setItem('cartList2',JSON.stringify(cartList2))
    showCart()
 }
 if(target.value=='删除选中商品'){
    cartList2=cartList2.filter(item=>{
        return item.select1!=1
    })
     //把修改之后的cartList2添加到locaStrong中
     localStorage.setItem('cartList2',JSON.stringify(cartList2))
     showCart()
 }
}
//总计方法
function total1(){
    //商品总数量
    var num=0
    //商品总价格
    var numprice=0
    //小计
    var xiaoji=0
    //遍历数组元素
    cartList2.forEach(item=>{
        xiaoji=parseInt(item.number)*parseFloat(item.jg)
        //判断该商品是否被选中
        if(item.select1==1){
            //累加所有被选中商品的数量
        num+=parseInt(item.number)
        //累加所有被选中商品的小计
        numprice+=parseInt(item.number)*parseFloat(item.jg)
        }
    })
    return [num,numprice.toFixed(2),xiaoji.toFixed(2)]
}