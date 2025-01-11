$PythonPackage="https://www.python.org/ftp/python/3.12.4/python-3.12.4-embed-amd64.zip"
$GetPIP="https://bootstrap.pypa.io/get-pip.py"

$PYR="python"

if (-Not (Test-Path ($PYR+"\") -PathType Any)) {
	if (-Not (Test-Path ($PYR+".zip") -PathType Leaf)) {
		invoke-RestMethod -O ($PYR+".zip") $PythonPackage
	}
	Expand-Archive ($PYR+".zip")
	rm ($PYR+".zip")
}

if (-Not (Test-Path ($PYR+"\Lib\site-packages\pip\") -PathType Any)) {
	invoke-RestMethod -O "GetPIP.py" $GetPIP
	& ($PYR+"\python.exe") "GetPIP.py"
	rm "GetPIP.py"

	$PthFile = $PYR + "/" + (Get-ChildItem $PYR | Where-Object {$_ -match "._pth"}).Name
	(Get-Content $PthFile) | ForEach-Object {
		if ( $_ -eq ".") { Write-Output "Lib/site-packages" }
		Write-Output $_
	} | Set-Content $PthFile
}

if ($args.count -eq 0) {
	if (Test-Path "requirements.txt" -PathType Any) {
		& ($PYR+"\python.exe") "-m" "pip" "install" "--upgrade" "-r" "requirements.txt"
	}
}else{
	$CMD=""
	for ( $i = 0; $i -lt $args.count; $i++ ) {
		if ($args[$i] -eq "-r") {
			$CMD="installpkg"
		} else {
			if ($CMD -eq "installpkg") {
				$CMD=""
				$REQ=$args[$i]
				& ($PYR+"\python.exe") "-m" "pip" "install" "--upgrade" "-r" $REQ
			} else {
				Write-Output ("unreconized arguments "+$CMD+"/"+$args[ $i ])
			}
		}
	}
}
