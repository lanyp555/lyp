var nav1=document.querySelector('.nav11')
var lis=nav1.querySelectorAll('li')
var nr=document.querySelector('.nav22')
var ps1=nr.querySelectorAll('ol')
var nav=document.querySelector('.nav1')

for(var i=0;i<lis.length;i++){
    lis[i].index=i 
    lis[i].onmouseover=function(){
        for(var i=0;i<lis.length;i++){
            ps1[i].style.display='none'
            ps1[this.index].style.display='block'
        }
        ps1[this.index].onmouseover=function(){
            this.style.display='block'
        }
        ps1[this.index].onmouseout=function(){
            this.style.display='none'
        }
    }
    lis[i].onmouseout=function(){
        for(var i=0;i<lis.length;i++){
            ps1[i].style.display='none'
        }
        ps1[this.index].style.display='none'
    }
}
