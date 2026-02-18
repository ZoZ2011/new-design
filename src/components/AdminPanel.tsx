import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, User, Activity, Clock, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ValidUser {
  id: string;
  user_id: string;
  name: string | null;
  created_at: string;
}

interface UserStats {
  totalQuestions: number;
  answeredQuestions: number;
  submittedQuestions: number;
  lastActivity: string | null;
  categoriesProgress: {
    category: string;
    total: number;
    answered: number;
    submitted: number;
  }[];
}

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [validUsers, setValidUsers] = useState<ValidUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserId, setNewUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState<ValidUser | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    fetchValidUsers();
  }, []);

  const fetchValidUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("valid_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } else {
      setValidUsers(data || []);
    }
    setLoading(false);
  };

  const addNewUser = async () => {
    if (!newUserId.trim()) {
      toast.error("Please enter an ID number");
      return;
    }

    const { error } = await supabase
      .from("valid_users")
      .insert({ user_id: newUserId.trim(), name: newUserName.trim() || null });

    if (error) {
      if (error.code === "23505") {
        toast.error("This ID already exists");
      } else {
        toast.error("Failed to add user");
        console.error(error);
      }
    } else {
      toast.success("User added successfully");
      setNewUserId("");
      setNewUserName("");
      fetchValidUsers();
    }
  };

  const deleteUser = async (id: string, userId: string) => {
    if (userId === "400315") {
      toast.error("Cannot delete the admin user");
      return;
    }

    const { error } = await supabase
      .from("valid_users")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } else {
      toast.success("User deleted successfully");
      fetchValidUsers();
      if (selectedUser?.id === id) {
        setSelectedUser(null);
        setUserStats(null);
      }
    }
  };

  const fetchUserStats = async (user: ValidUser) => {
    setSelectedUser(user);
    setLoadingStats(true);

    const { data: progressData, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.user_id);

    if (error) {
      toast.error("Failed to fetch user statistics");
      console.error(error);
      setLoadingStats(false);
      return;
    }

    const progress = progressData || [];
    
    // Calculate statistics
    const totalQuestions = progress.length;
    const answeredQuestions = progress.filter(p => p.selected_answer !== null).length;
    const submittedQuestions = progress.filter(p => p.is_submitted).length;
    
    // Find last activity
    const lastActivity = progress.length > 0 
      ? progress.reduce((latest, p) => {
          const pDate = new Date(p.updated_at);
          return pDate > new Date(latest) ? p.updated_at : latest;
        }, progress[0].updated_at)
      : null;

    // Group by category
    const categoryMap = new Map<string, { total: number; answered: number; submitted: number }>();
    progress.forEach(p => {
      const existing = categoryMap.get(p.category) || { total: 0, answered: 0, submitted: 0 };
      existing.total++;
      if (p.selected_answer !== null) existing.answered++;
      if (p.is_submitted) existing.submitted++;
      categoryMap.set(p.category, existing);
    });

    const categoriesProgress = Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      ...stats
    }));

    setUserStats({
      totalQuestions,
      answeredQuestions,
      submittedQuestions,
      lastActivity,
      categoriesProgress
    });
    setLoadingStats(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatCategoryName = (category: string) => {
    return category.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const getTimeSinceLastActivity = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    
    const now = new Date();
    const lastActive = new Date(dateStr);
    const diffMs = now.getTime() - lastActive.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(dateStr);
  };

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Admin Panel</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
        {/* Page Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">User Management</h1>
          </div>
          <p className="text-muted-foreground text-sm pl-[52px]">Manage valid users and view their progress</p>
        </div>

        {/* Add New User */}
        <Card className="p-5 sm:p-6 border border-border shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            Add New User
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="ID Number"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              className="flex-1 h-10"
            />
            <Input
              placeholder="Name (optional)"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="flex-1 h-10"
            />
            <Button onClick={addNewUser} className="h-10 gap-2 hover:-translate-y-0.5 transition-all duration-200 shrink-0">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Users List */}
          <Card className="p-5 sm:p-6 border border-border shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Valid Users
              <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                {validUsers.length}
              </span>
            </h2>
            {loading ? (
              <div className="text-center py-10 text-muted-foreground text-sm">Loading users...</div>
            ) : validUsers.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm">No users yet</div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {validUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => fetchUserStats(user)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 ${
                      selectedUser?.id === user.id ? "border-primary/40 bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{user.name || "Unnamed User"}</p>
                      <p className="text-xs text-muted-foreground font-mono">{user.user_id}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="text-xs text-muted-foreground hidden sm:block">{formatDate(user.created_at)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(user.id, user.user_id);
                        }}
                        disabled={user.user_id === "400315"}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* User Details */}
          <Card className="p-5 sm:p-6 border border-border shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              User Details
            </h2>
            {!selectedUser ? (
              <div className="text-center py-16 space-y-2">
                <User className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                <p className="text-muted-foreground text-sm">Select a user to view their details</p>
              </div>
            ) : loadingStats ? (
              <div className="text-center py-16 text-muted-foreground text-sm">Loading statistics...</div>
            ) : userStats ? (
              <div className="space-y-5">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{selectedUser.name || "Unnamed User"}</div>
                    <div className="text-xs text-muted-foreground font-mono">ID: {selectedUser.user_id}</div>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center gap-3 p-3 bg-muted/60 rounded-xl">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Last Activity</div>
                    <div className="font-semibold text-sm text-foreground">{getTimeSinceLastActivity(userStats.lastActivity)}</div>
                  </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Tracked", value: userStats.totalQuestions },
                    { label: "Answered", value: userStats.answeredQuestions },
                    { label: "Submitted", value: userStats.submittedQuestions },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-3 bg-muted/60 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Completion Rate */}
                {userStats.totalQuestions > 0 && (
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground font-medium">Completion Rate</span>
                      <span className="font-bold text-primary">
                        {Math.round((userStats.submittedQuestions / userStats.totalQuestions) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(userStats.submittedQuestions / userStats.totalQuestions) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {/* Category Breakdown */}
                {userStats.categoriesProgress.length > 0 && (
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Progress by Category
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {userStats.categoriesProgress.map((cat) => (
                        <div key={cat.category} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-foreground font-medium">{formatCategoryName(cat.category)}</span>
                            <span className="text-muted-foreground">{cat.submitted}/{cat.total}</span>
                          </div>
                          <Progress
                            value={cat.total > 0 ? (cat.submitted / cat.total) * 100 : 0}
                            className="h-1.5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {userStats.totalQuestions === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    This user hasn't started any questions yet
                  </p>
                )}
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
