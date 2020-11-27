
//获取操作对象
var div1=document.querySelector('.B')
//获取地址栏中的参数
var ids=location.search
var data
//判断地址栏中是否有参数
if(ids){
    //获取id值
    var mm=ids.split('=')[1]
    //使用ajax发送请求，并获取响应结果
    ajax({
        url:'../php1/xiangqing.php',
        data:'id='+mm,
        success:function(dt1){
            //转换为json对象
            data=JSON.parse(dt1)
            //拼接详情页信息
            var str=`
            <div class="b">
                <div id="b1">
                    <img src="${data.img}" alt="">
                    <div class="mark"></div>
                </div>
                <div class="box-right">
                    <img src="${data.img}" alt="">
                </div>
                <div id="imgs">
                    <img src="${data.img}" alt="" class="a1">
                    <img src="${data.img1}" alt="">
                    <img src="${data.img2}" alt="">
                    <img src="${data.img3}" alt="">
                    <p style="clear: both;"></p>
                </div>
            </div>
            <div class="b2">
                <h2>${data.name}</h2>
                <p>￥<span>${data.jg}</span></p>
                <div class="b2-bb1">
                    <span>数量：</span><button>-</button><input type="text" value="${data.number}"><button>+</button>
                </div>
                <ul>
                    <li>舒适生活，清新感受</li>
                    <li>内部清洁功能，送风更清新</li>
                    <li>凉感控制</li>
                    <li>左右自动送风</li>
                    <li>3级能效</li>
                </ul>
                <div class="b2-bb2">
                    <a href="./cart.html">立即购买</a>
                    <button type="button">加入购物车</button>
                </div>
            </div>
            `
            //把拼接好的数据添加到div对象中
            div1.innerHTML=str
            //获取操作对象
var box=document.querySelector('#b1')
var mark=document.querySelector('.mark')
var right=document.querySelector('.box-right')
var imgdiv=document.querySelector('#imgs')
var imgs=imgdiv.querySelectorAll('img')
var b=document.querySelector('.b2')

b.onclick=function(e){
    var e = e || window.event
    var target=e.target || e.srcElement
    //加法
    if(target.innerHTML=='+'){
        //获取上一个兄弟元素节点的value值
        var val=parseInt(target.previousElementSibling.value)
        val++
        target.previousElementSibling.value=val
    }
    if(target.innerHTML=='-'){
        //获取减法按钮后面的输入框对象
        var val=parseInt(target.nextElementSibling.value)
        if(val<=1){
            val=1
        }else{
            val--
        }
        target.nextElementSibling.value=val
    }
}

for(let i=0;i<imgs.length;i++){
    imgs[i].onclick=function(){
        for(let j=0;j<imgs.length;j++){
            imgs[j].className=''
        }
        imgs[i].className='a1'
        var img1=box.querySelector('img')
        var img2=right.querySelector('img')
        img1.src=imgs[i].src
        img2.src=imgs[i].src
    }
}

function show1(e){
    //光标相对于小盒子居中显示
    var left1=e.clientX-box.offsetLeft-(mark.offsetWidth/2)
    var top1=e.pageY-box.offsetTop-(mark.offsetHeight/2)

    //设置小盒子的移动范围
    var minX=minY=0
    var maxX=box.offsetWidth-mark.offsetWidth
    var maxY=box.offsetHeight-mark.offsetHeight
    //右边图片移动距离
    var tmpX,tmpY
    //水平移动
    if(left1<minX){
        mark.style.left=minX+'px'
        tmpX=minX
    }else if(left1>maxX){
        mark.style.left=maxX+'px'
        tmpX=maxX
    }else{
        mark.style.left=left1+'px'
        tmpX=left1
    }
    //垂直方向移动
    if(top1<minY){
        mark.style.top=minY+'px'
        tmpY=minY
    }else if(top1>maxY){
        mark.style.top=maxY+'px'
        tmpY=maxY
    }else{
        mark.style.top=top1+'px'
        tmpY=top1
    }

    //获取右边图片对象
    var img=right.querySelector('img')
    img.style.left=-2*tmpX+'px'
    img.style.top=-2*tmpY+'px'
}

//给box对象绑定鼠标移入、移出、移动事件
box.onmouseover=function(e){
    var e = e || window.event
    mark.style.display='block'
    right.style.display='block'
    show1(e)      
}
box.onmousemove=function(e){
    var e = e || window.event
    show1(e)
}
box.onmouseout=function(e){
    mark.style.display='none'
    right.style.display='none'
}
        }
    })
}else{
    alert('未知商品，请重新选择')
    location.href='./list.html'
}

//给父节点对象绑定一个点击事件
div1.onclick=function(e){
    var e = e || window.event
    var target=e.target || e.srcElement
    //判断点击的对象是否为‘加入购物车’
    if(target.innerHTML=='加入购物车'){
        //获取locaStrong中的cartList2对象
        var cartList2=localStorage.getItem('cartList2')
        //判断该键名是否存在
        if(cartList2){
            //转为json对象
            var arr1=JSON.parse(cartList2)
            var a=0 //locaStrong中是否有现在要添加的商品
            //遍历arr1对象
            arr1.forEach(function(item){
                //判断该内容是否跟我们添加的内容相同
                if(item.id==data.id){
                    //如果已存在，那么直接修改当前数组对象中对应商品的数量
                    item.number++
                    localStorage.setItem('cartList2',JSON.stringify(arr1))
                    a=1
                }
            })
            //判断a是否为0,如果为0时，代表当前添加的商品，在locaStrong中不存在
            if(!a){
                //修改当前添加的商品数量
                data.number=1
                //把当前添加的商品追加到数组中
                arr1.push(data)
                localStorage.setItem('cartList2',JSON.stringify(arr1))
            }
        }else{
            data.number=1
            localStorage.setItem('cartList2',JSON.stringify([data]))
        }
    }
}