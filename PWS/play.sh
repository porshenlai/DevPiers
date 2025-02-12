#!/bin/sh
ROOT=$(realpath $0) && ROOT=${ROOT%/*}
DOCS=${ROOT}/docs
PID=${ROOT}/PWS.pid
PY3="NONE"

acquirePython () {
	echo "* Checking python environment"
	test -f ${ROOT}/py/bin/activate || {
		echo -n "[..] Install python venv"
		python3 -m venv ${ROOT}/py
		echo "\r[OK] Install python venv"
		. ${ROOT}/py/bin/activate
		echo "* Install required python packages"
		${VIRTUAL_ENV}/bin/python3 -m pip install -r ${ROOT}/requirements.txt
		echo "\r[OK] Install required python packages"
	}
	test -z ${VIRTUAL_ENV} && . ${ROOT}/py/bin/activate
	echo "Python venv ready => (${VIRTUAL_ENV})"
	PY3=${VIRTUAL_ENV}/bin/python3
}

while test "$1"; do
case "$1" in
start)
	if test -f "${ROOT}/config.json"; then
		acquirePython
		if test ${PY3} = "NONE"; then
			echo "Failed to install python3 virtual environment"
		else
			${PY3} ${ROOT}/daemon.py ${ROOT}/config.json &
			for s in 1 2 3 4 5 6 7 8 9 10; do
				if test -f "${PID}"; then
					echo "Daemon running at " $(cat ${PID})
					sleep 1
				break
			fi
		done
		fi
	else
		echo "Configuration file ${ROOT}/config.json not exist"
	fi ;;
stop)
	if test -f "${PID}"; then
		echo -n "[..] Kill PID (${PID})"
		kill $(cat ${PID}) && rm ${PID}
		echo "\r[OK] Kill PID (${PID})"
	else
		echo "[OK] Not running"
	fi
	;;
status)
	if test -f "${PID}"; then
		echo "Daemon running on PID $(cat ${PID})"
	else
		echo "Daemon not running"
	fi
	;;
esac
shift
done

test "${VIRTUAL_ENV}" && deactivate
