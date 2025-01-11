from piers.AIO.Web import WebHome

class H (WebHome.PostHandler) :
	def __init__ (self, args) :
		super().__init__(args)
		self.COUNT=0
	async def handle (self, rio) :
		# assert "N" in rio.Session, "Violation"
		# print("path",rio.path)
		# s, dbn=[], rio.path.group(2)
		ct, arg, hdrs=rio.Req
		self.COUNT+=1;
		return rio.JSON({"R":"OK","A":arg,"C":self.COUNT})
PHMClass=H
