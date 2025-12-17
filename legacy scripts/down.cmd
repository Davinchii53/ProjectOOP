:<<"::cmDLITERAL"
@ECHO OFF
GOTO :WINDOWS
::cmDLITERAL

# -----------------------------------------------------------------------------
# UNIX / MACOS / LINUX SECTION
# -----------------------------------------------------------------------------
echo "Detected Unix-like OS..."

# detect LAN IP
if [[ "$OSTYPE" == "darwin"* ]]; then
  IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1)
else
  IP=$(ip route get 1.1.1.1 | sed -n 's/.*src \([0-9.]\+\).*/\1/p')
fi

[ -z "$IP" ] && IP="127.0.0.1"
echo "Host LAN IP: $IP"

# Export IP and run docker
export REACT_NATIVE_PACKAGER_HOSTNAME=$IP
docker compose --env-file .env down
exit 0

:WINDOWS
REM -----------------------------------------------------------------------------
REM  WINDOWS SECTION
REM -----------------------------------------------------------------------------
echo Detected Windows OS...


for /f "usebackq delims=" %%a in (`powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '169.254*' -and $_.InterfaceAlias -notmatch 'vEthernet|Loopback|VMware' } | Select-Object -First 1 -ExpandProperty IPAddress"`) do set IP=%%a

if "%IP%"=="" set IP=127.0.0.1

echo Host LAN IP: %IP%


set REACT_NATIVE_PACKAGER_HOSTNAME=%IP%
docker compose --env-file .env down
