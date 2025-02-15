ROOT=$(realpath $0)
ROOT=${ROOT%/*}

PY3PKG="https://www.python.org/ftp/python/3.12.4/python-3.12.4-embed-amd64.zip"
PIPPKG="https://bootstrap.pypa.io/get-pip.py"

cd ${ROOT}

if ! test -f "bin/activate"; then
	python3 -m venv .
	if test -f "requirements.txt"; then
		. bin/activate
		python3 -m pip install -r requirements.txt
		deactivate
	fi
fi
echo "${ROOT}/bin/python3"
