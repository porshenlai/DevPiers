function speak( text, locale="zh-TW", pitch=1, rate=1 ){ // zh-TW, ja-JP, fr-FR, de-DE
	return new Promise(function( or, oe ){
		if( window.speechSynthesis.speaking ) return oe("speechSynthesis.speaking");
		var ut = new SpeechSynthesisUtterance( text )
		ut.onend = or;
		ut.onerror = oe;
		ut.pitch = pitch;
		ut.rate = rate;
		ut.voice = window.speechSynthesis.getVoices().find( function(v){ return v.name.startsWith("Microsoft") && v.lang === locale; } );
		window.speechSynthesis.speak(ut);
	});
}

document.currentScript.value=async (root,args)=>{
	console.log("Page A: ",root,args);

	let list=[
  		{"I":"10902229","N":"黃精漢"},
  		{"I":"11002228","N":"羅苡瑄"},
  		{"I":"11032150","N":"林昱榮"},
  		{"I":"11032154","N":"林家寬"},
  		{"I":"11102311","N":"陳冠瑋"},
		{"I":"11102340","N":"陳姵伃"},
  		{"I":"11107105","N":"張瑞珊"},
		{"I":"11107107","N":"劉芯"},
  		{"I":"11107112","N":"曾柏盛"},
  		{"I":"11107116","N":"司家豪"},
  		{"I":"11107124","N":"李妍姍"},
  		{"I":"11107133","N":"陳勇傑"},
  		{"I":"11107142","N":"林宏濬"},
  		{"I":"11107148","N":"李宜庭"},
  		{"I":"11107152","N":"楊嘉賢"},
  		{"I":"11107153","N":"廖柏安"},
  		{"I":"11107155","N":"邱彥翔"},
  		{"I":"11107156","N":"陳以倢"},
  		{"I":"11107157","N":"林詩涵"},
  		{"I":"11107175","N":"李昕"},
  		{"I":"11107179","N":"王立宏"},
  		{"I":"11107180","N":"何柏辰"},
  		{"I":"11107208","N":"莊才均"},
  		{"I":"11107219","N":"林芷伃"},
  		{"I":"11107223","N":"王彥鈞"},
  		{"I":"11107226","N":"林昱銘"},
  		{"I":"11107236","N":"張祖鳴"},
  		{"I":"11107246","N":"洪詩涵"},
  		{"I":"11107249","N":"李恩杰"},
  		{"I":"11107257","N":"林家銘"},
  		{"I":"11107277","N":"陳華瑩"},
  		{"I":"11107302","N":"蔡沂倢"},
  		{"I":"11107307","N":"吳念庭"},
  		{"I":"11107310","N":"劉怡萱"},
  		{"I":"11107314","N":"呂采宜"},
  		{"I":"11107316","N":"邱宣蒨"},
  		{"I":"11107320","N":"賴彥怡"},
  		{"I":"11107321","N":"李琬瑜"},
  		{"I":"11107329","N":"廖湘寧"},
  		{"I":"11107330","N":"官禹安"},
  		{"I":"11107333","N":"唐凱洺"},
  		{"I":"11107334","N":"許巧蓁"},
  		{"I":"11107336","N":"卓頎諺"},
  		{"I":"11107343","N":"葉宇純"},
  		{"I":"11107344","N":"林薏菁"},
  		{"I":"11107345","N":"張舒涵"},
  		{"I":"11107348","N":"張娉婷"},
  		{"I":"11107349","N":"賴育嘉"},
  		{"I":"11107371","N":"蔡力仁"},
  		{"I":"11107372","N":"嚴立淇"},
  		{"I":"11107375","N":"黃紹穎"},
  		{"I":"11132245","N":"羅少宏"},
  		{"I":"61123128","N":"鄭伊庭"}
	];

	window.speechSynthesis.getVoices();
	(function (tb) {
		(new Piers.Widget.List(tb)).set(list);
		if(tb.ClickHandler){
			tb.removeEventListener(tb.ClickHandler);
			tb.ClickHandler.undefined;
		}
		tb.addEventListener("click", function (evt) {
			switch(evt.target.getAttribute("func")){
			case "call":
				(function(row){
					let doc = row._gw().get();
					speak(doc.I+" "+doc.N+" 到了嗎 ?");
				})(Piers.DOM(evt.target).find("tr"));
				break;
			}
		});
	}) (root.querySelector('[WidgetTag="std"]'));
};
