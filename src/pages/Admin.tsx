import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Bug,
  Lightbulb,
  HelpCircle,
  Send,
  Shield
} from 'lucide-react';

interface TicketType {
  id: string;
  title: string;
  description: string;
  type: 'bug' | 'feature' | 'question';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  userId: string;
  userEmail: string;
  userName: string;
  attachments: string[];
  createdAt: Timestamp;
}

interface UserType {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: string;
}

interface Stats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  totalUsers: number;
}

const Admin = () => {
  const { t } = useLanguage();
  const { userData } = useAuth();
  const { toast } = useToast();
  
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [stats, setStats] = useState<Stats>({ totalTickets: 0, openTickets: 0, resolvedTickets: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userData?.isAdmin) {
      setLoading(false);
      return;
    }

    // Listen to all tickets
    const ticketsQuery = query(
      collection(db, 'tickets'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeTickets = onSnapshot(ticketsQuery, (snapshot) => {
      const ticketData: TicketType[] = [];
      snapshot.forEach((doc) => {
        ticketData.push({ id: doc.id, ...doc.data() } as TicketType);
      });
      setTickets(ticketData);
      
      // Calculate stats
      setStats(prev => ({
        ...prev,
        totalTickets: ticketData.length,
        openTickets: ticketData.filter(t => t.status === 'open' || t.status === 'in-progress').length,
        resolvedTickets: ticketData.filter(t => t.status === 'resolved' || t.status === 'closed').length,
      }));
      
      setLoading(false);
    });

    // Fetch users
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const userData: UserType[] = [];
      usersSnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() } as UserType);
      });
      setUsers(userData);
      setStats(prev => ({ ...prev, totalUsers: userData.length }));
    };

    fetchUsers();

    return () => unsubscribeTickets();
  }, [userData?.isAdmin]);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tickets', ticketId), {
        status: newStatus,
      });
      toast({ title: t('common.success'), description: 'وضعیت تیکت تغییر کرد' });
    } catch (error: any) {
      toast({ title: t('common.error'), description: error.message, variant: 'destructive' });
    }
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyContent.trim() || !userData) return;

    setSubmitting(true);
    try {
      const { addDoc, collection: firestoreCollection, Timestamp } = await import('firebase/firestore');
      
      await addDoc(firestoreCollection(db, 'tickets', selectedTicket.id, 'comments'), {
        content: replyContent,
        userId: userData.uid,
        userName: userData.displayName || 'ادمین',
        isAdmin: true,
        createdAt: Timestamp.now(),
      });

      setReplyContent('');
      toast({ title: t('common.success'), description: 'پاسخ ارسال شد' });
    } catch (error: any) {
      toast({ title: t('common.error'), description: error.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'feature': return <Lightbulb className="w-4 h-4" />;
      case 'question': return <HelpCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return '';
    }
  };

  if (!userData?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('admin.not-authorized')}</h1>
            <p className="text-muted-foreground">شما دسترسی به پنل مدیریت ندارید</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('admin.title')}</h1>

          <Tabs defaultValue="dashboard">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                {t('admin.dashboard')}
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                {t('admin.tickets')}
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t('admin.users')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{t('admin.total-tickets')}</CardTitle>
                    <Ticket className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalTickets}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{t('admin.open-tickets')}</CardTitle>
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.openTickets}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{t('admin.resolved-tickets')}</CardTitle>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.resolvedTickets}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{t('admin.total-users')}</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent tickets */}
              <Card>
                <CardHeader>
                  <CardTitle>آخرین تیکت‌ها</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.slice(0, 5).map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(ticket.type)}
                          <div>
                            <p className="font-medium">{ticket.title}</p>
                            <p className="text-sm text-muted-foreground">{ticket.userName}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(ticket.status)}>
                          {t(`issues.status.${ticket.status}`)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`p-4 bg-card border rounded-lg cursor-pointer transition-colors ${
                          selectedTicket?.id === ticket.id ? 'border-primary' : 'border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(ticket.type)}
                              <h3 className="font-medium">{ticket.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span>{ticket.userName}</span>
                              <span>•</span>
                              <span>{ticket.createdAt.toDate().toLocaleDateString('fa-IR')}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(ticket.status)}>
                              {t(`issues.status.${ticket.status}`)}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                              {t(`issues.priority.${ticket.priority}`)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTicket && (
                    <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                      <h2 className="text-xl font-semibold mb-4">{selectedTicket.title}</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="text-sm text-muted-foreground">{t('issues.status')}</label>
                          <Select
                            value={selectedTicket.status}
                            onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">{t('issues.status.open')}</SelectItem>
                              <SelectItem value="in-progress">{t('issues.status.in-progress')}</SelectItem>
                              <SelectItem value="resolved">{t('issues.status.resolved')}</SelectItem>
                              <SelectItem value="closed">{t('issues.status.closed')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm text-muted-foreground">{t('issues.description')}</label>
                          <p className="mt-1 text-sm whitespace-pre-wrap">{selectedTicket.description}</p>
                        </div>

                        {selectedTicket.attachments.length > 0 && (
                          <div>
                            <label className="text-sm text-muted-foreground">{t('issues.attachments')}</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedTicket.attachments.map((url, index) => (
                                <a
                                  key={index}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-secondary rounded text-sm hover:bg-secondary/80"
                                >
                                  فایل {index + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-border pt-4">
                        <label className="text-sm font-medium mb-2 block">{t('admin.reply')}</label>
                        <div className="flex gap-2">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="پاسخ خود را بنویسید..."
                            rows={3}
                          />
                        </div>
                        <Button 
                          className="mt-2" 
                          onClick={handleReply}
                          disabled={submitting || !replyContent.trim()}
                        >
                          <Send className="w-4 h-4 me-2" />
                          {t('common.send')}
                        </Button>
                      </div>

                      <div className="mt-4">
                        <Link to={`/issues/${selectedTicket.id}`}>
                          <Button variant="outline" className="w-full">
                            {t('common.view')} جزئیات کامل
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.users')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium">{user.displayName || 'بدون نام'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.isAdmin && (
                            <Badge className="bg-primary/20 text-primary">ادمین</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
