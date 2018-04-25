//公用方法调用

mgj.public.navFn();
mgj.public.lazyLoading();
mgj.public.backToTop();

var mgjBanner=new Carousel();
mgjBanner.init({
	id:'bannerPic',
	autoplay:true,
	intervalTime:3000,
	loop:true,
	totalNum:7,
	moveNum:1,
	circle:true,
	circleInner:false,
	moveWay:'opacity',
	twoSideClick:false,
	changeBg:true
})
	
/*
 * 限时抢购
 */
;(function(){
	var panic=mgj.ga('#panic-buying .time span');
	var endTime=new Date(2017,7,9);
	var timer=setInterval(function(){
		var hours=mgj.cutTime(endTime).h;
		var minutes=mgj.cutTime(endTime).m;
		var seconds=mgj.cutTime(endTime).s;
		panic[0].innerHTML=mgj.format(hours)+' : ';
		panic[1].innerHTML=mgj.format(minutes)+' : ';
		panic[2].innerHTML=mgj.format(seconds);
	},1000)			
})()

/*
 * 红人穿搭
 */
;(function(){
	var lis=mgj.ga('#hongren li');
	var imgs
	
    setTimeout(function(){
    	changePic(lis[Math.floor(Math.random()*5)]);
    },2000);
    
	setInterval(function(){
		changePic(lis[Math.floor(Math.random()*5)]);		
	},5000);
	
	function changePic(obj){
		var img=obj.querySelector('img');
		var imgSrc=img.src;
		
		var text=obj.querySelector('h3 a');
		var textCon=text.innerHTML;
		obj.style.transform='rotateY(90deg)';	
		var end=false;
		obj.addEventListener('transitionend',function(){	
			if(!end){
				img.src=img.getAttribute('data-src');
			   
			    text.innerHTML=text.getAttribute('data-content');
			    
				this.style.transform='rotateY(0deg)';
				img.setAttribute('data-src',imgSrc);
				text.setAttribute('data-content',textCon);
				end=true;
			}			    				
		})				
	}		
})()

/*
 * 左边栏
 */
;(function(){
	var brandSell=mgj.g('#brandsell');
	var leftside=mgj.g('#left-side');
	var divs=mgj.ga('#left-side div');
	var sections=mgj.ga('.same');
	var secArr=[];
	for(var i=0;i<sections.length-1;i++){
		secArr.push(sections[i])
	}	
	mgj.addEvent(window,'scroll',leftSide);	
	leftSide();
	var onScroll=false;
	var timer;
	function leftSide(){
		console.log(6)
		var scrollTop=window.pageYOffset+window.innerHeight;
	    leftside.style.opacity=scrollTop>brandSell.offsetTop+850?1:0;
	    for(var i=0;i<secArr.length;i++){
			divs[i].index=secArr[i].index=i;
			if(!onScroll){
				if(secArr[i].offsetTop+850<scrollTop){
					for(var j=0;j<divs.length;j++){
						divs[j].className='';
					}
					divs[i].className='active';											
				}
			}							
		}
	}
	for(var i=0;i<divs.length;i++){
		divs[i].index=secArr[i].index=i;
		divs[i].onclick=function(){
			for(var j=0;j<divs.length;j++){
				divs[j].className='';
			}
			this.className='active';
			clearInterval(timer)
			onScroll=true
			var This=this;
			timer=setInterval(function(){				
				var top=window.pageYOffset;
				if(secArr[This.index].offsetTop>top){
					top+=150;
					if(Math.abs(secArr[This.index].offsetTop-top)<=150){
						clearInterval(timer);
						onScroll=false;
					}
				}
				if(secArr[This.index].offsetTop<top){
					top-=150;
					if(Math.abs(secArr[This.index].offsetTop-top)<=150){
						clearInterval(timer);
						onScroll=false;
					}
				}
				window.scrollTo(secArr[This.index].offsetTop,top);								
			},25)			
		}
	}
})();

/*
 * 精选专题
 */
var special=new Carousel();
special.init({
	id:'carousel-special',
	autoplay:true,
	intervalTime:3000,
	loop:true,
	totalNum:5,
	moveNum:1,
	circle:true,
	circleInner:true,
	moveWay:'position',
	twoSideClick:true,
	changeBg:false
})
