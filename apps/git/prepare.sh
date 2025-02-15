#!/bin/sh

if test -z "$(which git)"; then
	echo "sudo apt install git"
fi

echo $(which git)
