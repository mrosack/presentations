SET _=%~dp0

SET destmvc="%_%..\BridgeDemo.Mvc\wwwroot\bridgeJs"
IF EXIST %destmvc% xcopy "%_%bin\Debug\bridge" %destmvc% /Y /e 

SET destangular="%_%..\BridgeDemo.Angular\ClientApp\src\_bridgeJs"
IF EXIST %destangular% xcopy "%_%bin\Debug\bridge" %destangular% /Y /e 