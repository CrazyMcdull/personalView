!!function(){

	// data needs render
	let fontArr = [
		{type:'h2',text:'WEB前端开发'},
		{type:'p',text:'做一个温暖善良的人，不求大富大贵，只求过着简单欢乐的生活。',icon:'biaoqian'},
		{type:'p',text:'姓名 : 潘杨 ~',icon:'user'},
		{type:'p',text:'性别 : 男',icon:'male'},
		{type:'p',text:'年龄 : 24 岁',icon:'biaoqian'},
		{type:'p',text:'爱好 : 乒乓球，看书，音乐，游戏',icon:'heart'},
		{type:'p',text:'地址 : 陕西省 西安市',icon:'position'},
		{type:'p',text:'q q : 815480491',icon:'qq'},
		{type:'p',text:'电话 : 18309220484',icon:'phone'},
		{type:'p',text:'邮箱 : 18309220484@163.com',icon:'email'},
	];

	let progressArr = [
		{title:"Javascript",percent:"85%"},
		{title:"Vue",percent:"80%"},
		{title:"React",percent:"75%"},
		{title:"RN / 小程序",percent:"65%"},
		{title:"Node",percent:"50%"},
		{title:"Ps / Python",percent:"35%"},
	];

	let idsLinkArr = [
		"m_home",
		"m_aboutme",
		"m_myexperience",
		"m_project",
		"m_evaluation",
		"m_contact",
	];

	let experienceArr = [
		{date:"2014.09",title:"西安工业大学",cont:"专业:信息与计算科学"},
		{date:"2017.10",title:"杭州绝策科技有限公司",cont:"主要业务为新加坡车辆运输及人员管理调度系统."},
		{date:"2018.11",title:"北京航星永志科技有限公司",cont:"主要业务为各地政府干部及人才档案管理系统."},
		{date:"2019",title:"待续...",cont:""},
	];

	let projectArr = [
		{
			img:"./img/talent.png",
			title:"流动人才信息综合管理系统",
			synopsis:"此项目为管理流动人才档案的项目,主要包含业务为人才信息管理,人才数字档案管理,档案相关业务办理和相关证明,人才数字档案库房管理,人才数据分析和人才数据报告,处理对应的人才网站、小程序和pad数据查看提供数据和处理等业务",
			tecCont:"vue + vue-cli + vue-route + vuex + axios + antd",
			isMobile:false
		},
		{
			img:"./img/wechat.png",
			title:"个人档案服务小程序",
			synopsis:"此项目为流动人才业务办理中分离出来的个人档案服务申请,个人的注册登录,存档申请,存档机构查询,开具相关证明,档案转出及消息通知,个人信息修改等功能",
			tecCont:"wxml + wxss + js + 微信小程序开发者工具",
			isMobile:true
		},
		{
			img:"./img/vsmart.png",
			title:"vsmart物流系统",
			synopsis:"此项目为vsmart下所属的子系统物流系统,面向大多运货车辆公司,主要业务为司机信息管理,物流任务派发,司机车辆管理,车辆地图位置信息管理,物流订单管理,海域无信号订单处理,订单交接管理,维修上报信息等",
			tecCont:"react + react-dom + react-router + redux + react-redux + antd + google地图 + leaflet创建底图 + fiddler",
			isMobile:false
		},
		{
			img:"./img/vbus.jpg",
			title:"vSmart 司机APP",
			synopsis:"此项目为新加坡校车项目中的司机APP,主要业务为司机接送学生,学生上下车情况查看,车上监控查看,司机对车上信息学生状态的管理操作,车辆进出站点信息查看进出站点操作,地图位置信息,司机个人信息修改,语音提示,司机发送消息和联系家长等实现",
			tecCont:"ReactNative + react + google地图 + leaflet创建底图 + OTG连接刷卡器 + ffmpeg转码视频流",
			isMobile:true
		},
		{
			img:"./img/vsmartParent.png",
			title:"vSmart 家长页面和APP",
			synopsis:"此项目为校车项目的家长注册页面和家长APP开发,供家长注册,登录,给学生报名校车接送,添加学生,查看学生上下车动态等",
			tecCont:"Jq + tpl + ReactNative + react",
			isMobile:true
		},
		
	];

	// canvas img handle
	let canvasDom = document.querySelector("#myCanvas");
	let canvasDomWidth = myCanvas.offsetWidth;
	let canvasDomHeight = myCanvas.offsetHeight;
	canvasDom.width = canvasDomWidth;
	canvasDom.height = canvasDomHeight;
	let ctx = canvasDom.getContext("2d");
	let cImg = new Image();
	cImg.src = "./img/canvas.jpg";

	// 清除canvas
	class clearRectOneByOne{
		// posx : current x position
		// posy : current y position
		// width : total width
		// height : total height
		constructor(posx,posy,width,height){
			this.posx = posx;
			this.posy = posy;
			this.width = width;
			this.height = height;
			this.direction = "down";
		}

		// ctx,clear rect
		clearRect(ctx,oneWidth,oneHeight){
			const _this = this;
			let clear = () => {

				let endDistance = this.width - this.posx;
				let nextClearWidth = endDistance > oneWidth ? oneWidth : endDistance;

				ctx.clearRect(this.posx,this.posy,nextClearWidth,oneHeight);

				if(this.posy > this.height){
					this.direction = "up";
					this.posx += oneWidth;
				}
				if(this.posy < 0){
					this.direction = "down";
					this.posx += oneWidth;
				}

				this.posy = this.direction === "down" ? this.posy + oneHeight : this.posy - oneHeight;
				let animateResId = window.requestAnimationFrame(function(){
					if(_this.posx < _this.width){
						clear();
					}else{
						window.cancelAnimationFrame(animateResId);
					}
				})
			}

			clear();

		}
	}

	// canvas img
	cImg.onload = () => {
		document.querySelector('.colorfulImg').style.display = "block";
		renderDom(document.querySelector("#introSelf"),fontArr);

		ctx.drawImage(cImg,0,0,canvasDomWidth,canvasDomHeight);
		ctx.globalCompositeOperation = 'destination-out';

		let clearWidth = document.body.clientWidth >= 1200 ? 0.62 : 0.635;
		let clearRect1 = new clearRectOneByOne(0,0,Math.ceil(canvasDomWidth * clearWidth),canvasDomHeight);

		clearRect1.clearRect(ctx,Math.ceil(canvasDomWidth * clearWidth) * 0.1,60);
	}


	// ----------------------------------------- render data

	let renderDom = (parentDom,[...fontArr]) => {
		if(fontArr && fontArr.length > 0){
			let domObj = fontArr[0];
			let appendedDom = parentDom.appendChild(document.createElement(domObj.type));
			// appendedDom.setAttribute("style","font-size:" + (Math.floor(Math.random() * 12) + 10) + "px");
			if(domObj.icon){
				appendedDom.innerHTML = "<span class='iconfont icon-"+ domObj.icon +"'></span>"
			}
			async function append(){
				return new Promise((resolve) => {
					let timer = setInterval(function(){
						if(domObj.text.length > 0){
							appendedDom.innerHTML += domObj.text.substr(0,1);
							domObj.text = domObj.text.substr(1);
						}else{
							resolve(true)
							clearInterval(timer);
							timer = null;
						}
					},80);
				})
			}

			append().then(res => {
				if(res){
					fontArr.shift();
					renderDom(parentDom,fontArr);
				}

			})
		}
	}

	// render progress bar
	let renderProgressBar = (progressArr) => {

		let divDoms = "";
		progressArr.forEach((item) => {
			divDoms +=
				"<div class='progress'>"+
					"<div class='progressHead'>"+
						"<span>"+ item.title +"</span>"+
						"<span>"+ item.percent +"</span>"+
					"</div>"+
					"<div class='progressBar' style='width:"+ item.percent +"'></div>"+
					"<div class='progressGroove'></div>"+
				"</div>";
		});
		$("#progressBarContainer").html(divDoms);
	}


	// render experience
	let renderExperience = (array) => {

		let divDoms = $("#myExperienceInner").html();

		array.forEach((item) => {
			divDoms += 
				"<div class='experienceCont'>"+
					"<span></span>"+
					"<div>"+
						"<h3>"+ item.date +"</h3>"+
						"<h4>"+ item.title +"</h4>"+
						"<p>"+ item.cont +"</p>"+
					"</div>"+
				"</div>";
		});

		$("#myExperienceInner").html(divDoms);

	}

	// render project
	let renderProject = (array) => {
		let divDoms = "";

		array.forEach((item) => {
			if(item.isMobile){
				divDoms += 
				"<div class='swiper-slide'>" +
					"<div class='mobileSlide'>" +
						"<img src='"+ item.img +"' title='"+ item.title +"'></img>" +
						"<div class='mobileCont'>" +
							"<h4>"+ item.title +"</h4>" +
							"<p class='synopsis'><span>项目简介：</span>"+ item.synopsis +"</p>" +
							"<p class='tecCont'><span>所用技术点：</span>"+ item.tecCont +"</p>" +
						"</div>"+
					"</div>"+
				"</div>"
			}else{
				divDoms += 
				"<div class='swiper-slide pcSlide'>" +
					"<div class='pcSlide'>" +
						"<img src='"+ item.img +"' title='"+ item.title +"'></img>" +
						"<div class='zzc'>"+
							"<div class='pcCont'>"+
								"<h4>"+ item.title +"</h4>" +
								"<p class='synopsis'><span>项目简介：</span>"+ item.synopsis +"</p>" +
								"<p class='tecCont'><span>所用技术点：</span>"+ item.tecCont +"</p>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>"
			}
			
		});

		$("#projectExperience").html(divDoms);

		// new carousel
		let certifySwiper = new Swiper('.swiper-container', {
			watchSlidesProgress: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			loop: true,
			// loopedSlides: 5,
			autoplay: false,
			pagination: {
				el: '.swiper-pagination',			
			},
			on: {
				progress: function(progress) {
					for (let i = 0; i < this.slides.length; i++) {
						let slide = this.slides.eq(i);
						let slideProgress = this.slides[i].progress;
						let modify = 1;
						if (Math.abs(slideProgress) > 1) {
							modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
						}
						let translate = slideProgress * modify * 260 + 'px';
						let scale = 1 - Math.abs(slideProgress) / 5;
						let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
						slide.transform('translateX(' + translate + ') scale(' + scale + ')');
						slide.css('zIndex', zIndex);
						slide.css('opacity', 1);
						if (Math.abs(slideProgress) > 3) {
							slide.css('opacity', 0);
						}
					}
				},
				setTransition: function(transition) {
					for (let i = 0; i < this.slides.length; i++) {
						let slide = this.slides.eq(i)
						slide.transition(transition);
					}

				}
			}

		});

	}

	// evalution canvas
	let evalutionRender = () => {
		let evalutionCanvas = $("#evalutionCanvas");
		evalutionCanvas.html("");
		evalutionCanvas.width = $("#evalutionCanvas").width();
		evalutionCanvas.height = $("#evalutionCanvas").height();
		let currentWindowWidth = $(window).width();
		let rand = (m,n) =>  m + parseInt((n-m)*Math.random());

		let says = ["善良","乒乓球","读书","阳光","积极","努力","音乐","发呆","钻研"];
		let saysLength = says.length;
		let oC = $("#evalutionCanvas")[0];
		let mxwidth = oC.offsetWidth;
		let mxheight = oC.offsetHeight;

		let oB = new BallBox('evalutionCanvas');

		let maxTempWidth = $("#evalutionCanvas").width() / 15;
		let minTempWidth = $("#evalutionCanvas").width() / 15 - Math.ceil($(window).width() * 20 / 1920);

		oB.ballRun();

		for(let i=0;i<15;i++){
			let b=rand(minTempWidth > 20 ? minTempWidth : 20 ,maxTempWidth > 30 ? maxTempWidth : 30);
			let x=rand(b,mxwidth-b);
			let y=rand(b,mxheight-b);
			let ball=new Ball({
				'b':b,
				'x':x,
				'y':y,
				'sx':rand(1,currentWindowWidth > 1000 ? 3 : 1.5),
				'sy':rand(1,currentWindowWidth > 1000 ? 3 : 1.5),
				'c':'url(img/paopao'+rand(1,6)+'.png)',
				'opa':rand(60,100)/100,
				'fontSize':currentWindowWidth > 1200 ? '14' : '8',
				'callBack':function(n){
					//this.setB(rand(30,50));
					//this.setM();
					this.setOpa(rand(60,100)/100);
					if(n % 20==0){this.setC('url(img/paopao'+rand(1,6)+'.png)')};//撞三次改变下图片
					// if(n%50==0){
					// 	this.setB(rand(40+parseInt((n>1000?1000:n)/50),60+parseInt((n>1000?1000:n)/50)));
					// }//撞50次改大小
					this.setHTML(says[i % says.length]);
				}
			});

			oB.addBall(ball);
		}
	}
	renderProgressBar(progressArr);
	renderExperience(experienceArr);
	renderProject(projectArr);
	evalutionRender();

	// --------------------------------------- render data end 
	
	
	// showOrHide 1:show 0:hide
	let showHideMenu = (showOrHide) => {
		let menuContWidth = document.body.clientWidth >= 1200 ? Math.floor(0.28 * canvasDomWidth) : Math.floor(0.315 * canvasDomWidth);
		if(showOrHide === 1){
			$(".menuCont").width(menuContWidth);
			$("#menuControl").removeClass('icon-menu');
			$("#menuControl").addClass('icon-close');
			$(".menuCont").slideDown();
		}else{
			$("#menuControl").removeClass('icon-close');
			$("#menuControl").addClass('icon-menu');
			$(".menuCont").slideUp();
		}
		
	}

	// --------------------------------------- event
 
	$(window).resize(evalutionRender);

	$(window).click(() => {
		$(".scrollMenu ul").hide();
	});

	let clickNum = 0;
	// click menu icon
	$("#menuControl").click((event) => {
		if(clickNum % 2 === 0){
			showHideMenu(1);
		}else{
			showHideMenu(0);
		}
		clickNum ++ ;
	});

	let clickLiFunc = (dom) => {
		$(dom).click((e) => {
			let index = $(e.target).index();
			let directionTop = $(".outerContainer").scrollTop() + $("#"+idsLinkArr[index]).offset().top - 30;
			// console.log(index);
			$(dom).removeClass("active");
			$(e.target).addClass("active");

			if(index !== 0){
				$(".outerContainer").scrollTop(directionTop);
			}else{
				$(".outerContainer").scrollTop(0)
			}
			return false;
		});
	}
	clickLiFunc($(".scrollInnerMenu ul li"));
	clickLiFunc($(".menuCont ul li"));
	clickLiFunc($(".bigMenuUl li"));

	$("#toTop").click((e)=>{
		let timer = setInterval(()=>{
			let top = $(".outerContainer").scrollTop();
			$(".outerContainer").scrollTop(top - 50);
			if(top <= 0){
				clearInterval(timer);
				timer = null;
			}	
		},1000 / 60)
	});

	$(".tip").click((e) => {
		$(".tip").fadeOut(1000)
	});

	let clickNum1 = 0;
	$(".scrollInnerMenu .right").click((e) => {
		if(clickNum1 % 2 === 0){
			$(".scrollInnerMenu .right ul").show();
		}else{
			$(".scrollInnerMenu .right ul").hide();
		}
		clickNum1 ++;
		return false;
	});

	// listening scroll
	$(".outerContainer").scroll((e) => {
		let topDirection = $(".headCont .cont").offset().top;
		let windowWidth = $(window).width();
		if(topDirection <= 50){
			$("#toTop").show();
		}else{
			$("#toTop").hide();
		}
		if(topDirection <= 20){
			$(".scrollMenu").show();

			$(".scrollMenu").css({
				"display" : "flex",
				"opacity" : topDirection >= 0 ? topDirection / 20  : 1,
			});

			if(windowWidth > 800){
				$(".scrollMenu ul").css({
					"right" : $(".scrollMenu ul").width() * -0.5,
					"margin-right" : "50%"
				})
			}else{
				$(".scrollMenu ul").css({
					"right" : windowWidth * -0.05,
				})
			}
			
		}else{
			$(".scrollMenu").hide();
			$(".scrollMenu ul").hide();
			clickNum1 = 0;
		}
	});

}();