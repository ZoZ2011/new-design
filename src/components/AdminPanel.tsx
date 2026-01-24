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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
          <h1 className="text-2xl font-bold text-primary">Admin Panel - User Management</h1>
        </div>

        {/* Add New User Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New User
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="ID Number"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Name (optional)"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addNewUser}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Valid Users ({validUsers.length})
            </h2>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validUsers.map((user) => (
                      <TableRow 
                        key={user.id} 
                        className={`cursor-pointer hover:bg-muted/50 ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}
                        onClick={() => fetchUserStats(user)}
                      >
                        <TableCell className="font-mono font-medium">{user.user_id}</TableCell>
                        <TableCell>{user.name || "-"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(user.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(user.id, user.user_id);
                            }}
                            disabled={user.user_id === "400315"}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>

          {/* User Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              User Details
            </h2>
            {!selectedUser ? (
              <div className="text-center py-8 text-muted-foreground">
                Click on a user to view their details
              </div>
            ) : loadingStats ? (
              <div className="text-center py-8 text-muted-foreground">Loading statistics...</div>
            ) : userStats ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="border-b pb-4">
                  <div className="text-xl font-bold">{selectedUser.name || "Unnamed User"}</div>
                  <div className="text-sm text-muted-foreground font-mono">ID: {selectedUser.user_id}</div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Last Activity</div>
                    <div className="font-medium">{getTimeSinceLastActivity(userStats.lastActivity)}</div>
                  </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userStats.totalQuestions}</div>
                    <div className="text-xs text-muted-foreground">Total Progress</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userStats.answeredQuestions}</div>
                    <div className="text-xs text-muted-foreground">Answered</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userStats.submittedQuestions}</div>
                    <div className="text-xs text-muted-foreground">Submitted</div>
                  </div>
                </div>

                {/* Completion Rate */}
                {userStats.totalQuestions > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion Rate</span>
                      <span className="font-medium">
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
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Progress by Category
                    </h3>
                    <div className="space-y-3">
                      {userStats.categoriesProgress.map((cat) => (
                        <div key={cat.category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{formatCategoryName(cat.category)}</span>
                            <span className="text-muted-foreground">
                              {cat.submitted}/{cat.total} submitted
                            </span>
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
                  <div className="text-center py-4 text-muted-foreground">
                    This user has not started any questions yet
                  </div>
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
