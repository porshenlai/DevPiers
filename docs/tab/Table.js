document.currentScript.value=async (root,args)=>{
	console.log("Table: ",root,args);

	function gw (e,WN="Form"){
		if("string"===typeof(e)) e=root.querySelector(e);
		return e._gw ? e._gw() : new Piers.Widget[WN](e);
	}

	function o2a(o) {
		return Object.keys(o).reduce((r,v)=>r.push({"K":v,"V":o[v]})&&r,[]);
	}

	class Book {
		constructor () {
			this.xrate={
				"EUR":34,
				"USD":32,
				"JPY":0.25,
				"TWD":1
			};
			gw('[WidgetTag="cp"]',"List").set(o2a(this.xrate));
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
			function oc(o){
				let no=[],t;
				for(t in o) no.push({"T":t,"A":o[t]});
				return no;
			}
			gw('[UIE="List"] [WidgetTag="cn"]').set(this.doc.CN);
			
			gw('[UIE="List"] [WidgetTag="item"]',"List").set(this.doc.L.reduce(function(r,v){
				r.push({"N":v.N, "O":oc(v.O), "R":v.R});
				console.log(r);
				return r;
			},[]));
			gw('[UIE="List"] [WidgetTag="tt"]').set({"O":oc(this.doc.TT.O),"R":this.doc.TT.R});
		}
	}

	let B=new Book();
	B.redraw();

	(function(e){
		if(e.CLICK_BIND)
			e.removeEventListener("click",e.CLICK_BIND);
		e.addEventListener("click",e.CLICK_BIND=function(evt){
			try {
				let btn=Piers.DOM(evt.target).find('[func]');
				if (!btn) return;
				switch(btn.getAttribute("func")){
				case "TEST":
					console.log(gw(e).get());
					break;
				};
			} catch(x) {
			}
		});
	})(root.querySelector('[WidgetTag="IPT"]'));
};
