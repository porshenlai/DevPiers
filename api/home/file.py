from piers.AIO.Web import WebHome
from os import path as Path
from aiofiles import open as async_open
from json import loads as readJSON, dumps as writeJSON

class H (WebHome.PostHandler) :
	def __init__ (self, args) :
		super().__init__(args)
		self.Root = args["Root"]

	async def handle (self, rio) :
		ct, arg, hdrs = rio.Req
		return rio.JSON({"R":"OK","D":self.Root})

PHMClass=H
