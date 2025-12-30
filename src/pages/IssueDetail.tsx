import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Clock, CheckCircle, XCircle, Loader2, Paperclip, Send, User } from 'lucide-react';

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

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, userData } = useAuth();
  const { toast } = useToast();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      const ticketDoc = await getDoc(doc(db, 'tickets', id));
      if (ticketDoc.exists()) {
        setTicket({ id: ticketDoc.id, ...ticketDoc.data() } as Ticket);
      }
      setLoading(false);
    };

    fetchTicket();

    // Listen to comments
    const commentsQuery = query(
      collection(db, 'tickets', id, 'comments'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentData: Comment[] = [];
      snapshot.forEach((doc) => {
        commentData.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(commentData);
    });

    return () => unsubscribe();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user || !userData || !id) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'tickets', id, 'comments'), {
        content: newComment,
        userId: user.uid,
        userName: userData.displayName || user.email,
        isAdmin: userData.isAdmin,
        createdAt: Timestamp.now(),
      });

      setNewComment('');
      toast({ title: t('common.success'), description: 'کامنت اضافه شد' });
    } catch (error: any) {
      toast({ title: t('common.error'), description: error.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
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

  const BackArrow = language === 'fa' ? ArrowRight : ArrowLeft;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          </div>
        </main>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">تیکت یافت نشد</h1>
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
          <Button
            variant="ghost"
            onClick={() => navigate('/issues')}
            className="mb-6"
          >
            <BackArrow className="w-4 h-4 me-2" />
            {t('common.back')}
          </Button>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold">{ticket.title}</h1>
              <Badge className={getStatusColor(ticket.status)}>
                {getStatusIcon(ticket.status)}
                <span className="ms-1">{t(`issues.status.${ticket.status}`)}</span>
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{t('issues.type')}: {t(`issues.type.${ticket.type}`)}</span>
              <span>•</span>
              <span>{t('issues.priority')}: {t(`issues.priority.${ticket.priority}`)}</span>
              <span>•</span>
              <span>{ticket.createdAt.toDate().toLocaleDateString('fa-IR')}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{ticket.description}</p>
            </div>

            {ticket.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  {t('issues.attachments')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.attachments.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors"
                    >
                      فایل {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">{t('issues.comment')}ها</h2>

            <div className="space-y-4 mb-6">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">هنوز کامنتی وجود ندارد</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-lg ${
                      comment.isAdmin ? 'bg-primary/10 border border-primary/20' : 'bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-medium">{comment.userName}</span>
                        {comment.isAdmin && (
                          <Badge variant="outline" className="ms-2 text-xs">ادمین</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground ms-auto">
                        {comment.createdAt.toDate().toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            {user && (
              <div className="flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t('issues.add-comment')}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleAddComment} disabled={submitting || !newComment.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetail;
