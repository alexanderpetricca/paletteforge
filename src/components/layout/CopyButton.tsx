import { useState, useEffect } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonInterface {
  copyValue: string;
  textColor: string;
}

function CopyButton({ copyValue, textColor }: CopyButtonInterface) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      onClick={handleCopy}
      variant="link"
      style={{ color: textColor }}
      className="hover:cursor-pointer"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

export default CopyButton;
