;(function(window,undefined){
	var Carousel=function(){
		this.settings={
			id:'',
			autoplay:false,
			intervalTime:3000,
			loop:false,
			totalNum:5,
			moveNum:1,
			circle:true,
			circleInner:false,
			moveWay:'opacity',
			twoSideClick:false,
			changeBg:false
		}
	}
	Carousel.prototype={
		construtor:Carousel,
		init:function(opt){
			var opt=opt||this.settings;
			for(var attr in opt){
				this.settings[attr]=opt[attr]
			}
			this.createDom();
			
		},
		createDom:function(){
			this.box=document.getElementById(this.settings.id);
			this.boxParent=this.box.parentNode.parentNode;
			var This=this;
			if(this.settings.twoSideClick){								
				this.prevBtn=document.createElement('div');
				this.prevBtn.className='prev';
				this.prevBtn.innerHTML='<';	
				this.prevBtn.onclick=function(){
					This.prevFn();
					if(This.settings.changeBg){
						This.bgChange();
					}
				}
				this.box.appendChild(this.prevBtn);
				this.nextBtn=document.createElement('div');
				this.nextBtn.className='next';
				this.nextBtn.innerHTML='>';
				this.nextBtn.onclick=function(){
					This.nextFn();
					if(This.settings.changeBg){
						This.bgChange();
					}
				}
				this.box.appendChild(this.nextBtn);
			}
			
			
			if(this.settings.circle){
				this.circleWrap=document.createElement('div');
				this.circleWrap.className='circle';
				this.circleArr=[];
				this.num=this.settings.totalNum/this.settings.moveNum;
				for(var i=0;i<this.num;i++){
					var span=document.createElement('span');
					if(this.settings.circleInner){
						span.innerHTML='0'+(1+Number(i));
					}
					span.index=i;
					span.onclick=function(){
						This.cn=this.index
						This[This.settings.moveWay+'Fn']();
						if(This.settings.changeBg){
							This.bgChange();
						}
						
					}
					this.circleWrap.appendChild(span);
					this.circleArr.push(span)
				}
				
				this.circleArr[0].className='active'
				this.box.appendChild(this.circleWrap) 
			}
			this.moveInit()
		},
		moveInit:function(){
			this.cn=0;
			this.ln=0;
			this.canClick=true;
			this.endNum=this.settings.totalNum/this.settings.moveNum;
			this.opacityItem=this.box.children[0].children;
			this.positionItemWrap=this.box.children[0].children[0]
			this.positionItem=this.positionItemWrap.children;

			switch(this.settings.moveWay){
				case 'opacity':
				for(i=0;i<this.opacityItem.length;i++){
					this.opacityItem[i].style.opacity=0;
					this.opacityItem[i].style.transition='0.3s opacity';
			
				}
				this.opacityItem[0].style.opacity=1;
				break;
				case 'position':
				this.leftMargin=parseInt(getComputedStyle(this.positionItem[0]).marginLeft);
				this.rightMargin=parseInt(getComputedStyle(this.positionItem[0]).marginRight);
				this.singleWidth=this.leftMargin+this.rightMargin+this.positionItem[0].offsetWidth;
				  
				if(this.settings.loop){
					this.positionItemWrap.innerHTML+=this.positionItemWrap.innerHTML;
					
				}
				this.positionItemWrap.style.width=this.singleWidth*this.positionItem.length+'px'
			}
			if(this.settings.autoplay){
				this.autoPlay()
			}
			
		},
		opacityFn:function(){
			if(this.cn<0){
				if(this.settings.loop){				
					this.cn=this.endNum-1;
				}else{
					this.cn=0;
					this.canClick=true;
				}
			}
			if(this.cn>this.endNum-1){
				if(this.settings.loop){
					this.cn=0;
				}else{
					this.cn=this.endNum-1;
					this.canClick=true;
				}
			}

			this.opacityItem[this.ln].style.opacity=0;

			this.circleArr[this.ln].className='';
			
			this.opacityItem[this.cn].style.opacity=1;
			this.circleArr[this.cn].className='active';
			
			var end=0
			var This=this;
			this.opacityItem[this.cn].addEventListener('transitionend',function(){
				end++;
				if(end==1){
					This.canClick=true;
					This.ln=This.cn;
				}
				This.endFn()
			})
		},
		positionFn:function(){
			if(this.cn<0){
				if(this.settings.loop){					
					this.positionItemWrap.style.left=-this.positionItemWrap.offsetWidth/2+'px';
					this.cn=this.endNum-1;
				}else{
					this.cn=0;					
				}
			}
			
			if(this.cn>this.endNum-1){
				if(this.settings.loop){					
					this.positionItemWrap.style.left=0;
					this.cn=0;
					
				}else{
					this.cn=this.endNum-1;					
				}
			}
			
			this.circleArr[this.ln].className='';
			
			this.circleArr[this.cn].className='active';
			
			var This=this;
			move(this.positionItemWrap,{left:-this.cn*this.singleWidth*this.settings.moveNum},500,'linear',function(){
				This.canClick=true;
				if(This.cn==This.endNum){
					this.style.left=0;
					This.cn=0;		
				}
				This.ln=This.cn
				This.endFn()
				
			})
			
		},
		prevFn:function(){
			if(!this.canClick){
				return;
			}
			this.canClick=false;
			this.cn--;
			
			
			this[this.settings.moveWay+'Fn']();
			
		},
		nextFn:function(){
			if(!this.canClick){
				return;
			}
			this.canClick=false;
			this.cn++;
			this[this.settings.moveWay+'Fn']();

		},
		on:function(evtName,listener){
			this.events=this.events||{};
			this.events[evtName]=this.events[evtName]||[];
			this.events[evtName].push(listener);
			
			
		},
		trigger:function(evtName){
			if(this.events&&this.events[evtName]){
				for(var i=0;i<this.events[evtName].length;i++){
					this.events[evtName][i].call(this)
				}
			}		
		},
		endFn:function(){
			if(!this.settings.loop){
				if(this.cn==0){
					this.trigger('leftEnd')
				}
				if(this.cn==this.endNum-1){
					this.trigger('rightEnd')
				}
			}
		},
		autoPlay:function(){
			var This=this;
			this.timer=setInterval(function(){
				This.nextFn();
				if(This.settings.changeBg){
					This.bgChange();
				}
				
			},this.settings.intervalTime);
			this.box.onmouseenter=function(){
				clearInterval(This.timer)
			}
			this.box.onmouseleave=function(){
				This.autoPlay()
			}
		},
		bgChange:function(){
			var colorArr=['#baf0e3','#fa85af','#b4e4ee','#9ed5d0','#ff888a','#fec35f','#73d2e4'];
			this.boxParent.style.background=colorArr[this.cn];
		}
	}
	window.Carousel=Carousel;
})(window,undefined);
