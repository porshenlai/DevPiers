from sys import path as libPath, stdin, exit, argv
from os import listdir, makedirs, path as Path
from re import compile as newRE
from json import loads as json_parse, load as json_read, dumps as json_stringify
from signal import signal, SIGINT

ROOT = Path.dirname(__file__)
PROT = Path.dirname(ROOT)
if PROT not in libPath : libPath.insert(0,PROT)

from piers import AIO
from piers.AIO.Web import WebHome, httpPOST, httpPUT

class PWS (WebHome) :
	def __init__ (
		self,
		host = "0.0.0.0:40780",
		home = {"GET":"./GET","POST":"./POST","PUT":"./PUT"},
		pages = {"INDEX":"index.html","ERROR":"error.html"},
		options = { "BUFSIZE":1048576, "MAXREQ":32, "MAXREQSIZE":8388608 },
		cors = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Headers":"*" },
		cafiles = None
	) :
		super().__init__( host, home, pages, options, cors, cafiles )

async def main() :
	cfg = {
		"host": "0.0.0.0",
		"port": 40780,
		"home": {
			"GET": "docs/GET",
			"POST": "docs/POST",
			"PUT": "docs/PUT"
		},
		"pages": {
			"INDEX": "index.html",
			"ERROR": "error.html"
		},
		"options": {
			"BUFSIZE": 1048576,
			"MAXREQ": 32,
			"MAXREQSIZE": 8388608
		},
		"cors": {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*"
		}
	}
	config=Path.join(ROOT,argv[1])
	cfg["pidfile"]=Path.join(Path.dirname(config),"PWS.pid")
	with open(config,"r") as fo :
		cfg.update(json_read(fo));
		for k in cfg["home"] :
			if not cfg["home"][k].startswith("/") :
				cfg["home"][k] = Path.join(ROOT, *[ v for v in cfg["home"][k].split("/") if v ])

	makedirs(Path.dirname(cfg["pidfile"]), exist_ok=True)
	print(json_stringify(cfg,ensure_ascii=False,indent=4))

	if "pidfile" in cfg and cfg["pidfile"] :
		try :
			with open(cfg["pidfile"],"w") as fo :
				from os import getpid
				getpid = str(getpid())
				print("PID is %s" % getpid);
				fo.write( getpid )
		except Exception as x :
			print("Exception: ",x)

	ws = PWS(
		host = "%s:%d" % (cfg["host"],cfg["port"]),
		home = cfg["home"],
		pages = cfg["pages"],
		options = cfg["options"],
		cors = cfg["cors"],
		cafiles = (cfg["cert"], cfg["key"]) if "cert" in cfg and cfg["cert"] and "key" in cfg and cfg["key"] else None
	)

	signal(SIGINT, lambda sig,frame : ws.stop())
	await ws.play()

	if "pidfile" in cfg and cfg["pidfile"] :
		from os import remove
		remove(cfg["pidfile"])

AIO.add(main())
AIO.play()
