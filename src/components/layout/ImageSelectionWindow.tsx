import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
]);

const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.gif,.bmp";

interface ImageSelectionWindowProps {
  onLocalFileSubmit: (file: File) => Promise<void>;
  processingError: string | null;
}

function ImageSelectionWindow({
  onLocalFileSubmit,
  processingError,
}: ImageSelectionWindowProps) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasFile, setHasFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const error = validationError ?? processingError;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const localFile = fileInputRef.current?.files?.[0];

    if (!localFile) return;

    if (!ACCEPTED_TYPES.has(localFile.type)) {
      setValidationError(
        "Unsupported file type. Please upload a JPEG, PNG, WebP, GIF, or BMP image.",
      );
      return;
    }

    setValidationError(null);
    onLocalFileSubmit(localFile);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Image</CardTitle>
        <CardDescription>Choose image file from your computer</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="load-image-form" onSubmit={handleSubmit} className="mb-10">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="image-file">Image File</Label>
              <Input
                id="image-file"
                type="file"
                accept={ACCEPT_ATTR}
                ref={fileInputRef}
                onChange={(e) => {
                  setHasFile(
                    e.target.files !== null && e.target.files.length > 0,
                  );
                }}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-auto">
        <Button
          type="submit"
          form="load-image-form"
          className="w-full"
          disabled={!hasFile}
        >
          Load Image
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ImageSelectionWindow;
