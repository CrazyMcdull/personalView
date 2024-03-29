/*
生成弹性小球碰撞工具
I am kmh0228
QQ:1150123276
2017-06-20
*/
/*
使用方法说明
	1.此插件纯原生js编写，使用时引入此collision.js即可。
	2.生成容器，假设现有一个id为container的盒子做容器。
		var oB=new BallBox(‘container’);
			注：容器必须是有宽高的定位元素。尽量不要有边线。
	3.生成小球
		var ball=new Ball();
	4.把小球放入容器
		oB.addBall(ball);
	5.调用容器的ballRun方法，让小球开始运动。注意：此运动是完全弹性碰撞，不会损失能量。
		oB.ballRun();
	over
	
	参数说明
		容器参数  new BallBox(‘container’，opts);
			opts:{width:num,height:num}//没有边线和padding的时候可不写。有的情况下需要把容器真实宽高填进去。
		小球参数 new Ball(opts);
			opts:{
				e:小球DOM元素/原生对象，可填入页面DOM，不写则生成新DIV DOM,
				b:小球半径 默认30;包含边
				c:小球背景颜色/图片， 默认'pink'
				borderWidth:边线宽度 默认0
				borderColor:边线颜色 默认#000
				x:小球中心点的横坐标 默认为半径
				y:小球中心点的纵坐标 默认为半径
				sx:小球在x轴方向速度每30ms，默认3
				sy:小球在y轴方向速度每30ms，默认3
				m:小球的质量，默认b/30;
				html:小球内部的内容，不填则不会改变DOM本身的内容。
				fontSize:字体大小，默认12;
				opa:小球透明度，默认1；
				callBack:function  碰撞时的回掉函数，参数为碰撞的总次数，方法中this指向此球对象
			}
		小球方法：
				setB(num)//重新设置小球半径
				setC(str);//重新设置小球背景颜色/图片
				setBorderWidth(n);//重新设置小球边线宽度
				setBorderColor(str);//重新设置边线颜色
				setM(n);//重设小球质量,如果不给参数，则按照半径重新默认质量
				setHTML(str);//重设小球内容
				setOpa(n);//重设小球透明度

 
 */


function BallBox(a, b) {
	var c = this.container = document.getElementById(a);
	var b = this.opts = b || {};
	this.width = b.width || c.offsetWidth;
	this.height = b.height || c.offsetHeight;
	this.child = []
}
BallBox.prototype.addBall = function(a) {
	this.child.push(a);
	if (a.e.parentNode != this.container) {
		this.container.appendChild(a.e)
	}
};
BallBox.prototype.ballRun = function() {
	clearInterval(this.ballRunTimer);
	var g = this;
	var w = this.width;
	var h = this.height;
	var k = this.isColl;
	var l = this.coll;
	this.ballRunTimer = setInterval(function() {
		var a = g.child;
		var c = a.length;
		for (var i = 0; i < c; i++) {
			a[i].foot()
		}
		for (var i = 0; i < c; i++) {
			var d = a[i];
			var b = d.b;
			if (d.x < b) {
				d.x = b;
				d.sx *= -1
			}
			if (d.y < b) {
				d.y = b;
				d.sy *= -1
			}
			var e = w - b;
			if (d.x > e) {
				d.x = e;
				d.sx *= -1
			}
			var f = h - b;
			if (d.y > f) {
				d.y = f;
				d.sy *= -1
			}
		}
		for (var i = 0; i < c; i++) {
			for (var j = i + 1; j < c; j++) {
				if (k(a[i], a[j])) {
					l(a[i], a[j]);
					a[i].collNum++;
					a[i].callBack(a[i].collNum);
					a[j].collNum++;
					a[j].callBack(a[j].collNum)
				}
			}
		}
	}, 30)
};
BallBox.prototype.ballStop = function() {
	clearInterval(this.ballRunTimer)
};
BallBox.prototype.coll = function(a, b) {
	var c = b.x - a.x;
	var d = b.y - a.y;
	var e = b.sx - a.sx;
	var f = b.sy - a.sy;
	var g = Math.atan2(f, e);
	var h = Math.atan2(-d, -c);
	var i = Math.abs(h - g);
	var D = Math.PI / 2;
	if (i <= 3 * D && i >= D) return;
	var j = a.m || 1;
	var k = b.m || 1;
	var l = j + k;
	var m = ((j - k) * a.sx + 2 * k * b.sx) / l;
	var n = ((k - j) * b.sx + 2 * j * a.sx) / l;
	var o = ((j - k) * a.sy + 2 * k * b.sy) / l;
	var p = ((k - j) * b.sy + 2 * j * a.sy) / l;
	a.sx = m;
	a.sy = o;
	b.sx = n;
	b.sy = p
};
BallBox.prototype.isColl = function(a, b) {
	if (a.stopfoot || b.stopfoot) return false;
	var d = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
	var c = Math.pow(a.b + b.b, 2);
	return d < c
};

