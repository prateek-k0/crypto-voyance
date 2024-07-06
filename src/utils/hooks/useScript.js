import { useEffect } from 'react';

export const useScript = (
  srcPath,
  onLoad,
  onError
) => {
  useEffect(() => {
    const externalScript = document.createElement("script");
    externalScript.onerror = onError;
    externalScript.onload = onLoad;
    externalScript.id = "external";
    externalScript.async = true;
    externalScript.type = "text/javascript";
    externalScript.setAttribute("crossorigin", "anonymous");
    externalScript.src = srcPath;
    document.body.appendChild(externalScript);

    return () => {
      document.body.removeChild(externalScript);
    }
  }, [srcPath, onError, onLoad]);
};