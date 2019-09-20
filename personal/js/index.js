!!function(){

	// listening scroll
	$(".outerContainer").scroll((e) => {
		let topDirection = $(".headCont .cont").offset().top;
		if(topDirection <= 50){
			$("#toTop").show();
		}else{
			$("#toTop").hide();
		}
		if(topDirection <= 20){
			$(".scrollMenu").show();
			$(".scrollMenu").css({
				"display" : "flex",
				"opacity" : topDirection >= 0 ? topDirection / 20  : 1
			})
		}else{
			$(".scrollMenu").hide();
		}
	});

	// words array
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

	let projectArr = [];

	let canvasDom = document.querySelector("#myCanvas");
	let canvasDomWidth = myCanvas.offsetWidth;
	let canvasDomHeight = myCanvas.offsetHeight;
	canvasDom.width = canvasDomWidth;
	canvasDom.height = canvasDomHeight;

	let ctx = canvasDom.getContext("2d");

	let cImg = new Image();
	cImg.src = "./img/canvas.jpg";

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

	renderProgressBar(progressArr);
	renderExperience(experienceArr);

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

	// renderImg
	cImg.onload = () => {
		document.querySelector('.colorfulImg').style.display = "block";
		renderDom(document.querySelector("#introSelf"),fontArr);

		ctx.drawImage(cImg,0,0,canvasDomWidth,canvasDomHeight);
		ctx.globalCompositeOperation = 'destination-out';

		let clearWidth = document.body.clientWidth >= 1200 ? 0.62 : 0.635;
		let clearRect1 = new clearRectOneByOne(0,0,Math.ceil(canvasDomWidth * clearWidth),canvasDomHeight);

		clearRect1.clearRect(ctx,Math.ceil(canvasDomWidth * clearWidth) * 0.1,60);
	}


	// menu
	let clickNum = 0;
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

	// click menu icon
	$("#menuControl").click((event) => {
		if(clickNum % 2 === 0){
			showHideMenu(1);
		}else{
			showHideMenu(0);
		}
		clickNum ++ ;
	});


	$(".menuUl li").click((e) => {
		let index = $(e.target).index();
		let directionTop = $("#"+idsLinkArr[index]).offset().top - 30;

		if(index !== 0){
			$(".outerContainer").scrollTop(directionTop)
		}else{
			$(".outerContainer").scrollTop(0)
		}

	});

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

}();