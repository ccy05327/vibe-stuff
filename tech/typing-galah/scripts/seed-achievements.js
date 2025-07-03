const { createClient } = require("@supabase/supabase-js");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

// Read achievements data
const achievementsPath = path.join(
  __dirname,
  "..",
  "supabase",
  "functions",
  "aware-achievements",
  "_shared",
  "achievements.json"
);
const achievementsData = JSON.parse(fs.readFileSync(achievementsPath, "utf8"));

async function seedAchievements() {
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log("🦜 Starting achievement seeding...");

    // First, get all existing achievements to clear them
    const { data: existingAchievements, error: fetchError } = await supabase
      .from("achievements")
      .select("id");

    if (fetchError) {
      console.error("Error fetching existing achievements:", fetchError);
      process.exit(1);
    }

    // Clear existing achievements if any exist
    if (existingAchievements && existingAchievements.length > 0) {
      const { error: deleteError } = await supabase
        .from("achievements")
        .delete()
        .in(
          "id",
          existingAchievements.map((a) => a.id)
        );

      if (deleteError) {
        console.error("Error clearing existing achievements:", deleteError);
        process.exit(1);
      }
      console.log(
        `✅ Cleared ${existingAchievements.length} existing achievements`
      );
    } else {
      console.log("✅ No existing achievements to clear");
    }

    // Insert achievements
    const achievementsToInsert = achievementsData.map((achievement) => ({
      code: achievement.id, // Use the id from JSON as the code field
      name: achievement.name,
      description: achievement.description,
      icon_url: null, // We're using emoji icons in the UI
    }));

    const { data, error } = await supabase
      .from("achievements")
      .insert(achievementsToInsert)
      .select();

    if (error) {
      console.error("Error inserting achievements:", error);
      process.exit(1);
    }

    console.log(
      `✅ Successfully seeded ${achievementsToInsert.length} achievements:`
    );
    achievementsToInsert.forEach((achievement, index) => {
      console.log(`   ${index + 1}. ${achievement.name} (${achievement.id})`);
    });

    console.log("🎉 Achievement seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

// Run the seeding
seedAchievements();
