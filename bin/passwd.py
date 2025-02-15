from hashlib import sha256
from base64 import b64encode 
from sys import argv

def sha (s) :
	sha = sha256()
	sha.update(s.encode('utf8'))
	return b64encode(sha.digest()).decode('ascii')

print("{0:s} {1:s}".format(argv[1],sha(argv[1]+":"+argv[2])))
