import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import backgroundImage from "@/assets/oil-rig-background.jpg";
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
    <div className="min-h-screen p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-2xl mx-auto pt-8 pb-20 space-y-6 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate(`/questions/${category}`)}
          className="mb-4 text-white hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Questions
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Settings</h1>
          <p className="text-white/80">Customize your experience</p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Appearance</h2>
              
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
              <h2 className="text-xl font-semibold">Preferences</h2>
              
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
            className="w-full"
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
