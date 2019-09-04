<template>
	<div class="outContainer">
		<canvas id='loginBackground'></canvas>
	</div>
</template>

<script>
	let animateResId = null; 
    export default {

      	name: "canvasBackground",

      	data(){
	      	return{
	      		screenWidth:null,
	      		screenHeight:null,
	      		loginCanvas:null,
	      		ctx:null,
	      		starNumber:200,
	      		metorNumber:20,
	      		starArr:null,
	      		metorArr:null,
	      	}
      	},

      	//mounted 
       	mounted:function(){
       		let _this = this;
       		this.screenWidth = $(window).width();
	      	this.screenHeight = $(window).height();
	      	this.loginCanvas = $('#loginBackground');
	      	this.ctx = this.loginCanvas[0].getContext("2d");
	      	// init canvas
	      	if(this.loginCanvas && (this.screenWidth || this.screenHeight)){
	      		this.loginCanvas.width(this.screenWidth).height(this.screenHeight);
	      		this.loginCanvas[0].width = this.screenWidth;
	      		this.loginCanvas[0].height = this.screenHeight;
	      	}
	      	//init stars and metors
	      	this.starArr = this.initManyStar();
      		this.metorArr = this.initManyMetor();
      		// window resize
      		window.onresize = function(){
	      		_this.screenWidth = $(window).width();
	      		_this.screenHeight = $(window).height();
	      		if(_this.loginCanvas && (_this.screenWidth || _this.screenHeight)){
		      		_this.loginCanvas.width(_this.screenWidth).height(_this.screenHeight);
		      		_this.loginCanvas[0].width = _this.screenWidth;
		      		_this.loginCanvas[0].height = _this.screenHeight;
		      	}
		      	window.cancelAnimationFrame(animateResId);
		      	_this.starArr = _this.initManyStar();
		      	_this.metorArr = _this.initManyMetor();
		      	_this.blink();
	      	}
	      	// start move 
	      	if(!!this.starArr && !!this.metorArr){
	      		this.blink();
	      	}
       	},
       	// end mounted

       	// methods
       	methods:{
	      	//创建星星对象
	      	initOneStar:function(){
	      		let _this = this;
	      		const {ctx} = this;
	      		class Star{
	      			constructor(posx,posy,color,radius){
	      				this.posx = posx;
	      				this.posy = posy;
	      				this.color = color;
	      				this.radius = radius;
	      			}
	      			//绘制
	      			draw(){
	      				// console.log(_this);
	      				ctx.beginPath();
	      				ctx.strokeStyle = this.color;
						ctx.arc(this.posx,this.posy,this.radius,0,2*Math.PI);
						ctx.fillStyle=this.color;
						ctx.closePath();
						ctx.fill(); 
						ctx.stroke();
	      			}
	      			
	      		}
	      		return Star;
	      	},
	      	//创建流星对象
	      	initOneMetor:function(){
	      		let _this = this;
	      		const {ctx} = this;
	      		class Metor{
	      			constructor(posx,posy,width,lengthOfTail,color,alpha,rotate,speed){
	      				this.posx = posx;
	      				this.posy = posy;
	      				this.width = width;
	      				this.color = color;
	      				this.rotate = rotate;
	      				this.lengthOfTail = lengthOfTail;
	      				this.speed = speed;
	      				this.alpha = alpha;
	      			}
	      			//绘制
	      			draw(){
	      				ctx.save();
	      				ctx.beginPath();
	      				ctx.lineWidth = this.width;
	      				let linearGradient = ctx.createLinearGradient(this.posx,this.posy,this.posx+this.lengthOfTail,this.posy-this.lengthOfTail);
	      				linearGradient.addColorStop(0.1, "white");
				        linearGradient.addColorStop(0.2, '#0083DD');
				        linearGradient.addColorStop(0.8, '#2E62DF');
				        ctx.strokeStyle = linearGradient;
				        ctx.moveTo(this.posx, this.posy);
				        ctx.lineTo(this.posx+this.lengthOfTail,this.posy-this.lengthOfTail);
				        ctx.closePath();
				        ctx.stroke();
				        ctx.restore();
	      			}
	      		}
	      		return Metor;
	      	},
	      	//闪烁
			blink:function(){
				let _this = this;

				// _this.ctx.clearRect(0,0,this.screenWidth,this.screenHeight); 
				for(let i=0,length=this.starArr.length;i<length;i++){
					let isBlink = Math.random();
					this.starArr[i].draw();
					if(isBlink>0.925){
						// this.starArr[i].color = '#'+Math.random().toString(16).substr(2,6);
						this.starArr[i].color = 'rgba(255,255,255,'+this.random16(3)+')';
					}
				}
				for(let i=0,length=this.metorArr.length;i<length;i++){
					this.metorArr[i].draw();
					if(this.metorArr[i].posx < 0 || this.metorArr[i.posy > _this.screenHeight]){
						this.metorArr[i].posx = this.screenWidth * this.random16(5);
						this.metorArr[i].posy = this.screenHeight * this.random16(5);
					}else{
						this.metorArr[i].posx -= this.metorArr[i].speed;
						this.metorArr[i].posy += this.metorArr[i].speed;
					}
					if(this.metorArr[i].speed > 30){
						this.metorArr[i].speed = Math.floor((Math.random()+3)*2);
					}
				}
				animateResId = window.requestAnimationFrame(function(){
					_this.ctx.clearRect(0,0,_this.screenWidth,_this.screenHeight);
					_this.blink();
				})
			},
	      	//创建很多个星星
	      	initManyStar:function(){
	      		let stars = [];
	      		for(let i=0,length=this.starNumber;i<length;i++){
		      		let posx = this.screenWidth * this.random16(5),
		      			posy = this.screenHeight * this.random16(5),
		      			color = '#'+Math.random().toString(16).substr(2,6),
		      			radius = 1,
		      			star = new (this.initOneStar())(posx,posy,color,radius);
		      		stars.push(star);
	      		}
	      		return stars;
	      	},
	      	//创建很多个流星
	      	initManyMetor:function(){
	      		let metors = [];
	      		for(let i=0,length=this.metorNumber;i<length;i++){
		      		let posx = this.screenWidth * this.random16(5),
		      			posy = this.screenHeight * this.random16(5),
		      			color = 'rgb(255,255,255)',
		      			width = 2,
		      			lengthOfTail = 80,
		      			alpha = 0.8,
		      			rotate = 30,
		      			speed = Math.floor((Math.random()+3)*2),
		      			metor = new (this.initOneMetor())(posx,posy,width,lengthOfTail,color,alpha,rotate,speed);
		      		metors.push(metor);
	      		}
	      		return metors;
	      	},
	      	//十六进制 random
	      	random16:function(numberOfStr){
	      		return Number(Math.random().toString().substr(0,numberOfStr));
	      	} 
      	},
      	// end methods

  	};
</script>

<style scoped>
	input:-webkit-autofill{    
		-webkit-box-shadow: 0 0 0px 1000px white inset !important; 
	}
	.outContainer{
		width: 100%;
		height: 100%;
		background-image:url(../../../static/image/background.png);
		background-size: cover;
		position: relative;
	}
	#loginBackground{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
	}

</style>