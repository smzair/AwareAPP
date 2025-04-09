import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Loader2, ShieldCheck } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const auditFormSchema = z.object({
  auditType: z.enum(['basic', 'advanced', 'comprehensive'], {
    required_error: 'Please select an audit type',
  }),
  includeApps: z.enum(['all', 'social', 'custom'], {
    required_error: 'Please select which apps to include',
  }),
});

type AuditFormValues = z.infer<typeof auditFormSchema>;

export default function PrivacyAuditDialog({ 
  open, 
  onClose 
}: { 
  open: boolean;
  onClose: () => void;
}) {
  const [isRunning, setIsRunning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      auditType: 'basic',
      includeApps: 'all',
    },
  });

  const onSubmit = (data: AuditFormValues) => {
    setIsRunning(true);
    
    // Simulate a privacy audit with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunning(false);
            onClose();
            setProgress(0);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg">
            <ShieldCheck className="mr-2 h-5 w-5 text-indigo-500" />
            Run Privacy Audit
          </DialogTitle>
          <DialogDescription>
            Analyze your apps to get insights about the data they collect and how they use it.
          </DialogDescription>
        </DialogHeader>

        {isRunning ? (
          <div className="py-6 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
            <p className="text-sm text-gray-600 mb-2">Running privacy audit...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{progress}% complete</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="auditType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audit Type</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic Scan (5 min)</SelectItem>
                        <SelectItem value="advanced">Advanced Analysis (15 min)</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Assessment (30 min)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {field.value === 'basic' && 'Quick scan of major privacy issues'}
                      {field.value === 'advanced' && 'Detailed analysis with recommendations'}
                      {field.value === 'comprehensive' && 'Complete privacy assessment with remediation steps'}
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="includeApps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Include Apps</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select apps to include" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Apps</SelectItem>
                        <SelectItem value="social">Social Media Only</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                <Button type="submit">Start Audit</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}