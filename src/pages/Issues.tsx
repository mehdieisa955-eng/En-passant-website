import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, Bug, Lightbulb, HelpCircle, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Ticket {
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

const Issues = () => {
  const { t } = useLanguage();
  const { user, userData } = useAuth();
  const { toast } = useToast();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'bug' as 'bug' | 'feature' | 'question',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tickets'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ticketData: Ticket[] = [];
      snapshot.forEach((doc) => {
        ticketData.push({ id: doc.id, ...doc.data() } as Ticket);
      });
      setTickets(ticketData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const storageRef = ref(storage, `tickets/${user!.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) return;

    setSubmitting(true);
    try {
      const attachments = await uploadFiles();
      
      await addDoc(collection(db, 'tickets'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        userName: userData.displayName || user.email,
        attachments,
        status: 'open',
        createdAt: Timestamp.now(),
      });

      toast({ title: t('common.success'), description: 'تیکت با موفقیت ارسال شد' });
      setShowForm(false);
      setFormData({ title: '', description: '', type: 'bug', priority: 'medium' });
      setFiles([]);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-muted text-muted-foreground border-border';
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('issues.title')}</h1>
            <p className="text-muted-foreground mb-6">{t('issues.login-required')}</p>
            <Link to="/auth">
              <Button>{t('nav.login')}</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{t('issues.title')}</h1>
              <p className="text-muted-foreground mt-1">{t('issues.subtitle')}</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 me-2" />
              {t('issues.new')}
            </Button>
          </div>

          {showForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('issues.new')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('issues.title-label')}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('issues.type')}</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: 'bug' | 'feature' | 'question') => 
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">{t('issues.type.bug')}</SelectItem>
                        <SelectItem value="feature">{t('issues.type.feature')}</SelectItem>
                        <SelectItem value="question">{t('issues.type.question')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('issues.priority')}</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: 'low' | 'medium' | 'high') => 
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t('issues.priority.low')}</SelectItem>
                        <SelectItem value="medium">{t('issues.priority.medium')}</SelectItem>
                        <SelectItem value="high">{t('issues.priority.high')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('issues.description')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('issues.attachments')}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {t('issues.upload')}
                    </Label>
                    {files.length > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {files.length} فایل انتخاب شده
                      </span>
                    )}
                  </div>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {files.map((file, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary rounded text-sm"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? t('common.loading') : t('issues.submit')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    {t('common.cancel')}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <Tabs defaultValue="my-tickets">
            <TabsList>
              <TabsTrigger value="my-tickets">{t('issues.my-tickets')}</TabsTrigger>
            </TabsList>

            <TabsContent value="my-tickets" className="mt-6">
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t('issues.no-tickets')}
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <Link
                      key={ticket.id}
                      to={`/issues/${ticket.id}`}
                      className="block bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(ticket.type)}
                            <h3 className="font-medium">{ticket.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {ticket.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                            <span>{t('issues.created-at')}: {ticket.createdAt.toDate().toLocaleDateString('fa-IR')}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ms-1">{t(`issues.status.${ticket.status}`)}</span>
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {t(`issues.priority.${ticket.priority}`)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Issues;
