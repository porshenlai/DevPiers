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
  		{"I":"12345678","N":"伊惡刪"},
  		{"I":"87654321","N":"霸氣流"}
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
