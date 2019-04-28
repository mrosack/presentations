SET _=%~dp0
SET dest="%_%..\BridgeDemo.Mvc\wwwroot\bridgeJs"
IF EXIST %dest% xcopy "%_%bin\Debug\bridge" %dest% /Y /e 