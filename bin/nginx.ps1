function readNginxConf ( $cfgfile, $qst, $qk ) {
	$state=""
	(Get-Content $cfgfile) | ForEach-Object {
		if ($_.Trim() -match "^#") {
		} elseif ($_.Trim() -Eq "}") {
			$state=$state -replace ':[^:]+$', ''
		} elseif ($_.Trim() -match "^([^#\s]+)(.*)\s+{$") {
			if ($matches[1] -Eq "location") {
				$found = $_.Trim() -match "\s*=?\s+([^\s]+)"
			}
			$state=$state+":"+$matches[1]
		} elseif ($state -match ":$qst$" -and $_.Trim() -match $qk) {
			if ($_.Trim() -match "\s([^\s]+);") { return $matches[1] }
		}
	}
}

function editNginxConf ( $cfgfile, $port, $root) {
	$state=""
	(Get-Content $cfgfile) | ForEach-Object {
		if ($_.Trim() -Eq "}") {
			$_
			$state=$state -replace ':[^:]+$', ''
		} elseif ($_.Trim() -match "^([^#\s]+)(.*)\s+{$") {
			if ($matches[1] -Eq "location") {
				$found = $_.Trim() -match "\s*=?\s+([^\s]+)"
			}
			$state=$state+":"+$matches[1]
			$_
		} elseif ($state -match ":server$" -and $_.Trim() -match "listen[ \t]+[0-9]+\s*;") {
			$_ -replace "[0-9]+", $port
		} elseif ($state -match ":/$" -and $_.Trim() -match "root[ \t]+([^\s]+)\s*;") {
			$_ -replace [Regex]::Escape($matches[1]), $root
		} else {
			$_
		}
	} | Set-Content $cfgfile
}

$NGXR="nginx\nginx-1.27.2\"
$CWD=Get-Location
cd $PsScriptRoot\..
if (-Not (Test-Path "nginx" -PathType Any)) {
	if (-Not (Test-Path "nginx.zip" -PathType Leaf)) {
		invoke-RestMethod -O "nginx.zip" "https://nginx.org/download/nginx-1.27.2.zip"
	}
	Expand-Archive "nginx.zip"
	rm "nginx.zip"
	editNginxConf "$NGXR\conf\nginx.conf" "8880" "../../docs"
}

cd "nginx\nginx-1.27.2"
if ($args[0] -Eq "play"){
	start .\nginx.exe
	$port=readNginxConf "conf\nginx.conf" "http:server" "listen"
	echo "web server(:$port) started."
	echo "0: Default Browser" "1: Chrome" "2: Edge" "3: Waterfox" "4: Firefox"
	switch(Read-Host){
	0 { Start-Process http://localhost:$port }
	1 { [system.Diagnostics.Process]::Start("chrome","http://localhost:$port") }
	2 { [system.Diagnostics.Process]::Start("msedge","http://localhost:$port") }
	3 { [system.Diagnostics.Process]::Start("waterfox","http://localhost:$port") }
	4 { [system.Diagnostics.Process]::Start("firefox","http://localhost:$port") }
	}
} elseif ($args[0] -Eq "stop") {
	.\nginx.exe -s quit
	echo "web server stopped."
} elseif ($args[0] -Eq "test") {
	$port=readNginxConf "conf\nginx.conf" "http:server" "listen"
	echo "PORT is $port"
} else {
	tasklist /fi "imagename eq nginx.exe"
}
cd $CWD.Path
