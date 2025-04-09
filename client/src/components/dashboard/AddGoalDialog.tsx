import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import * as z from 'zod';

const goalFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
  category: z.enum(['time', 'notifications', 'health', 'privacy'], {
    required_error: 'Please select a category',
  }),
  targetValue: z.coerce.number()
    .min(1, { message: 'Target value must be at least 1' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  dueDate: z.date().optional(),
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

export default function AddGoalDialog({ 
  open, 
  onClose 
}: { 
  open: boolean;
  onClose: () => void;
}) {
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'time',
      targetValue: 120,
      unit: 'minutes',
    },
  });

  React.useEffect(() => {
    // Update the unit based on the selected category
    const subscription = form.watch((value, { name }) => {
      if (name === 'category') {
        const category = value.category;
        switch (category) {
          case 'time':
            form.setValue('unit', 'minutes');
            break;
          case 'notifications':
            form.setValue('unit', 'count');
            break;
          case 'health':
            form.setValue('unit', 'breaks');
            break;
          case 'privacy':
            form.setValue('unit', 'days');
            break;
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: GoalFormValues) => {
    // Here you would typically send the goal data to your API
    console.log('New goal data:', data);
    onClose();
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'time':
        return 'Set limits on how much time you spend on specific apps or online activities';
      case 'notifications':
        return 'Reduce the number of interruptions from apps and services';
      case 'health':
        return 'Schedule regular breaks and active time away from screens';
      case 'privacy':
        return 'Set goals for regular privacy checks and data clean-up';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg">
            <PlusCircle className="mr-2 h-5 w-5 text-indigo-500" />
            Add New Goal
          </DialogTitle>
          <DialogDescription>
            Create a new goal to improve your digital behavior and habits.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Reduce Instagram time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Why you want to achieve this goal" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="time">Screen Time</SelectItem>
                      <SelectItem value="notifications">Notifications</SelectItem>
                      <SelectItem value="health">Digital Health</SelectItem>
                      <SelectItem value="privacy">Privacy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {getCategoryDescription(field.value)}
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">Create Goal</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}