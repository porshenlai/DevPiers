document.currentScript.value=async (root,args)=>{
	console.log("Table: ",root,args);

	function gw(e,WN="Form"){
		if("string"===typeof(e)) e=root.querySelector(e);
		return e._gw ? e._gw() : new Piers.Widget[WN](e);
	}

	class Book {
		constructor () {
			this.xrate={
				"EUR":34,
				"USD":32,
				"JPY":0.25,
				"TWD":1
			};
			this.doc={
				"CN":{"R":"TWD"},
				"L":[
					{"N":"One Dollar","O":{"EUR":1}},
					{"N":"Two Dollar","O":{"USD":2}},
					{"N":"Three Dollar","O":{"USD":3}},
					{"N":"Five Dollar","O":{"JPY":5}}
				],
				"TT":{}
			};
		}
		mdAdd (ov,nv) {
			for(let t in nv){
				if(t in ov) ov[t] = parseFloat(ov[t]) + parseFloat(nv[t]);
				else ov[t] = parseFloat(nv[t]);
			}
		}
		mdConv (ov, tp) {
			let r=0;
			for(let t in ov)
				r += ov[t]*this.xrate[t]
			return r;
		}
		recalc () {
			let tto={}, self=this;
			this.doc.L.forEach(function(row){
				row.R = self.mdConv(row.O);
				self.mdAdd(tto,row.O);
			});
			this.doc.TT.O=tto;
			this.doc.TT.R=this.mdConv(tto);
		}
		redraw () {
			this.recalc();
			gw('[UIE="List"] [WidgetTag="cn"]').set(this.doc.CN);
			
			gw('[UIE="List"] [WidgetTag="item"]',"List").set(this.doc.L.reduce(function(r,v){
				r.push({"N":v.N, "O":JSON.stringify(v.O), "R":v.R});
				return r;
			},[]));
			gw('[UIE="List"] [WidgetTag="tt"]').set((function(v){
				let n=JSON.parse(JSON.stringify(v));
				n.O = JSON.stringify(v.O);
				return n;
			})(this.doc.TT));
		}
	}

	let B=new Book();
	B.redraw();
};
