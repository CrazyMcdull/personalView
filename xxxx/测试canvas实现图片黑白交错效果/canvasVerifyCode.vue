<template>
	<div class="outContainer">
		<canvas :id='"verifyCode"+idx' @click='reload'></canvas>
		<p class="reloadLink" @click='reload'>看不清？点击换一张(不区分大小写)</p>
	</div>
</template>

<script>
	let timer = null;
	const words = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	export default {
		name:'canvasVerifyCode',
		props:['reloadVerify','idx'],
		data(){
			return({
				codeCanvas:null,
				ctx:null,
				lineNum:2,
				canvasWidth:100,
				canvasHeight:30,
				textArr:[],
			});
		},
		//mounted 
       	mounted:function(){
       		let _this = this;
	      	this.codeCanvas = $('#'+'verifyCode'+this.idx);
	      	this.ctx = this.codeCanvas[0].getContext("2d");
	      	this.codeCanvas[0].width = this.canvasWidth;
	      	this.codeCanvas[0].height = this.canvasHeight;
	      	// init backColor
	      	_this.reload();
	      	
	    },
	    methods:{
	    	//创建底色
	    	initBackColor:function(){
	    		const _this = this;
	      		const {ctx} = this;
	      		class BackColor{
	      			constructor(color1,color2){
	      				this.color1 = color1;
	      				this.color2 = color2	      			
	      			}
	      			//绘制
	      			draw(){
	      				let lg = ctx.createLinearGradient(0,0,100,0); 
						lg.addColorStop(0, this.color1);    
						lg.addColorStop(1, this.color2);
						ctx.fillStyle = lg;
						ctx.beginPath();
						ctx.fillRect(0,0,100,30);
	      			}
	      			
	      		}
	      		return BackColor;
	    	},
	    	//创建随机线条
	    	initLine:function(){
	    		const _this = this;
	      		const {ctx} = this;
	    		class RandomLine{
	    			constructor(posx,posy,pos_x,pos_y,color,width){
	    				this.posx = posx;
	    				this.posy = posy;
	    				this.pos_x = pos_x;
	    				this.pos_y = pos_y;
	    				this.width = width;
	    				this.color = color;
	    			}
	    			draw(){
	    				ctx.save();
	      				ctx.beginPath();
	      				ctx.lineWidth = this.width;
	      				ctx.strokeStyle = this.color;
				        ctx.moveTo(this.posx, this.posy);
				        ctx.lineTo(this.pos_x,this.pos_y);
				        ctx.closePath();
				        ctx.stroke();
				        ctx.restore();
	    			}
	    		}
	    		return RandomLine;
	    	},
	    	//创建随机点
	    	initPoint:function(){
	      		let _this = this;
	      		const {ctx} = this;
	      		class Point{
	      			constructor(posx,posy,color){
	      				this.posx = posx;
	      				this.posy = posy;
	      				this.color = color;
	      			}
	      			//绘制
	      			draw(){
	      				// console.log(_this);
	      				ctx.beginPath();
	      				ctx.strokeStyle = this.color;
						ctx.arc(this.posx,this.posy,1,0,2*Math.PI);
						ctx.fillStyle=this.color;
						ctx.closePath();
						ctx.fill(); 
						ctx.stroke();
	      			}
	      			
	      		}
	      		return Point;
	      	},
	    	//创建文字
	    	initText:function(){
	    		let _this = this;
	      		const {ctx} = this;
	      		class RandomText{
	      			constructor(text,posx,posy,color){
	      				this.text = text;
	      				this.posx = posx;
	      				this.posy = posy;
	      				this.color = color;
	      			}
	      			draw(){
	      				ctx.save();
	      				ctx.beginPath();
	      				ctx.font = "20pt Calibri";
	      				ctx.fillStyle = this.color;
						ctx.fillText(this.text,this.posx,this.posy);
						ctx.restore();
	      			}
	      		}
	      		return RandomText;
	    	},
	    	reload:function(){
	    		const _this = this;
	    		let backColor = new (this.initBackColor())('#'+Math.random().toString(16).substr(2,6),'#'+Math.random().toString(16).substr(2,6));
	    		this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
	    		this.textArr = [];
	    		//--------------哈哈哈哈，我就是让你不能一下子就能得到------------------
	    		timer = setTimeout(function(){
	    			backColor.draw();
			      	for(let i=0,num=Math.ceil(_this.lineNum+Math.random()*2);i < num;i++){
			      		let posx = Math.ceil(Math.random()*3);
			      		let posy = Math.ceil(Math.random()*30);
			      		let pos_x = 50+Math.ceil(Math.random()*50);
			      		let pos_y = Math.ceil(Math.random()*30);
			      		new (_this.initLine())(posx,posy,pos_x,pos_y,'#'+Math.random().toString(16).substr(2,6),1).draw();
			      	}
			      	for(let i=0,num=10;i<num;i++){
			      		let posx = Math.ceil(Math.random()*100);
			      		let posy = Math.ceil(Math.random()*30);
			      		new (_this.initPoint())(posx,posy,'#'+Math.random().toString(16).substr(2,6)).draw();
			      	}
			      	for(let i=0;i<4;i++){
			      		let text = words[Math.ceil(Math.random()*61)];
			      		let posx = 25*i;
			      		new (_this.initText())(text,posx,25,'#'+Math.random().toString(16).substr(2,6)).draw();
			      		_this.textArr.push(text.toUpperCase());
			      	}
			      	_this.reloadVerify(_this.textArr,_this.reload);
	    		},100)
	    		// -------------------------------
	    	},
	    },

	    destoryed:function(){
	    	clearTimeout(timer);
		    timer = null;
	    }
	};
</script>

<style scoped>
	.outContainer{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	canvas{
		border-radius: 3px;
		margin-left: 20px;
		cursor: pointer;
		/*background-image: url(../../../static/image/verifyloading.gif);
		background-size: cover;*/
	}
	.reloadLink{
		color: #58a8f2;
		margin-left: 20px;
		text-decoration: underline;
		font-size: 12px;
		cursor: pointer;
	}
</style>