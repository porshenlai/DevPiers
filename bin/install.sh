#!/bin/sh

ROOT=$(realpath $0)
ROOT=${ROOT%/*}
cd ${ROOT}

if test ! -f "PWS/play.sh"; then
	echo "Install to $(pwd)"
	echo "[..] Download DevPiers.zip"
	test -f "DevPiers.zip" || curl "http://g3c.cyberpiers.com:4780/releases/DevPiers.zip" -o DevPiers.zip
	echo "[OK] Download DevPiers.zip"

	echo "[..] Unzip DevPiers.zip"
	unzip DevPiers.zip
	echo "[OK] Unzip DevPiers.zip"

	echo "[..] Remove DevPiers.zip"
	rm DevPiers.zip
	echo "[OK] Remove DevPiers.zip"
fi

echo '"PWS/play.sh start" to launch application'
