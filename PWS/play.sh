#!/bin/sh
ROOT=$(realpath $0) && ROOT=${ROOT%/*}
DOCS=${ROOT}/docs
PID=${ROOT}/PWS.pid

acquirePython () {
	test -f ${ROOT}/py/bin/activate || {
		python3 -m venv ${ROOT}/py
		. ${ROOT}/py/bin/activate
		${VIRTUAL_ENV}/bin/python3 -m pip install -r ${ROOT}/requirements.txt
	}
	test -z ${VIRTUAL_ENV} && . ${ROOT}/py/bin/activate
	echo ${VIRTUAL_ENV}/bin/python3
}

while test "$1"; do
case "$1" in
start)
	if test -f "${ROOT}/config.json"; then
		$(acquirePython) ${ROOT}/daemon.py ${ROOT}/config.json &
		for s in 1 2 3 4 5 6 7 8 9 10; do
			if test -f "${PID}"; then
				echo "Daemon running at " $(cat ${PID})
				sleep 1
				break
			fi
		done
	else
		echo "Configuration file ${ROOT}/config.json not exist"
	fi ;;
stop)
	test -f "${PID}" && kill $(cat ${PID}) && rm ${PID}
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
