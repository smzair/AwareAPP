import React from 'react';
import { WebsiteUsage } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { 
  Facebook, 
  Linkedin, 
  Github, 
  ShoppingCart, 
  Video, 
  Youtube, 
  GraduationCap, 
  Newspaper,
  Globe
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface WebsiteUsageListProps {
  websites: WebsiteUsage[];
}

// Map to get the icon component based on the icon name
const iconMap: Record<string, React.ReactNode> = {
  'Facebook': <Facebook className="h-4 w-4" />,
  'Linkedin': <Linkedin className="h-4 w-4" />,
  'Github': <Github className="h-4 w-4" />,
  'ShoppingCart': <ShoppingCart className="h-4 w-4" />,
  'Video': <Video className="h-4 w-4" />,
  'YouTube': <Youtube className="h-4 w-4" />,
  'GraduationCap': <GraduationCap className="h-4 w-4" />,
  'Newspaper': <Newspaper className="h-4 w-4" />
};

// Get category color
const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    'Social': 'bg-blue-100 text-blue-800',
    'Entertainment': 'bg-pink-100 text-pink-800',
    'Professional': 'bg-purple-100 text-purple-800',
    'Development': 'bg-green-100 text-green-800',
    'Shopping': 'bg-indigo-100 text-indigo-800',
    'News': 'bg-amber-100 text-amber-800',
    'Education': 'bg-violet-100 text-violet-800'
  };
  
  return categoryColors[category] || 'bg-gray-100 text-gray-800';
};

// Format time spent
const formatTimeSpent = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export default function WebsiteUsageList({ websites }: WebsiteUsageListProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Website</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Visits</TableHead>
            <TableHead className="text-right">Time Spent</TableHead>
            <TableHead className="text-right">Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((website) => (
            <TableRow key={website.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-gray-100">
                    <div className="text-gray-600">
                      {website.icon && iconMap[website.icon] ? (
                        iconMap[website.icon]
                      ) : (
                        <Globe className="h-4 w-4" />
                      )}
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium">{website.title}</div>
                    <div className="text-xs text-muted-foreground">{website.domain}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getCategoryColor(website.category)} variant="secondary">
                  {website.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{website.visitCount}</TableCell>
              <TableCell className="text-right">{formatTimeSpent(website.timeSpent)}</TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(website.lastVisited), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}