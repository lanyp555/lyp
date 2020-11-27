var nav1=document.querySelector('.b3-bb2-b1')
var lis=nav1.querySelectorAll('li')
var nr=document.querySelector('.b3-bb2-b2')
var ps1=nr.querySelectorAll('p')

for(var i=0;i<lis.length;i++){
    lis[i].index=i 
    lis[i].onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].className=''
            ps1[i].style.display='none'
        }
    this.className='li1'
    ps1[this.index].style.display='block'
    }
    for(var j=1;j<lis.length;j++){
        lis[j].className=''
        ps1[j].style.display='none'
    }
}