document.currentScript.value=async (root,args)=>{
	console.log("Table: ",root,args);

	let doc={
		"CN":{"R":"TWD"},
		"L":[
			{"N":"One Dollar","O":1,"R":34},
			{"N":"Two Dollar","O":2,"R":68},
			{"N":"Five Dollar","O":5,"R":170}
		],
		"TT":{"O":8,"R":272}
	};

	((e)=>(e._gw ? e._gw() : new Piers.Widget.Form(e)).set(doc.CN))(root.querySelector('[UIE="List"] [WidgetTag="cn"]'));
	((e)=>(e._gw ? e._gw() : new Piers.Widget.List(e)).set(doc.L))(root.querySelector('[UIE="List"] [WidgetTag="item"]'));
	((e)=>(e._gw ? e._gw() : new Piers.Widget.Form(e)).set(doc.TT))(root.querySelector('[UIE="List"] [WidgetTag="tt"]'));
};
