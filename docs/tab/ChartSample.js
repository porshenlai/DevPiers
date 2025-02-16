document.currentScript.value=async (root,args)=>{
	let newChart = await Piers.import(Piers.Env.PierPath+"chart.js");
	let c = newChart(root.querySelector('[UIE="Chart"]'));
	c.draw_pie({
		"期中考":0.3,
		"期末報告":0.3,
		"平時成績":0.4
	},"TEST");
	let d = newChart(root.querySelector('[UIE="Chart2"]'));
	d.draw_line({
		"0":{"A":1,"B":4},
		"1":{"A":2,"B":3},
		"2":{"A":3,"B":2},
		"3":{"A":4,"B":1}
	});
};
