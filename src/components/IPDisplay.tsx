import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Server, Clock, RefreshCcw, Copy, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface IPData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  postal: string;
  latitude: number;
  longitude: number;
  org: string;
  timezone: string;
  currency_name: string;
}

export function IPDisplay() {
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchIPData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Failed to fetch IP data. Please try again later.');
      }
      const json = await response.json();
      if (json.error) {
        throw new Error(json.reason || 'Error fetching IP details');
      }
      setData(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPData();
  }, []);

  const copyToClipboard = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopied(true);
      toast.success('IP Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const InfoRow = ({ icon: Icon, label, value, loading }: { icon: any, label: string, value?: string, loading?: boolean }) => (
    <div className="flex items-center gap-3 py-3 border-b last:border-0 border-border/50">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        {loading ? (
          <Skeleton className="h-5 w-3/4 mt-1" />
        ) : (
          <p className="text-sm font-semibold truncate">{value || 'N/A'}</p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none shadow-2xl bg-background/80 backdrop-blur-xl">
      <CardHeader className="relative pb-8">
        <div className="absolute top-0 right-0 p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchIPData}
            disabled={loading}
            className="rounded-full hover:bg-primary/10"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">IP Detection</CardTitle>
            <CardDescription>Real-time network and location information</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-6 rounded-3xl bg-secondary/50 border border-border/50 flex flex-col items-center justify-center text-center relative group">
          <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary px-3 py-1">
            Your Public IP Address
          </Badge>
          {loading ? (
            <Skeleton className="h-12 w-64" />
          ) : (
            <div className="flex items-center gap-3">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                {data?.ip || '0.0.0.0'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center"
            >
              {error}
              <Button variant="link" size="sm" onClick={fetchIPData} className="ml-2 text-destructive font-bold underline">
                Retry
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
            >
              <InfoRow
                icon={MapPin}
                label="Location"
                value={data ? `${data.city}, ${data.region}` : undefined}
                loading={loading}
              />
              <InfoRow
                icon={Globe}
                label="Country"
                value={data ? `${data.country_name} (${data.country_code})` : undefined}
                loading={loading}
              />
              <InfoRow
                icon={Server}
                label="ISP / Organization"
                value={data?.org}
                loading={loading}
              />
              <InfoRow
                icon={Clock}
                label="Timezone"
                value={data?.timezone}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-50">
          <span>Secure Detection</span>
          <span>Data provided by ipapi.co</span>
        </div>
      </CardContent>
    </Card>
  );
}
