const fs = require("fs").promises;
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

// Load environment variables from .env.local in project root
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

// Debug: Log what environment variables we found
console.log("🔍 Debug: Environment variables loaded:");
console.log(
  "NEXT_PUBLIC_SUPABASE_URL:",
  process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Found" : "❌ Missing"
);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Found" : "❌ Missing"
);
console.log(
  "SUPABASE_ANON_KEY:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing"
);

// Supabase configuration - loaded from .env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Show what we're actually using
console.log("\n🔧 Using for Supabase client:");
console.log("URL:", SUPABASE_URL ? "✅ Set" : "❌ Missing");
console.log("Key:", SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "❌ Missing");

// Create Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedLessons() {
  try {
    console.log("\n🦜 Starting Galah lesson seeding process...");

    // First, create a default course if it doesn't exist
    console.log("📋 Creating/checking for default course...");

    let courseId;

    // Check if a course already exists
    const { data: existingCourses, error: courseCheckError } = await supabase
      .from("courses")
      .select("id")
      .eq("title", "Australian Typing Basics")
      .limit(1);

    if (courseCheckError) {
      console.error(
        "❌ Error checking for existing courses:",
        courseCheckError.message
      );
      throw courseCheckError;
    }

    if (existingCourses && existingCourses.length > 0) {
      courseId = existingCourses[0].id;
      console.log("✅ Found existing course with ID:", courseId);
    } else {
      // Create a new course
      const { data: newCourse, error: courseError } = await supabase
        .from("courses")
        .insert([
          {
            title: "Australian Typing Basics",
            description:
              "Learn to type with fair dinkum Aussie content! From beginner phrases to advanced passages about Australian culture.",
            order: 1,
          },
        ])
        .select()
        .single();

      if (courseError) {
        console.error("❌ Error creating course:", courseError.message);
        throw courseError;
      }

      courseId = newCourse.id;
      console.log("✅ Created new course with ID:", courseId);
    }

    // Read the lessons.json file from the same directory as this script
    const lessonsPath = path.join(__dirname, "lessons.json");
    console.log(`📁 Looking for lessons at: ${lessonsPath}`);
    const lessonsData = await fs.readFile(lessonsPath, "utf8");
    const lessons = JSON.parse(lessonsData);

    console.log(`📚 Found ${lessons.length} lessons to seed`);

    // Validate the lessons array
    if (!Array.isArray(lessons)) {
      throw new Error("lessons.json should contain an array of lesson objects");
    }

    // Loop through each lesson and insert into database
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];

      try {
        // Validate lesson structure
        if (!lesson.title || !lesson.content) {
          console.warn(
            `⚠️  Skipping lesson ${i + 1}: Missing title or content`
          );
          errorCount++;
          continue;
        }

        // Prepare lesson data for insertion
        const lessonData = {
          title: lesson.title,
          content: lesson.content,
          course_id: courseId, // Use the actual course UUID
          lesson_type: lesson.lesson_type || "typing", // Default to typing lesson
          order_in_course: lesson.order_in_course || i + 1, // Use index + 1 if not specified
        };

        // Insert lesson into Supabase
        const { data, error } = await supabase
          .from("lessons")
          .insert([lessonData])
          .select();

        if (error) {
          console.error(
            `❌ Error inserting lesson "${lesson.title}":`,
            error.message
          );
          errorCount++;
        } else {
          console.log(`✅ Successfully inserted lesson: "${lesson.title}"`);
          successCount++;
        }

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (lessonError) {
        console.error(
          `❌ Error processing lesson ${i + 1}:`,
          lessonError.message
        );
        errorCount++;
      }
    }

    // Final summary
    console.log("\n🎉 Seeding process completed!");
    console.log(`✅ Successfully seeded: ${successCount} lessons`);
    if (errorCount > 0) {
      console.log(`❌ Errors encountered: ${errorCount} lessons`);
    }

    if (successCount === 0) {
      console.log(
        "⚠️  No lessons were successfully seeded. Please check your data and database connection."
      );
      process.exit(1);
    } else {
      console.log(
        `🦜 Bonza! Your Typing Galah is ready with ${successCount} Australian lessons!`
      );
    }
  } catch (error) {
    console.error("💥 Fatal error during seeding process:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Helper function to check if lessons.json exists
async function checkLessonsFile() {
  try {
    const lessonsPath = path.join(__dirname, "lessons.json");
    await fs.access(lessonsPath);
    return true;
  } catch {
    return false;
  }
}

// Main execution
async function main() {
  console.log("🦜 G'day! Welcome to the Typing Galah lesson seeder!");

  // Check if lessons.json exists
  const lessonsFileExists = await checkLessonsFile();
  if (!lessonsFileExists) {
    console.error(
      "❌ Error: lessons.json file not found in curriculum directory"
    );
    console.log(
      "💡 Tip: Make sure you have a lessons.json file with an array of lesson objects"
    );
    console.log(
      '   Each lesson should have at least "title" and "content" properties'
    );
    console.log(`   Looking for: ${path.join(__dirname, "lessons.json")}`);
    process.exit(1);
  }

  // Check environment variables
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Error: Missing Supabase credentials in .env.local");
    console.log("💡 Your .env.local should contain one of these combinations:");
    console.log("   Option 1 (Service Role - recommended for seeding):");
    console.log("     NEXT_PUBLIC_SUPABASE_URL=your-project-url");
    console.log("     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
    console.log("   Option 2 (Anon Key - fallback):");
    console.log("     NEXT_PUBLIC_SUPABASE_URL=your-project-url");
    console.log("     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key");
    console.log(
      `   (Looking for .env.local at: ${path.resolve(
        __dirname,
        "../.env.local"
      )})`
    );
    process.exit(1);
  }

  await seedLessons();
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { seedLessons };
