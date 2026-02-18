import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Moon, Sun, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UserSettings {
  theme: "light" | "dark";
  fontSize: "small" | "medium" | "large";
  soundEffects: boolean;
  autoSubmit: boolean;
}

const defaultSettings: UserSettings = {
  theme: "light",
  fontSize: "medium",
  soundEffects: true,
  autoSubmit: false,
};

const Settings = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const userId = localStorage.getItem("userId");
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate(`/signin/${category}`);
      return;
    }

    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error loading settings:", error);
          return;
        }

        if (data) {
          const loadedSettings: UserSettings = {
            theme: (data.theme as "light" | "dark") || "light",
            fontSize: (data.font_size as "small" | "medium" | "large") || "medium",
            soundEffects: data.sound_effects !== false,
            autoSubmit: data.auto_submit || false,
          };
          setSettings(loadedSettings);
          applySettings(loadedSettings);
        } else {
          // Create default settings for new user
          await supabase
            .from("user_settings")
            .insert({
              user_id: userId,
              theme: defaultSettings.theme,
              font_size: defaultSettings.fontSize,
              sound_effects: defaultSettings.soundEffects,
              auto_submit: defaultSettings.autoSubmit,
            });
        }
      } catch (error) {
        console.error("Error in loadSettings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [userId, category, navigate]);

  const applySettings = (newSettings: UserSettings) => {
    // Apply theme
    if (newSettings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply font size
    const root = document.documentElement;
    if (newSettings.fontSize === "small") {
      root.style.fontSize = "14px";
    } else if (newSettings.fontSize === "large") {
      root.style.fontSize = "18px";
    } else {
      root.style.fontSize = "16px";
    }
  };

  const updateSettings = async (key: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    
    if (userId) {
      try {
        await supabase
          .from("user_settings")
          .upsert({
            user_id: userId,
            theme: newSettings.theme,
            font_size: newSettings.fontSize,
            sound_effects: newSettings.soundEffects,
            auto_submit: newSettings.autoSubmit,
          }, {
            onConflict: "user_id"
          });
        toast.success("Settings saved");
      } catch (error) {
        console.error("Error saving settings:", error);
        toast.error("Failed to save settings");
      }
    }
  };

  const resetSettings = async () => {
    if (!userId) return;

    try {
      await supabase
        .from("user_settings")
        .upsert({
          user_id: userId,
          theme: defaultSettings.theme,
          font_size: defaultSettings.fontSize,
          sound_effects: defaultSettings.soundEffects,
          auto_submit: defaultSettings.autoSubmit,
        }, {
          onConflict: "user_id"
        });
      
      setSettings(defaultSettings);
      applySettings(defaultSettings);
      toast.success("Settings reset to defaults");
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
    }
  };

  if (!userId || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(`/questions/${category}`)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questions
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Settings</h1>
          </div>
          <p className="text-muted-foreground text-sm">Customize your experience</p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground">Appearance</h2>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose between light and dark mode
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch
                    checked={settings.theme === "dark"}
                    onCheckedChange={(checked) => 
                      updateSettings("theme", checked ? "dark" : "light")
                    }
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Font Size</Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust text size for better readability
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={settings.fontSize === "small" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings("fontSize", "small")}
                  >
                    Small
                  </Button>
                  <Button
                    variant={settings.fontSize === "medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings("fontSize", "medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={settings.fontSize === "large" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSettings("fontSize", "large")}
                  >
                    Large
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground">Preferences</h2>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for correct/incorrect answers
                  </p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => updateSettings("soundEffects", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Submit</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically submit answer after selection
                  </p>
                </div>
                <Switch
                  checked={settings.autoSubmit}
                  onCheckedChange={(checked) => updateSettings("autoSubmit", checked)}
                />
              </div>
            </div>
          </Card>

          <Button
            onClick={resetSettings}
            variant="outline"
            className="w-full h-11 font-semibold hover:-translate-y-0.5 transition-all duration-200"
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
