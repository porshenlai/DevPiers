$ROOT = Split-Path (Get-Variable MyInvocation).value.MyCommand.Path
$GITDOWNLOAD = "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/PortableGit-2.48.1-64-bit.7z.exe"

cd ${ROOT}
if (-Not (Test-Path bin\git.exe -PathType Leaf)) {
	if (-Not (Test-Path Git.exe -PathType Leaf)) {
		Invoke-RestMethod -Uri $GITDOWNLOAD -OutFile Git.exe
	}
	Start-Process -FilePath Git.exe -ArgumentList "-y" -PassThru -Wait
	Move-Item -Path PortableGit\* -Destination .
	Remove-Item PortableGit
	Remove-Item Git.exe
}
Write-Host $ROOT+"\bin\git.exe"
