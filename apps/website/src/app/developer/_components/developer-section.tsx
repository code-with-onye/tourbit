"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Check, Copy, Key, RefreshCw } from "lucide-react";
import { useCreateTorbitToken, useGetTorbitToken } from "@/hooks/server/token";

export const DeveloperSection = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { mutate: createTourbitToken } = useCreateTorbitToken();
  const { data } = useGetTorbitToken();

  const generateNewToken = () => {
    createTourbitToken();
  };

  useEffect(() => {
    if (data?.token) {
      setApiKey(data.token);
    }
  }, [data?.token]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Developer Settings</h1>
        <p className="text-muted-foreground">
          Manage your API keys and developer settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Generate and manage your API keys for accessing the TourBit API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={apiKey}
              placeholder="Your API key will appear here"
              readOnly
              className="font-mono"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!apiKey}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={generateNewToken}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Generate New Key
            </Button>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <h3 className="font-medium mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Keep your API key secure and never share it publicly</li>
              <li>You can generate a new key at any time</li>
              <li>Generating a new key will invalidate the previous one</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
