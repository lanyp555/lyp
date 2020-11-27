<?php
header('content-type:text/html;cahrset=utf-8');
//连接数据库
$link=mysqli_connect('127.0.0.1','root','','ty');
//设置编码
mysqli_set_charset($link,'utf8');
$u=$_GET['user'];
$p=$_GET['pass'];
 
//先查询该账号是否被注册过
//SQL语句
$sql="select * from aa where name='$u'";
//执行SQL
$result=mysqli_query($link,$sql);

//判断
if(mysqli_fetch_row($result)){
     echo"<script>
     alert('账号已存在');
     window.location.href='http://localhost/2007/demo1/html1/zhuce.html';
    </script>
     ";
}else{
    //SQL语句2
    $sql2="insert into aa(name,pass) values('$u','$p')";
    //执行
    mysqli_query($link,$sql2);
    echo"<script>
     alert('注册成功');
     window.location.href='http://localhost/2007/demo1/html1/login.html';
    </script>
     ";
}
?>