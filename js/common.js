window.mgj={
	g:function(name){
		return document.querySelector(name);
	},
	ga:function(name){
		return document.querySelectorAll(name);
	},
	addEvent:function(obj,evt,fn){
		if(obj.addEventListener){
			obj.addEventListener(evt,fn);
		}else{
			obj.attachEvent('on'+evt,fn);
		}
	},
	removeEvent:function(obj,evt,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(evt,fn);
		}else{
			obj.detachEvent('on'+evt,fn);
		}
	},
	cutTime:function(target){
		var curTime=new Date();
		var v=Math.abs(target-curTime);
		return {
			d:parseInt(v/(24*3600000)),
			h:parseInt(v%(24*3600000)/3600000),
			m:parseInt(v%(24*3600000)%3600000/60000),
			s:parseInt(v%(24*3600000)%3600000%60000/1000)
		}		
	},
	format:function(v){
		return v=v<10?'0'+v:v;
	},
	getTopValue:function(obj){
		var top=0;
		while(obj.offsetParent){
			top+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return top;
	},
	public:{
		navFn:function(){
			var panic=mgj.g('#panic-buying');
			var sFixed=mgj.g('.search-wrap');
			mgj.addEvent(window,'scroll',setFixed);
			setFixed();
			function setFixed(){
				if(window.pageYOffset>panic.offsetTop+panic.offsetHeight){
					sFixed.id='search-fix';
				}else{
					sFixed.id='';
				}
			}
		},
		lazyLoading:function(){						
			mgj.addEvent(window,'scroll',delayImg);			
			delayImg();
			function delayImg(){
				var originals=mgj.ga('.lazyLoad');
				var sTop=window.innerHeight+window.pageYOffset;
				for(var i=0;i<originals.length;i++){
					if(mgj.getTopValue(originals[i])<sTop){
						originals[i].src=originals[i].getAttribute('data-original');
					}

				}
				if(originals[originals.length-1].getAttribute('src')!="hongren/empty.gif"){
					mgj.removeEvent(window,'scroll',delayImg);
				}
			}			
		},
		backToTop:function(){
			var backTop=mgj.g('#right-side .toTop');
			var timer;
			backTop.onclick=function(){
				timer=setInterval(function(){
					var top=window.pageYOffset;
					top-=150;
					if(top<=0){
						top=0;
						clearInterval(timer)
					}
					window.scrollTo(0,top)
					
				},25)
				
			}
		}
	}
	
}