function Ball(a) {
	var a = this.json = a || {};
	var d = this.type = a.type || 'ball';
	var b = this.b = a.b || 30;
	var f = this.borderWidth = a.borderWidth || 0;
	var g = this.borderColor = a.borderColor || '#000';
	var x = this.x = a.x || b;
	var y = this.y = a.y || b;
	var h = this.sx = a.sx || 3;
	var i = this.sy = a.sy || 3;
	var m = this.m = a.m || (b / 30);
	var c = this.c = a.c || 'pink';
	var e = this.e = a.e || document.createElement('div');
	var j = this.html = a.html;
	var k = this.opa = a.opa || 1;
	var l = this.fontSize = a.fontSize || 12;
	var n = this.callBack = a.callBack ||
	function() {};
	this.collNum = 0;
	this.initStyle();
	this.addEvent()
}
Ball.prototype.initStyle = function() {
	var b = this.b;
	var s = this.e.style;
	s.position = 'absolute';
	s.top = s.left = 0;
	s.width = s.height = (b - this.borderWidth) * 2 + 'px';
	s.borderRadius = '50%';
	s.background = this.c;
	s.backgroundSize = 'cover';
	s.border = this.borderWidth + 'px solid ' + this.borderColor;
	s.opacity = this.opa;
	s.overflow = "hidden";
	s.cursor = "pointer";
	if (this.html) {
		this.e.innerHTML = this.html;
		s.textAlign = 'center';
		s.lineHeight = (b - this.borderWidth) * 2 + 'px';
		s.fontSize = this.fontSize + 'px'
	}
	this.setPos()
};
Ball.prototype.addEvent = function() {
	var a = this;
	this.e.onmouseenter = function() {
		a.stopFoot()
	};
	this.e.onmouseout = function() {
		a.startFoot()
	}
};
Ball.prototype.foot = function(n) {
	if (this.stopfoot) return;
	var n = n || 1;
	this.x += this.sx * n;
	this.y += this.sy * n;
	this.setPos()
};
Ball.prototype.startFoot = function() {
	this.stopfoot = false;
	this.e.style.zIndex = 1
};
Ball.prototype.stopFoot = function() {
	this.stopfoot = true;
	this.e.style.zIndex = 999
};
Ball.prototype.setPos = function() {
	var b = this.b;
	var x = parseInt(this.x - b);
	var y = parseInt(this.y - b);
	this.e.style.transform = 'translate(' + x + 'px,' + y + 'px)';
	this.e.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)'
};
Ball.prototype.setB = function(n) {
	var b = this.b = n;
	var s = this.e.style;
	s.width = s.height = (b - this.borderWidth) * 2 + 'px';
	s.lineHeight = (b - this.borderWidth) * 2 + 'px';
	this.setPos()
};
Ball.prototype.setC = function(a) {
	var c = this.c = a;
	this.e.style.background = c;
	this.e.style.backgroundSize = 'cover'
};
Ball.prototype.setBorderWidth = function(n) {
	var n = this.borderWidth = n;
	var s = this.e.style;
	s.width = s.height = (this.b - n) * 2 + 'px';
	s.lineHeight = (this.b - n) * 2 + 'px';
	s.border = n + 'px solid ' + this.borderColor
};
Ball.prototype.setBorderColor = function(a) {
	var a = this.borderColor = a;
	this.e.style.border = this.borderWidth + 'px solid ' + a
};
Ball.prototype.setM = function(n) {
	this.m = n || this.b / 30
};
Ball.prototype.setHTML = function(a) {
	var b = this.html = a;
	var s = this.e.style;
	this.e.innerHTML = b;
	s.textAlign = 'center';
	s.lineHeight = (this.b - this.borderWidth) * 2 + 'px';
	s.fontSize = this.fontSize + 'px'
};
Ball.prototype.setOpa = function(n) {
	var a = this.opa = n;
	this.e.style.opacity = n
};