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

# Detect if SELinux is active (Fedora, RHEL, Rocky, Alma)
if command -v getenforce >/dev/null 2>&1; then
  SELINUX_STATE=$(getenforce)
else
  SELINUX_STATE="Disabled"
fi

# Generate correct volume override
if [[ "$SELINUX_STATE" == "Enforcing" || "$SELINUX_STATE" == "Permissive" ]]; then
  echo "SELinux detected ($SELINUX_STATE) → using :z volume label"
  echo "VOLUME_OVERRIDE=./Front-end:/app:z" > .env.override
else
  echo "No SELinux → using normal volume mapping"
  echo "VOLUME_OVERRIDE=./Front-end:/app" > .env.override
fi

# Export IP and run docker
export REACT_NATIVE_PACKAGER_HOSTNAME=$IP
docker compose --env-file .env.override up
exit 0

:WINDOWS
REM -----------------------------------------------------------------------------
REM  WINDOWS SECTION
REM -----------------------------------------------------------------------------
echo Detected Windows OS...

REM 1. Detect LAN IP from PowerShell
for /f "usebackq tokens=*" %%a in (`powershell -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'vEthernet' -and $_.InterfaceAlias -notmatch 'Loopback' -and $_.InterfaceAlias -notmatch 'VMware' } | Select-Object -First 1).IPAddress"`) do set IP=%%a

if "%IP%"=="" set IP=127.0.0.1

echo Host LAN IP: %IP%

REM 2. Always normal volume mapping on Windows (no SELinux)
echo VOLUME_OVERRIDE=./Front-end:/app > .env.override

REM 3. Set env var and run docker
set REACT_NATIVE_PACKAGER_HOSTNAME=%IP%
docker compose --env-file .env.override up
